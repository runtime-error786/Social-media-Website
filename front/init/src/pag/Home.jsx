// Home.js
import { useDispatch, useSelector } from 'react-redux';
import { r1, setReel } from '../Redux/Action';
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
      <div key={reel._id} className="c1">
        <div className="card">
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
              <video className='c2' controls width="300">
                <source src={`http://localhost:2001/Uploads/${reel.link}`} type="video/mp4" />
              </video>
            ) : (
              <img style={{ display: "block", margin: "0 auto" }} src={`http://localhost:2001/Uploads/${reel.link}`} className="card-img-bottom c3" alt="..." />
            )}
            
            <hr style={{ color: "black" }}></hr>
          </div>
        </div>
      </div>
    );
  };
  
const Home = () => {
  const dispatch = useDispatch();
  const reels = useSelector((state) => state.Reel);
  const [Search, setSearch] = useState("");
  const [switchState, setSwitchState] = useState(false);
  const Cur = useSelector((state) => state.Current);
  const Tot = useSelector((state) => state.Total);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTab = useMediaQuery('(max-width:768px)');

  const handleToggle = () => {
    setSwitchState((prevSwitchState) => !prevSwitchState);
    dispatch(r1(0));
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    dispatch(r1(0));
  };

  useEffect(() => {
    dispatch(setReel(Search, switchState, Cur));
  }, [dispatch, Cur]);

  const handleChange = (event, value) => {
    dispatch(r1(value));
  };

  return (
    <>
     <div className='p11' style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
     <div class="container1">
<div class="search-container">
  <input class="input" type="text" placeholder='Search' value={Search} onChange={handleInputChange}/>
  </div>
</div>
        <StyledFormControlLabel
    control={ <Android12Switch
            checked={switchState}
            onChange={handleToggle}
          />}
    label="sort by date"
  />

<div id="j1" style={{ width: '100%', textAlign: 'center' }}>
  {!isMobile && !isTab && (
    <Pagination
      count={Tot}
      color="primary"
      page={Cur}
      onChange={handleChange}
      style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          style={{ minWidth: '30px' }} // Adjust the width as needed
        />
      )}
    />
  )}
</div>


    

    <div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
	<div class="wheel"></div>
	<div class="hamster">
		<div class="hamster__body">
			<div class="hamster__head">
				<div class="hamster__ear"></div>
				<div class="hamster__eye"></div>
				<div class="hamster__nose"></div>
			</div>
			<div class="hamster__limb hamster__limb--fr"></div>
			<div class="hamster__limb hamster__limb--fl"></div>
			<div class="hamster__limb hamster__limb--br"></div>
			<div class="hamster__limb hamster__limb--bl"></div>
			<div class="hamster__tail"></div>
		</div>
	</div>
	<div class="spoke"></div>
</div>
    </div>
      <div className='k25'>
      {reels &&
        reels.map((reel) => (
          <ReelCard key={reel._id} reel={reel} />
        ))}
       
      {isTab && (
        <div style={{ display:"flex",justifyContent:"center",textAlign: 'center', marginTop: '20px',alignItems:"center",marginLeft:"35px" }}>
          <Pagination
            count={Tot }
            color="primary"
            page={Cur}
            onChange={handleChange}
          />
        </div>
      )}
      </div>
     
          </>
  );
};

export default Home;
