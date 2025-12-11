
import LoginForm from './LoginForm';
import Game from './Game';
import './App.css';
import './nebula-bg.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      {/* 全局背景動畫 */}
      <div className="bg"></div>
      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>
      <BrowserRouter basename="/pto2025">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
