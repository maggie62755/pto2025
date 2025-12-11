/**
 * 解析 CSV 字串為二維陣列
 * 支援雙引號內的逗號與換行符
 * @param {string} text CSV 原始文本
 * @returns {string[][]} 解析後的二維陣列
 */
function parseCSV(text) {
  const rows = [];
  let currentRow = [];
  let currentCell = '';
  let inQuotes = false;

  // 優化：預先移除 BOM (Byte Order Mark) 防止第一欄 key 解析錯誤
  if (text.charCodeAt(0) === 0xFEFF) {
    text = text.slice(1);
  }

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentCell += '"'; // 處理雙引號轉義 ("")
        i++;
      } else {
        inQuotes = !inQuotes; // 切換引號狀態
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentCell); // 欄位結束
      currentCell = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      // 行結束邏輯
      if (char === '\r' && nextChar === '\n') i++; // 處理 CRLF
      
      currentRow.push(currentCell);
      if (currentRow.some(cell => cell.trim())) { // 忽略空行
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  // 處理檔案末尾
  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell);
    if (currentRow.some(cell => cell.trim())) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * 取得並轉換旅行資料
 * @returns {Promise<Array<{num: number, name: string, activity: string, location: string, description: string, image: string}>>}
 */
export async function getTravelData() {
  try {
    // 使用 import.meta.env.BASE_URL 來取得正確的 base path
    const basePath = import.meta.env.BASE_URL || '/';
    const res = await fetch(`${basePath}travel_data.csv`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch CSV: ${res.status} ${res.statusText}`);
    }

    const text = await res.text();
    const rows = parseCSV(text);

    if (rows.length === 0) return [];

    // 取得 Header 並去除前後空白 (重要：避免 CSV 空格導致 key 對不上)
    const headers = rows[0].map(h => h.trim());
    const dataRows = rows.slice(1);

    // 使用 reduce 一次完成 mapping 和 filtering，效能較佳
    return dataRows.reduce((acc, row) => {
      // 建立原始物件映射
      const rawObj = {};
      headers.forEach((header, index) => {
        rawObj[header] = (row[index] || '').trim();
      });

      // 資料驗證與轉型
      const num = Number(rawObj['num']);
      if (!isNaN(num) && num > 0) {
        const cellData = {
          num: num,
          name: rawObj['中文'] || '',
          activity: rawObj['Activity'] || '',
          location: rawObj['Location'] || '',
          description: rawObj['Description'] || '',
          image: rawObj['Image_path'] || ''
          // sourceLink: rawObj['Sources Link'] || '' // 如需連結可解開此行
        };
        
        // 添加特殊效果資訊
        const specialEffect = rawObj['Special_Effect']?.trim().toLowerCase();
        const targetCell = Number(rawObj['Target_Cell']);
        
        if (specialEffect && !isNaN(targetCell) && targetCell > 0) {
          cellData.specialEffect = specialEffect; // 'wormhole' or 'asteroid'
          cellData.targetCell = targetCell;
        }
        
        acc.push(cellData);
      }
      return acc;
    }, []);

  } catch (error) {
    console.error('Error loading travel data:', error);
    return []; // 發生錯誤時回傳空陣列，避免前端崩潰
  }
}