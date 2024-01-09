import React, { useState, useContext, useEffect } from 'react';
import AuthContext from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes } from "@fortawesome/free-solid-svg-icons";
import "./RegisterPage.css";
import axios from 'axios'
import "./AuthStyles.css";
import blue_background from './blue.png';
import { NavLink } from 'react-router-dom';

function Register() {
  const [requirementsShow, setrequirementsShow] = useState('none')
  const [confirmHide, setConfirmHide] = useState(true)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
  const [usernameAvailable, setUsernameAvailable] = useState(true)
  const [emailAvailable, setemailAvailable] = useState(true)
  const [invalidFields, setInvalidFields] = useState()


  const [passMatchStyle, setpassMatchStyle] = useState('none')
  const [isEntirelyNumeric, setIsEntirelyNumeric] = useState('');
  const [numericColor, setNumericColor] = useState('black');
  const [lengthColor, setLengthColor] = useState('black');
  const [personalInfoColor, setPersonalInfoColor] = useState('black');
  const [commonPasswordColor, setCommonPasswordColor] = useState('black');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [username, setUsername] = useState('');
  const [first_name, setFirst_Name] = useState('');
  const [last_name, setLast_Name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const { registerUser, authTokens } = useContext(AuthContext);
  const history = useNavigate();


  const fetchCommonPasswords = async () => {
    try {
      const response = await fetch('./commonPass.txt');
      const passwords = await response.text();
      return passwords.split('\n');
    } catch (error) {
      console.error('Error fetching common passwords:', error);
      return [];
    }
  };  

  const checkCommonPassword = async () => {
    if (password === '') {
      setCommonPasswordColor('black');
      return;
    }
  
    const commonPasswords = await fetchCommonPasswords();
    const isCommonPassword = commonPasswords.includes(password.toLowerCase());
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (isCommonPassword || !hasNumber || !hasSymbol) {
      setCommonPasswordColor('red');
    } else {
      setCommonPasswordColor('green');
    }
  };

  const checkEmail = () => {
    const emailValue = email;
  
    if (emailValue.length === 0) {
      
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailRegex.test(emailValue)) {
        setEmailErrorMessage('Invalid Email');
      } else {
        setEmailErrorMessage('');
      }
    }
  };
  
  const checkUsernameAvailability = async () => {
    if (username === '') {
      setEmailErrorMessage('')
    } else{
        try {
          const response = await axios.get(`http://localhost:8000/api/check-username/${username}/`);
          const { isAvailable } = response.data;

          setUsernameAvailable(isAvailable);
        } catch (error) {
          console.error('Error checking username availability:', error);
        }
      }
  };
  
  const checkEmailAvailability = async () => {
    if (email === '') {
      setemailAvailable(true)
    } else{
        try {
          const response = await axios.get(`http://localhost:8000/api/check-email/${email}/`);
          const { isAvailable } = response.data;

          setemailAvailable(isAvailable);
        } catch (error) {
          console.error('Error checking username availability:', error);
        }
      }
  };

  const validateEntries = () => {
    if ((username !== '' && first_name !== '' && last_name !== '' && email !== '' && password !== '' && password2 !== '') && 
    (!usernameAvailable || emailErrorMessage || passMatchStyle === 'block' || lengthColor === 'red' || numericColor === 'red' || personalInfoColor === 'red' || commonPasswordColor === 'red')) {
      setInvalidFields(true)
    } else {
      setInvalidFields(false)
    }
  }
  

  const checkPersonalInfo = () => {
    if (password === '') {
      setPersonalInfoColor('black');
    } else {
      const stringsToCheck = [username, first_name, last_name];
      const lowercasePassword = password.toLowerCase();
      // const lowercasePassword2 = password2.toLowerCase();

      const filteredStrings = stringsToCheck.map(str => str.length >= 3 ? str : null).filter(Boolean); // strings that are at least three

      let matches = false

      for (const str of filteredStrings) {
        if (lowercasePassword.includes(str.toLowerCase().slice(0, 3))) {
          matches = true
        }
      }

      setPersonalInfoColor(matches? 'red' : 'green');
    }
  };


  const checkPasswordLength = () => {
    if (password === '') {
      setLengthColor('black'); // Set color to black if it's blank
      setrequirementsShow('none')
      setConfirmHide(true)
    } else {
      setLengthColor(password.length < 8 ? 'red' : 'green');
      setrequirementsShow('block')
      if (password.length < 8) {
        setConfirmHide(true)
        
      } else {
        setConfirmHide(false)
      }
    }
  };

  const checkPassMatch = () => {
    // console.log(password, password2)
    if (password2 === '') {
      setpassMatchStyle('none')
    } else {
      if (password !== password2) {
        setpassMatchStyle('block')
      } else {
        setpassMatchStyle('none')
        }
    }
  }

  const checkNumericPassword = () => {
    if (password === '') {
      setNumericColor('black'); // Set color to black if it's blank
      setIsEntirelyNumeric(false);
    } else {
      const numericRegex = /^[0-9]+$/;
      const isNumeric = password.match(numericRegex) !== null;
      setIsEntirelyNumeric(isNumeric);
      setNumericColor(isNumeric ? 'red' : 'green');
    }
  };

  useEffect(() => {

    checkPassMatch();
    checkPasswordLength();
    checkNumericPassword();
    checkPersonalInfo();
    checkCommonPassword();
    checkEmail()
    checkUsernameAvailability()
    checkUsernameAvailability()
    validateEntries()
  
    const passlength = document.getElementById('passlength');
    const match = document.getElementById('match');
    const entirelynumeric = document.getElementById('entirelynumeric');
    const personalinfo = document.getElementById('personalinfo');
    const toocommon = document.getElementById('toocommon');
  
    passlength.style.color = lengthColor;
    match.style.display = passMatchStyle;
    entirelynumeric.style.color = numericColor;
    personalinfo.style.color = personalInfoColor;
    toocommon.style.color = commonPasswordColor;

    if (
      !usernameAvailable ||
      emailErrorMessage ||
      passMatchStyle === 'block' ||
      lengthColor === 'red' ||
      numericColor === 'red' ||
      personalInfoColor === 'red' ||
      commonPasswordColor === 'red' ||
      username === '' ||
      first_name === '' ||
      last_name === '' ||
      email === '' ||
      password === '' ||
      password2 === ''
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  
    if (authTokens) {
      history('/dashboard');
    }
  }, [authTokens, history, lengthColor, password, password2, passMatchStyle, isEntirelyNumeric, numericColor, personalInfoColor, commonPasswordColor, usernameAvailable, emailAvailable]);
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(
      username,
      first_name,
      last_name,
      email,
      password,
      password2,
      handleSuccessfulRegistration
    );
  };

  const handleSuccessfulRegistration = () => {
    history("/login");
  };

  return (
    <>
      <img src={blue_background} alt="login form" className="auth-background-image"/>
      <div className='auth-container'>
        <div className="main">
          <form onSubmit={handleSubmit}>
            <div className="welcome">
              <FontAwesomeIcon icon={faCubes} className="icon" />
              <span className="title">Welcome to <b>Math Wizard</b></span>
            </div>
            <div className="sub-container">
              <div className="form-container">
                <h1 className="">Sign Up</h1>
                <div className="">
                  <label className="field-title" htmlFor="formUsername">Username</label>
                  <br />
                  {usernameAvailable ? null : <p style={{ color: 'red' }}><b>✘ Username Already Exists</b></p>}
                  <input type="text" id="formUsername" className="field" placeholder="Username" onKeyUp={checkUsernameAvailability} onChange={(e) => {e.persist();setUsername(e.target.value);}} />
                </div>
                <div className="">
                  <label className="field-title" htmlFor="formFirstName">First Name</label>
                  <br />
                  <input type="text" id="formFirstName" className="field" placeholder="First Name" onChange={e => setFirst_Name(e.target.value)} />
                </div>
                <div className="">
                  <label className="field-title" htmlFor="formLastName">Last Name</label>
                  <br />
                  <input type="text" id="formLastName" className="field" placeholder="Last Name" onChange={e => setLast_Name(e.target.value)} />
                </div>
                <div className="">
                  <label className="field-title" htmlFor="formEmail">Email Address</label>
                  <br />
                  {emailErrorMessage && (<p style={{ color: 'red'}}><b>✘ {emailErrorMessage}</b></p>)}
                  {emailAvailable ? null : <p style={{ color: 'red' }}><b>✘ This Email Address Is Already Registered With An Account</b></p>}
                  <input type="email" id="formEmail" className="field" placeholder="Email Address" onKeyUp={(e) => { checkEmail(); checkEmailAvailability(e); }} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="">
                  <label className="field-title" htmlFor="formPassword">Password</label>
                  <br />
                  <input type="password" id="formPassword" className="field" placeholder="Password" onChange={(e) => {e.persist();setPassword(e.target.value);}} />
                </div>
                <div className="">
                  <label className="field-title" htmlFor="formConfirmPassword">Confirm Password</label>
                  <br />
                  <input type="password" id="formConfirmPassword" className="field" disabled={confirmHide} placeholder="Confirm Password" onChange={(e) => {setPassword2(e.target.value)}} />
                </div>
                <div className='requirements' style={{display: requirementsShow}}>
                  <p id="match" style={{ color: 'red', display: passMatchStyle }}><b>✘ Passwords don't match</b></p>
                  <p id='passlength'>{lengthColor === 'green' ? '✔' : '✘'} Password must be at least 8 characters</p>
                  <p id='entirelynumeric'>{numericColor === 'green' ? '✔' : '✘'} Can't be entirely numeric</p>
                  <p id='toocommon'>{commonPasswordColor === 'green' ? '✔' : '✘'} Can't be too common (at least 1 number and special character)</p>
                  <p id='personalinfo'>{personalInfoColor === 'green' ? '✔' : '✘'} Can't have any personal information</p>
                </div>
                
                <div className="pt-1 mb-4">
                <label style={{color: 'red'}}>{invalidFields?<b>Review and validate all entries for accuracy and completeness</b>:''}</label>
                
                
                <div className="button-div">
                  <button className="button" disabled={isButtonDisabled} title="check all fields" type="submit">Register</button>
                </div>

                  <div className="account">
                    <p>Already have an account? <NavLink to="/login">Login here</NavLink></p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register;
