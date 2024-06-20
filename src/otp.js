import React, { useState } from 'react';
import './style.css';

const OTP = ({ onVerificationSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [isOTPGenerated, setIsOTPGenerated] = useState(false);
  const [message, setMessage] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState(false);

  const generateOTP = () => {
    // Generate a 6-digit random OTP
    const randomOTP = Math.floor(100000 + Math.random() * 900000);
    setOTP('');
    setGeneratedOTP(randomOTP.toString());
    setIsOTPGenerated(true);
    setMessage('OTP generated: ' + randomOTP); // Display the generated OTP on the website
  };

  const handleVerifyOTP = () => {
    
    if (otp === generatedOTP) {
      setMessage('OTP verified successfully.');
      onVerificationSuccess(); // Call the callback function when OTP is verified
    } else {
      setMessage('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="otp-container">
      <h1 className="otp-title">OTP Authentication</h1>
      <div className='otp-form'>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="input-field"
        />
        {isOTPGenerated ? (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              className="input-field"
            />
            <button onClick={handleVerifyOTP} className="verify-btn">Verify OTP</button>
          </>
        ) : (
          <button onClick={generateOTP} className="generate-btn">Generate OTP</button>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default OTP;