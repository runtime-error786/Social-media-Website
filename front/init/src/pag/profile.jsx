import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const UserProfile = () => {
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [userData, setUserData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    city: 'Pakistan',
    country: '',
    profilePicUrl: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:2001/profile', {
          withCredentials: true,
        });

        setUserData(response.data.user);
        
        console.log(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const [editable, setEditable] = useState(false);

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    try {
      // Perform save/update logic (e.g., API call)
      const formData = new FormData();
      formData.append('profilePic', profilePicFile);
      formData.append('userData', JSON.stringify(userData));

      const response = await axios.put('http://localhost:2001/updateprofile', formData, {
        withCredentials: true,
      });

      // Check the response and update state or handle accordingly
      const response1 = await axios.get('http://localhost:2001/profile', {
        withCredentials: true,
      });

      setUserData(response1.data.user);
      console.log(response1.data.user);
      setEditable(false);
    } catch (error) {
      console.error('Error saving user profile:', error);
      // Handle errors, show a notification, etc.
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [profilePicUrl, setProfilePicUrl] = useState(userData.profilePicUrl);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);
  
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  
  
 
  

  return (
    <>
      <div style={{ textAlign: 'center',zIndex:'1'}} className='l1'>
      <img
    src={profilePicFile ? profilePicUrl : userData.profilePicUrl}
    alt="Profile"
    style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '30px' }}
    onError={(e) => console.error('Image loading error:', e)}
  />

        {editable && (
            <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block',zIndex:'2' }}>
  <button className="custom-file-input-button">
  <i class="fa-solid fa-camera fa-2xl"></i>
  </button>
  <input
    type="file"
    accept="image/*"
    name="profilePicUrl"
    onChange={handleFileInputChange}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: 0,
      cursor: 'pointer',
      width: '100%',
      height: '100%',
    }}
  />
</div>
        )}
      </div>
      <div className='p1' style={{ display: 'flex', justifyContent: 'space-between', width: "80%"}}>
        {/* Left side text fields */}
        <div style={{ width: '40%' }}>
          <TextField
            label="First Name"
            value={userData.fname}
            onChange={handleInputChange}
            InputProps={{
              readOnly: !editable,
            }}
            name='fname'
            fullWidth
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Last Name"
            value={userData.lname}
            onChange={handleInputChange}
            InputProps={{
              readOnly: !editable,
            }}
            fullWidth
            name='lname'
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Email"
            value={userData.email}
            onChange={handleInputChange}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
            name='email'
            style={{ marginBottom: '10px' }}
          />
        </div>

        {/* Right side text fields */}
        <div style={{ width: '40%' }}>
          <TextField
            label="Phone"
            value={userData.phone}
            onChange={handleInputChange}
            InputProps={{
              readOnly: !editable,
            }}
            fullWidth
            name='phone'
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="City"
            value={userData.city}
            onChange={handleInputChange}
            InputProps={{
              readOnly: !editable,
            }}
            fullWidth
            name='city'
            style={{ marginBottom: '10px' }}
          />
          <TextField
            label="Country"
            value={userData.country}
            onChange={handleInputChange}
            InputProps={{
              readOnly: !editable,
            }}
            fullWidth
            name='country'
            style={{ marginBottom: '10px' }}
          />
        </div>

        {/* Edit and Save buttons */}
      </div>
      <div style={{ width: '100%', marginTop: '20px', textAlign: 'center' }}>
        {editable ? (
          <button onClick={handleSave} className="glowbutton1">
            <div className="wrapper">
              <span>Save</span>
              <div className="circle circle-12"></div>
              <div className="circle circle-11"></div>
              <div className="circle circle-10"></div>
              <div className="circle circle-9"></div>
              <div className="circle circle-8"></div>
              <div className="circle circle-7"></div>
              <div className="circle circle-6"></div>
              <div className="circle circle-5"></div>
              <div className="circle circle-4"></div>
              <div className="circle circle-3"></div>
              <div className="circle circle-2"></div>
              <div className="circle circle-1"></div>
            </div>
          </button>
        ) : (
          <button onClick={handleEdit} className="glowbutton1">
            <div className="wrapper">
              <span>Edit</span>
              <div className="circle circle-12"></div>
              <div className="circle circle-11"></div>
              <div className="circle circle-10"></div>
              <div className="circle circle-9"></div>
              <div className="circle circle-8"></div>
              <div className="circle circle-7"></div>
              <div className="circle circle-6"></div>
              <div className="circle circle-5"></div>
              <div className="circle circle-4"></div>
              <div className="circle circle-3"></div>
              <div className="circle circle-2"></div>
              <div className="circle circle-1"></div>
            </div>
          </button>
        )}
      </div>
    </>
  );
};

export default UserProfile;
