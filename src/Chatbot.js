import React, { useState } from 'react'
import './App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "YOUR_API_KEY";

const Chatbot = () => {
    const [typing, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
      {
        message: "Hello, I'm Chatbot! Ask me anything!",
        sentTime: "just now",
        sender: "Chatbot"
      }
    ]);
  
    const handleSend = async (message) => {
      const newMessage = {
        message: message,
        direction: 'outgoing',
        sender: "user"
      };
  
      const newMessages = [...messages, newMessage];
      
      setMessages(newMessages);
      setIsTyping(true);
      await processMessageToChatGPT(newMessages);
    };
  
    async function processMessageToChatGPT(chatMessages) { 
  
      let apiMessages = chatMessages.map((messageObject) => {
        let role = "";
        if (messageObject.sender === "Chatbot") {
          role = "assistant";
        } else {
          role = "user";
        }
        return { role: role, content: messageObject.message}
      });
  
      const systemMessage = { 
    role: "system", 
    content: "Explain things like you're talking to a software professional with 2 years of experience."
      }
  
      const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
          systemMessage,  // The system message DEFINES the logic of our chatGPT
          ...apiMessages // The messages from our chat with ChatGPT
        ]
      }
  
      await fetch("https://api.openai.com/v1/chat/completions", 
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      }).then((data) => {
        return data.json();
      }).then((data) => {
        console.log(data);
        console.log(data.choices[0].message.content);
        setMessages([...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }]);
        setIsTyping(false);
      });
    }
  
    return (
      <div className="App">
        <h1>Chatbot</h1>
        <div style={{ position:"relative", height: "800px", width: "700px"  }}>
          <MainContainer>
            <ChatContainer>       
              <MessageList 
                scrollBehavior="smooth" 
                typingIndicator={typing ? <TypingIndicator content="Chatbot is typing" /> : null}>
                {messages.map((message, i) => {
                  console.log(message)
                  return <Message key={i} model={message} />
                })}
              </MessageList>
              <MessageInput placeholder="Type message here" onSend={handleSend} />        
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    );
  };

export default Chatbot;