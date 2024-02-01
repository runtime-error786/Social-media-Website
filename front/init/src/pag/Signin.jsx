import axios from 'axios';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { R1, Role } from '../Redux/Action';
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useDispatch();

  const role = useSelector((state) => state.Role);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the respective state based on the input field's name
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast('Please fill in all the required fields', { autoClose: 3000 });
      return;
    }
    console.log(email,password)
    try {
     
  
        const response = await axios.get('http://localhost:2001/signin', {
            params: {
              email,
              password,
            },
            withCredentials: true,
          });
  
      toast('Successfully Signin', { autoClose: 3000 });
      dispatch(R1("Cus"));
      navigate("/home")
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        toast('Wrong Credentials', { autoClose: 3000 });
      } else if (error.request) {
        console.error('No Response from Server');
        toast('Server not responding', { autoClose: 3000 });
      } else {
        console.error('Error:', error.message);
      }
    }
  };
  
  
  return (
    <>

    
    <form className="signup-form22">
   
     
      <TextField
        id="outlined-email"
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        margin="normal"
        name="email"
        value={email}
        onChange={handleInputChange}
      />
      
      
      <FormControl sx={{ marginTop: '20px' }} className="signup-form21" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name="password"
            value={password}
            onChange={handleInputChange}
          />
          
        </FormControl>
       
          <button onClick={handleSubmit} class="glowbutton h">
    <div class="wrapper">
        <span>Sign In</span>
        <div class="circle circle-12"></div>
        <div class="circle circle-11"></div>
        <div class="circle circle-10"></div>
        <div class="circle circle-9"></div>
        <div class="circle circle-8"></div>
        <div class="circle circle-7"></div>
        <div class="circle circle-6"></div>
        <div class="circle circle-5"></div>
        <div class="circle circle-4"></div>
        <div class="circle circle-3"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-1"></div>
    </div>
</button>
<hr></hr>
<button onClick={() => navigate("/Signup")} class="glowbutton h">
    <div class="wrapper">
        <span>Sign Up</span>
        <div class="circle circle-12"></div>
        <div class="circle circle-11"></div>
        <div class="circle circle-10"></div>
        <div class="circle circle-9"></div>
        <div class="circle circle-8"></div>
        <div class="circle circle-7"></div>
        <div class="circle circle-6"></div>
        <div class="circle circle-5"></div>
        <div class="circle circle-4"></div>
        <div class="circle circle-3"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-1"></div>
    </div>
</button>
       
      
    </form>
    <img
        src="https://t3.ftcdn.net/jpg/03/09/21/90/360_F_309219079_o7hZNE1dT8JUXGIsPNT3bW7906g4tj0Y.jpg"
        alt="Signup Now Poster"
        id='i11'
      />
       <ToastContainer />
    </>
  );
};

export default Signin;
