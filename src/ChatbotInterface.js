import React, { useState } from 'react';
import './ChatbotInterface.css'; // Import the styles
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { Send } from '@mui/icons-material';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import exampleImage from './images/creative-collage-telehealth-consultation.jpg';
import ChatBot from 'react-simple-chatbot';
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";


const ChatbotInterface = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [signUpUserName, setSignUpUserName] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');


  const handleSignUpClick = () => {
    setShowSignUpForm(true);
  };


  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  function handleUserNameChange(event) {
    setUserName(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleSignUpUSerNameChange(event) {
    setSignUpUserName(event.target.value);
  }

  function handleSignUpPasswordChange(event) {
    setSignUpPassword(event.target.value);
  }


  const handleSendMessage = async () => {

    // Add the user's message to chat history immediately
    setChatHistory([...chatHistory, { user: userInput }]);

    // Clear the user input
    setUserInput('');

    // Simulate a delay before receiving the response (adjust the timeout as needed)
    const delay = 1000; // 1 second delay
    await new Promise(resolve => setTimeout(resolve, delay));

    // Now fetch the bot response
    const response = await fetch('http://13.201.136.110:80/api/get_response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_input: userInput }),
    });

    const { bot_response } = await response.json();

    // Add both user input and bot response to chat history after the delay
    setChatHistory([...chatHistory, { user: userInput, bot: bot_response }]);
  };



  const handleLogin = () => {
    // e.preventDefault();
    // Add logic for handling login, for example, using fetch to authenticate
    // After successful authentication, set isLoggedIn to true and store the username
    setShowSignUpForm(false);
    setIsLoginSuccess(false);
    setIsLoggedIn(true);
    //setUsername('username'); // Replace 'username' with the actual username
  };

  const handleLogout = () => {
    // Add logic for handling logout, reset isLoggedIn and username
    setShowSignUpForm(false);
    setIsLoggedIn(false);
    setIsLoginSuccess(false);
    // setUsername('');
  };

  const loginUser = (e) => {
    e.preventDefault();

    // Data to be sent to the backend
    const loginData = {
      username: userName,
      password: password
    };

    // Send login data to the backend
    fetch('http://13.201.136.110:80/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Login failed');

        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the response from the backend
        // Handle successful login (if needed)

        setShowSignUpForm(false);
        setIsLoggedIn(false);
        setIsLoginSuccess(true);
      })
      .catch(error => {
        console.error('Error:', error.message);
        // Handle login error (if needed)
        // alert(error.message);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid User Name or Password",
          showConfirmButton: false,
          timer: 5000,
        });
      });

  }

  const handleSignUp = (e) => {
    e.preventDefault();

    // Data to be sent to the backend
    const signUpData = {
      username: signUpUserName,
      password: signUpPassword,
      firstName: firstName,
      email: email
    };

    // Send sign-up data to the backend
    fetch('http://13.201.136.110:80/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Sign-up failed');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the response from the backend
        // Handle successful sign-up (if needed)
        if (data.response === 0) {
          console.log(data.response);
          // Success
          Swal.fire({
            icon: "success",
            text: "Congratulations! You have successfully signed up.",
            showConfirmButton: false,
            timer: 5000,
          });
          // swal("Success!", "User signed up successfully", "success");
          setShowSignUpForm(false);
          setIsLoggedIn(false);

          setTimeout(() => {
            setIsLoginSuccess(true);
          }, 6000)

        } else if (data.response === 1) {
          // Username already exists
          // swal("Error!", "Username already exists", "error");
          Swal.fire({
            icon: "error",
            text: "Sorry, Username already exists.",
            showConfirmButton: false,
            timer: 5000,
          });
        }
      })
      .catch(error => {
        console.error('Error:', error.message);
        // Handle sign-up error (if needed)
      });


  }


  return (
    <div className="chatbot-container" style={{ position: "relative" }}>
      <img src={exampleImage} style={{ maxWidth: "100%", height: "auto" }} alt="Body Image" />

      {/* <div className="top-0 start-0 d-flex align-items-center justify-content-between" style={{ backgroundColor: "white", "height": "75px", width: "100%" }} > */}
      <div className="body-section" >
        {/* Image */}


        {/* Organization name */}
        <div className="d-flex align-items-start mt-3" style={{ position: "absolute", top: 0, left: 0, marginLeft: 11 }}>
          <p className="orgName mb-1 fs-5 fw-bold" style={{ color: "white" }}>Health Assistant</p>
        </div>

        {/* Login/Logout button */}
        <div className="d-flex justify-content-end mt-3" style={{ position: "absolute", top: 0, right: 0, marginRight: 11 }}>
          {isLoggedIn ? (
            <div style={{ marginRight: '10px' }}>
              <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div style={{ marginRight: '10px' }}>
              <button type="button" className="btn btn-light mb-2 mb-sm-0" onClick={handleLogin}>LogIn</button>
            </div>
          )}

          <button type="button"
            class="btn btn-outline-primary mb-3 mb-sm-0 ml-10"
            onClick={handleSignUpClick}
          >SignUp</button>
        </div>
      </div>



      {isLoginSuccess && (
        <div className="card card-35" style={{ position: "absolute", top: 0, left: 0 }}>
          <div id="header">
            <h1>Virtual Health Assistant!</h1>
          </div>
          <div id="message-section">

            {chatHistory.map((message, index) => (
              <div key={index} className={message.user ? 'user-message' : 'bot-message'}>
                {message.user && <div className="message-text" id='userm'><span id="user-mes">{message.user}</span></div>}
                <div className="message" id="bot">
                  <span id="bot-response"> {message.bot}</span>

                </div>
              </div>
            ))}

          </div>


          {/* <div id="input-section">
            <input
              id="input"
              type="text"
              placeholder="Type a message"
              autoComplete="off"
              autoFocus="autofocus"
              value={userInput}
              onChange={handleUserInput}
            />
            <button onClick={handleSendMessage}>
              <SendIcon />
            </button>

          </div> */}

<Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "35vw" }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Type your message here"
        inputProps={{ "aria-label": "message" }}
        value={userInput}
        onChange={handleUserInput}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions" onClick={handleSendMessage}>
        <SendIcon />
      </IconButton>
    </Paper>



        </div>


      )}

      {isLoggedIn && (
        <div className="card card-23" style={{ position: "absolute", top: 0, left: 0 }}>

          <div className="card-body">

          <div className="text-center">
              <h4>Log In</h4>
            </div>

            <form
              onSubmit={loginUser}

            >

              <div className="form-group mb-4">
                <div className="d-flex align-items-start ">
                  <label
                    htmlFor="id_input_fm_1_userName"
                    className="col-form-label pt-0"
                  >
                    User Name
                  </label>
                </div>
                <input
                  id="id_input_fm_1_userName"
                  name="fm_1_userName"
                  className="form-control"
                  placeholder="Enter Your User Name"
                  type="text"
                  value={userName}
                  onChange={handleUserNameChange}

                  required
                />

              </div>
              <div className="form-group mb-4">
                <div className="d-flex align-items-start">
                  <label
                    htmlFor="id_input_fm_1_password"
                    className="col-form-label pt-0"
                  >
                    Password
                  </label>
                </div>
                <input
                  id="id_input_fm_1_password"
                  name="fm_1_password"
                  className="form-control"
                  placeholder="Enter Your Password"
                  type="password"
                  value={password}
                  onChange={(evt) => handlePasswordChange(evt)}
                  required
                  aria-describedby="basic-addon2"
                />
              </div>
              <div className="form-group form-row mt-3 mb-0 d-grid">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>

        </div>
      )}

      {showSignUpForm && (
        <div className="card card-36" style={{ position: "absolute", top: 0, left: 0 }}>
          <div className="card-body">
            <div className="text-center">
              <h4>Sign Up</h4>
            </div>

            <form
              onSubmit={handleSignUp}
            >

              <div className="form-group mb-2">
                <label
                  htmlFor="id_input_fm_1_first_name"
                  className="col-form-label pt-0 d-flex align-items-start required-input-mark"
                >
                  First Name
                </label>
                <input
                  id="id_input_fm_1_first_name"
                  name="fm_1_first_name"
                  type="text"
                  className="form-control"
                  placeholder="Enter First Name"
                  autoComplete="off"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required
                />
              </div>


              <div className="form-group mb-2">
                <label
                  htmlFor="id_input_fm_1_email"
                  className="col-form-label pt-0 required-input-mark"
                >
                  Email
                </label>
                <input
                  id="id_input_fm_1_email"
                  name="fm_1_email"
                  className="form-control"
                  placeholder="Enter Email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>

              <div className="form-group mb-2">
                <div className="d-flex align-items-start required-input-mark">
                  <label
                    htmlFor="id_input_fm_1_signupUserName"
                    className="col-form-label pt-0"
                  >
                    User Name
                  </label>
                </div>
                <input
                  id="id_input_fm_1_signupUserName"
                  name="fm_1_signupUserName"
                  className="form-control"
                  placeholder="Enter Your User Name"
                  type="text"
                  value={signUpUserName}
                  onChange={handleSignUpUSerNameChange}

                  required
                />

              </div>
              <div className="form-group mb-2">
                <div className="d-flex align-items-start required-input-mark">
                  <label
                    htmlFor="id_input_fm_1_signupPassword"
                    className="col-form-label pt-0"
                  >
                    Password
                  </label>
                </div>
                <input
                  id="id_input_fm_1_signupPassword"
                  name="fm_1_signupPassword"
                  className="form-control"
                  placeholder="Enter Your Password"
                  type="password"
                  value={signUpPassword}
                  onChange={(evt) => handleSignUpPasswordChange(evt)}
                  required
                  aria-describedby="basic-addon2"
                />
              </div>


              <div className="form-group form-row mt-3 mb-0 d-grid">
                <button className="btn btn-primary" type="submit">
                  Sign Up
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* //  : (
      //   <div className="body-section">
      //   <img src={exampleImage} style={{maxWidth:"100%",height:"auto"}} alt="Body Image" />
      // </div>
      //  )} */}
    </div>
  );

};

export default ChatbotInterface;
