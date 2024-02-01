// Home.js
import { useDispatch, useSelector } from 'react-redux';
import { r1, setPr, setReel,setPr1 } from '../Redux/Action';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Current } from '../Redux/Reducer';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useMediaQuery from '@mui/material/useMediaQuery';
import PaginationItem from '@mui/material/PaginationItem';
import { useNavigate } from 'react-router-dom';

import {
  useParams,
} from "react-router-dom";
const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&::before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&::after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
      backgroundColor: "darkblue", // Set the switch color here

    },
  }));
  const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    color: theme.palette.text.primary, // Set the label color here
     
  }));

const ReelCard = ({ reel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleSaveToggle = async () => {
      try {
        setIsSaved((prevIsSaved) => !prevIsSaved);
        const response = await axios.post('http://localhost:2001/savef', {
          folId: reel._id,
            isSaved: !isSaved,
          },{withCredentials:true});
          
        if (response.data.success) {
          console.log('Reel saved/unsaved successfully.');
        } else {
          console.error('Failed to save/unsave reel.');
        }
      } catch (error) {
        console.error('Error saving/unsaving reel:', error);
      }
    };

    const handleNavigate = (Id) => {
      // Navigate to the desired page
      navigate(`/explore/:${Id}`);
    };

  useEffect(() => {
      const checkSavedStatus = async () => {
        try {
          const response = await axios.post('http://localhost:2001/checkf', {
            reelId: reel._id
          },{withCredentials:true});
          console.log(response);
          setIsSaved(response.data.isSaved);
        } catch (error) {
          console.error('Error checking saved status:', error);
        }
      };
      checkSavedStatus();
    }, []);

    return (
      <div key={reel._id} className="c32" >
  <div class="card1">
    <div class="card1-img-container">
      <img 
        src={`http://localhost:2001/Uploads/${reel.profilePic}`} 
        alt="..."
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    </div>
      <div className="cd" style={{color:"white"}}>{reel.fname}</div>

      <button className='ss' onClick={() => handleNavigate(reel._id)}>
 View Profile
</button>
  </div>
</div>
    );
  };
  
  const ReelCard1 = ({ reel }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSaved, setIsSaved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
  
    const handleSaveToggle = async () => {
        try {
          setIsSaved((prevIsSaved) => !prevIsSaved);
          const response = await axios.post('http://localhost:2001/save', {
              reelId: reel._id,
              isSaved: !isSaved,
            },{withCredentials:true});
            
          if (response.data.success) {
            console.log('Reel saved/unsaved successfully.');
          } else {
            console.error('Failed to save/unsave reel.');
          }
        } catch (error) {
          console.error('Error saving/unsaving reel:', error);
        }
      };
      
  
    
    const handleLikeToggle = async () => {
      try {
        setIsLiked((prevIsLiked) => !prevIsLiked);
        const response = await axios.post('http://localhost:2001/like', {
            reelId: reel._id,
            isSaved: !isLiked,
          },{withCredentials:true});
          
        if (response.data.success) {
          console.log('Reel saved/unsaved successfully.');
        } else {
          console.error('Failed to save/unsave reel.');
        }
      } catch (error) {
        console.error('Error saving/unsaving reel:', error);
      }
    };

    useEffect(() => {
        const checkSavedStatus = async () => {
          try {
            const response = await axios.post('http://localhost:2001/check', {
              reelId: reel._id,
            },{withCredentials:true});
    
            setIsSaved(response.data.isSaved);
            const response1 = await axios.post('http://localhost:2001/checkl', {
              reelId: reel._id,
            },{withCredentials:true});
    
            setIsLiked(response1.data.islike);
          } catch (error) {
            console.error('Error checking saved status:', error);
          }
        };
    
        checkSavedStatus();
      }, []);
      const handleNavigate = (Id) => {
        // Navigate to the desired page
        navigate(`/explore/:${Id}`);
      };
 
      return (
        <div key={reel._id} className="c32">
        <div className="card3">
          <div className='lo1'>
            <div className='css2' onClick={handleLikeToggle}>
            <i
  className={`fa-sharp fa-solid fa-heart fa-2xl ${isLiked ? 'not' : 'not1'}`}
></i>

            </div>
            <div className='css1' onClick={handleSaveToggle}>
              <i
                className={`fa-solid fa-bookmark fa-2xl  ${isSaved ? 's1' : 's2'}`}
              ></i>
            </div>
          </div>
          <div className="card-body" style={{ textAlign: "center" }}>
            {/* Your existing code for displaying reel information */}
            <h2 className="card-title" style={{ color: "White" }}>Title : {reel.title}</h2>
            <h3 className="card-text" style={{ color: "White" }}>Description:{reel.desc}</h3>
            <p className="card-text" style={{ color: "White" }}><small className="text-body-secondary">Last updated: {new Date(reel.date).toLocaleString()}</small></p>
            {reel.link.includes('.mp4') ? (
              <video className='c22' controls width="300">
                <source src={`http://localhost:2001/Uploads/${reel.link}`} type="video/mp4" />
              </video>
            ) : (
              <img style={{ display: "block", margin: "0 auto" }} src={`http://localhost:2001/Uploads/${reel.link}`} className="card-img-bottom1 c33" alt="..." />
            )}
            
            <hr style={{ color: "black" }}></hr>
          </div>
        </div>
      </div>
      );
    };

const Explore = () => {
  const dispatch = useDispatch();
  const reels = useSelector((state) => state.Profile);
  const [Search, setSearch] = useState("");
  let { Id } = useParams();
  const reels2 = useSelector((state) => state.Profile2);
  const Prof = useSelector((state) => state.All);
  const [isSaved, setIsSaved] = useState(false);
  const reels21 = useSelector((state) => state.Coun);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    dispatch(setPr(e.target.value));
  };

  useEffect(() => {
    dispatch(setPr(Search));
  }, [dispatch]);

 

  useEffect(() => {
    if (Id.substring(1) !== 'null') {
    const checkSavedStatus = async () => {
      try {
        const response = await axios.post('http://localhost:2001/checkf', {
          reelId: Id.substring(1)
        },{withCredentials:true});
        console.log(response);
        setIsSaved(response.data.isSaved);
      } catch (error) {
        console.error('Error checking saved status:', error);
      }
    };
    checkSavedStatus();
    dispatch(setPr1(Id.substring(1)));
  }}, [Id.substring(1)]);

  const handleSaveToggle = async (Id) => {
    try {
      const response = await axios.post('http://localhost:2001/savef', {
        folId: Id,
        isSaved: !isSaved, // This references the old state, which can lead to issues
      }, { withCredentials: true });
      setIsSaved((prevIsSaved) => !prevIsSaved); // Update based on previous state
      if (response.data.success) {
        console.log('Reel saved/unsaved successfully.');
      } else {
        console.error('Failed to save/unsave reel.');
      }
    } catch (error) {
      console.error('Error saving/unsaving reel:', error);
    }
  };
  

  return (
    <>
     
    {Id===':null' && 
    <>
    <div className='p12' style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
     <div class="container">
<div class="search-container">
  <input class="input" type="text" placeholder="Search" value={Search} onChange={handleInputChange}/>
  </div>
</div>
    </div>
      <div className='k23'>
      {reels &&
        reels.map((reel) => (
          <ReelCard key={reel._id} reel={reel} />
        ))}
      </div>
      </>
    }

    {Id!==':null' && 
        <>
          <div className='k22' style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
          <div className='as'>
          <img style={{ display: "block", margin: "0 auto" }} src={`http://localhost:2001/Uploads/${Prof.profilePic}`} className="c34" alt="..." />
          </div>
          <div className='as1'>
          <i class="fa-solid fa-user-plus" style={{fontSize:"50px"}}></i><b style={{fontSize:"50px"}}>&nbsp;
          &nbsp; {reels21}</b>
          </div>
          <div className='as2'>
          <i class="fa-solid fa-video"  style={{fontSize:"50px"}}></i> <b style={{fontSize:"50px"}}>&nbsp;
          &nbsp;{Prof.reelcount}</b>
          </div>
          <button className='lkl' onClick={() => handleSaveToggle(Id.substring(1))}>
          {isSaved ? (
  <>Remove</>
) : (
  <>
    Follow me 
  </>
)}

  <div class="star-1">
    <svg
      viewBox="0 0 16 16"
      class="bi bi-discord"
      fill="currentColor"
      height="25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"
      ></path>
    </svg>
  </div>
  <div class="star-2">
    <svg
      viewBox="0 0 16 16"
      class="bi bi-facebook"
      fill="currentColor"
      height="25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"
      ></path>
    </svg>
  </div>
  <div class="star-3">
    <svg
      viewBox="0 0 16 16"
      class="bi bi-messenger"
      fill="currentColor"
      height="25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.639.639 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.639.639 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76m5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z"
      ></path>
    </svg>
  </div>
  <div class="star-4">
    <svg
      viewBox="0 0 16 16"
      class="bi bi-whatsapp"
      fill="currentColor"
      height="25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
      ></path>
    </svg>
  </div>
  <div class="star-5">
    <svg
      viewBox="0 0 16 16"
      class="bi bi-instagram"
      fill="currentColor"
      height="25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
      ></path>
    </svg>
  </div>
  <div class="star-6">
    <svg
      viewBox="0 0 16 16"
      class="bi bi-twitter"
      fill="currentColor"
      height="25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15"
      ></path>
    </svg>
  </div>
</button>

            {reels2 && reels2.map((reel) => (<ReelCard1 key={reel._id} reel={reel} />))}
          </div>
        </>
      }
          </>
  );
};

export default Explore;
