import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import Modal from './Modal';
import { LuRocket } from "react-icons/lu";
import { TbMoneybag } from "react-icons/tb";


const LoginForm = () => {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const [nameError, setNameError] = useState('');
  const [budgetError, setBudgetError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    setNameError('');
    setBudgetError('');

    if (!name.trim()) {
      setNameError('Please enter your name.');
      valid = false;
    }
    if (!budget.trim() || Number(budget) < 1) {
      setBudgetError('Please enter a valid budget.');
      valid = false;
    }
    if (valid) {
      // 使用 React Router 導頁，攜帶 state
      navigate('/game', { state: { playerName: name.trim(), budget: budget.trim() } });
    }
  };

  return (
    <>
      {/* 標題 */}
      <h1 id="heading">Welcome Aboard! </h1>
      <main className="login-container">
        <section className="welcome-card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3212/3212608.png"
            alt="Rocket Logo"
            className="login-logo"
            loading="lazy"
          />
          <h1>Get Ready for Your Space Journey</h1>
          <form id="loginForm" autoComplete="off" noValidate onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="textInput">👤 Passenger Name</label>
              <input
                type="text"
                id="textInput"
                name="textInput"
                placeholder="Enter your name"
                required
                maxLength={20}
                autoComplete="off"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <div className="error-message">{nameError}</div>
            </div>
            <div className="form-group">
              <label htmlFor="numberInput">💰 Budget (Mileage)</label>
              <input
                type="number"
                id="numberInput"
                name="numberInput"
                placeholder="Enter your budget"
                min={1}
                required
                autoComplete="off"
                value={budget}
                onChange={e => setBudget(e.target.value)}
              />
              <div className="error-message">{budgetError}</div>
            </div>
            <div className="ready-section">
              <button type="submit" className="btn">
                Start Adventure! <LuRocket />
              </button>
            </div>
          </form>
          <div className="help-section">
            <p style={{cursor:'pointer', color:'#ffd700cc', fontWeight:400}} onClick={() => setShowModal(true)}>
              First time playing?
            </p>
          </div>
          {/* Modal 彈窗 */}
          <Modal show={showModal} onClose={() => setShowModal(false)}>
            <div className="modal-title">Game Instructions</div>
            <div className="modal-intro">
              <strong>Welcome aboard, explorer!</strong><br/>
              Embark on a thrilling journey across the terrestrial planets and their fascinating moons. Each world offers unique wonders and challenges. As you play, you'll discover their special features, plan your route, and see if your budget can take you to your dream destinations.<br/><br/>
              Ready to begin your adventure? Follow these steps:
            </div>
            <ol className="modal-steps">
              <li>Enter your name and your travel budget (Mileage).</li>
              <li>Click "Start Adventure! <LuRocket />" to launch your journey.</li>
              <li>Explore planets and moons, making choices based on your budget.</li>
              <li>Enjoy discovering the wonders of our solar system!</li>
            </ol>
            <div className="modal-btn-row">
              <button className="btn" onClick={() => setShowModal(false)} style={{minWidth:120}}>OK</button>
            </div>
          </Modal>
        </section>
      </main>
    </>
  );
};

export default LoginForm;
