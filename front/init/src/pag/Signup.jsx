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

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the respective state based on the input field's name
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'country':
        setCountry(value);
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
    if (!firstName || !lastName || !email || !phone || !city || !country || !password || !profileImage) {
        toast('Please fill in all the required fields', { autoClose: 3000 }); // Auto-close after 3 seconds

        return;
      }
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('city', city);
      formData.append('country', country);
      formData.append('password', password);
      formData.append('profileImage', profileImage);
  
      const response = await axios.post('http://localhost:2001/signup', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      toast('Profile created successfully', { autoClose: 3000 }); // Auto-close after 3 seconds

      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setCity('');
      setCountry('');
      setPassword('');
      setProfileImage('');
    } catch (error) {
        console.error('Error:', error);  // Log the entire error object
        if (error.response) {
            toast('Profile already found', { autoClose: 3000 }); // Auto-close after 3 seconds
        } else if (error.request) {
          console.error('No Response from Server');
          toast('Server not respond', { autoClose: 3000 }); // Auto-close after 3 seconds
        } else {
          console.error('Error:', error.message);
        }
      }
  };
  
  return (
    <>

    
    <form className="signup-form">
   
      <TextField
        id="outlined-firstname"
        label="First Name"
        variant="outlined"
        fullWidth
        margin="normal"
        name="firstName"
        value={firstName}
        onChange={handleInputChange}
      />
      <TextField
        id="outlined-lastname"
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
        name="lastName"
        value={lastName}
        onChange={handleInputChange}
      />
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
      <TextField
        id="outlined-phone"
        label="Phone"
        variant="outlined"
        fullWidth
        margin="normal"
        name="phone"
        value={phone}
        onChange={handleInputChange}
      />
      <TextField
        id="outlined-city"
        label="City"
        variant="outlined"
        fullWidth
        margin="normal"
        name="city"
        value={city}
        onChange={handleInputChange}
      />
      <TextField
        id="outlined-country"
        label="Country"
        variant="outlined"
        fullWidth
        margin="normal"
        name="country"
        value={country}
        onChange={handleInputChange}
      />
      
      <FormControl sx={{ marginTop: '20px' }} className="signup-form1" variant="outlined">
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
        <FormControl fullWidth sx={{ marginTop: '20px' }}>
          <InputLabel htmlFor="upload-profile-pic"></InputLabel>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload Profile Pic
            <input
              id="upload-profile-pic"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </Button>
          {profileImage && (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Profile Preview"
              style={{width:"100px",height:"100px"}}
              id='i2'
            />
          )}
        </FormControl>
          <button onClick={handleSubmit} class="glowbutton">
    <div class="wrapper">
        <span>Submit</span>
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
        src="https://images.ctfassets.net/y6oq7udscnj8/1iIQLKt7yrvW0A034KZr6D/3f4887c4e16fdcb360d58698d3a2739b/MJ-BLOG-Form-builder.png"
        alt="Signup Now Poster"
        id='i1'
      />
       <ToastContainer />
    </>
  );
};

export default SignupForm;
