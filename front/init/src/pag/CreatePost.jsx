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

const Post = () => {
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const [profileImage, setProfileImage] = useState(null);

 

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the respective state based on the input field's name
    switch (name) {
      case 'title':
        settitle(value);
        break;
      case 'Description':
        setdesc(value);
        break;
      default:
        break;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      // Check the file type
      const fileType = file.type.split('/')[0];
  
      if (fileType === 'image') {
        // Handle image upload
        setProfileImage(file);
        toast('Image loaded successfully', { autoClose: 3000 });
      } else if (fileType === 'video') {
        // Handle video upload
        setProfileImage(file);
        toast('Video loaded successfully', { autoClose: 3000 });
      } else {
        toast('Invalid file type. Please upload an image or video.', { autoClose: 3000 });
      }
    } else {
      toast('No file selected', { autoClose: 3000 });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc ||  !profileImage) {
        toast('Please fill in all the required fields', { autoClose: 3000 }); // Auto-close after 3 seconds

        return;
      }
    try {
      // Create FormData object
      const formData = new FormData();
      formData.append('title', title);
      formData.append('desc', desc);
      formData.append('profileImage', profileImage);
  
      const response = await axios.post('http://localhost:2001/post', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      toast('Post Upload Successfully', { autoClose: 3000 }); // Auto-close after 3 seconds

      settitle('');
      setdesc('');
      setProfileImage('');
    } catch (error) {
        console.error('Error:', error);  // Log the entire error object
        if (error.response) {
            toast('Try Again', { autoClose: 3000 }); // Auto-close after 3 seconds
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
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        name="title"
        value={title}
        onChange={handleInputChange}
      />
      <TextField
        id="outlined-lastname"
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        name="Description"
        value={desc}
        onChange={handleInputChange}
      />
     
     

        <label for="file" class="custum-file-upload">
<div class="icon">
<svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
</div>
<div class="text">
   <span>Click here upload </span>
   </div>
   <input id="file" type="file" onChange={handleImageChange} />
</label>


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
        src="https://img.freepik.com/free-psd/social-media-instagram-post-template_47618-73.jpg"
        alt="Signup Now Poster"
        id='i3'
      />
       <ToastContainer />
    </>
  );
};

export default Post;
