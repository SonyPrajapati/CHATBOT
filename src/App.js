import React, { useState } from "react";
import './App.css';
import OTP from "./otp";
import Chatbot from "./Chatbot";

const App = () => {
  const [isVerified, setIsVerified] = useState(false);
  
  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };

  return(
    <div className="App">
      {!isVerified ? (
        <OTP onVerificationSuccess={handleVerificationSuccess}  /> 

      ) : (
        <Chatbot />
      )}
    </div>
  );
};

export default App;