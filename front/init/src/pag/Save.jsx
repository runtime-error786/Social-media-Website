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
import { setPr2 } from '../Redux/Action';
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
            {reel.link && reel.link.includes('.mp4') ? (
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

const Save = () => {
  const dispatch = useDispatch();
  const reels = useSelector((state) => state.Profile);
  const [Search, setSearch] = useState("");
  let { Id } = useParams();
  const reels2 = useSelector((state) => state.Profile2);
  const Prof = useSelector((state) => state.All);
  const [isSaved, setIsSaved] = useState(false);


  useEffect(() => {
    dispatch(setPr2());
  }, [dispatch]);



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
         
      <div className='k23'>
      {reels2 &&
        reels2.map((reel) => (
          <ReelCard1 key={reel._id} reel={reel} />
        ))}
      </div>
    </>
  );
};

export default Save;
