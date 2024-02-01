import {
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { r1, setPr, setReel,setPr1,setPr3 } from '../Redux/Action';
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
import PaginationItem from '@mui/material/PaginationItem';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PieChart } from '@mui/x-charts/PieChart';

const palette = ['red', 'blue'];

const PieColor = ({ reelCount, followerCount }) => {
    const pieParams = { height: 100, margin: { right: 0 } };
    const palette = ['red', 'blue']; // Define your palette here
  
    // Calculate the percentage of reel count and follower count
    const total = reelCount + followerCount;
    const reelPercentage = (reelCount / total) * 100;
    const followerPercentage = (followerCount / total) * 100;
  
    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box flexGrow={1} textAlign="center">
          <PieChart
            series={[{ data: [{ value: reelPercentage }, { value: followerPercentage }] }]}
            colors={palette}
            {...pieParams}
          />
        </Box>
        <Box flexGrow={1} textAlign="center">
          <Typography>Reel: {reelCount}</Typography>
          <Typography>Follower: {followerCount}</Typography>
        </Box>
      </Stack>
    );
  };
  

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
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

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
  
  

const Dash = () => {
  const dispatch = useDispatch();
  const reels = useSelector((state) => state.Profile);
  const [Search, setSearch] = useState("");
  let { Id } = useParams();
  const reels2 = useSelector((state) => state.Profile2);
  const Prof = useSelector((state) => state.All);
  const [isSaved, setIsSaved] = useState(false);
  const reels21 = useSelector((state) => state.Coun);
  const reels22 = useSelector((state) => state.Cou);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    dispatch(setPr3());
  };

  useEffect(() => {
    dispatch(setPr3());
  }, [dispatch]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(min-width:601px) and (max-width:1024px)');
  const isLaptop = useMediaQuery('(min-width:1025px)');

  const tableWidth = isMobile ? '85%' : (isTablet ? '70%' : '60%');
  const marginLeft = isMobile ? '15%' : (isTablet ? '20%' : '350px');

  const handleSaveToggle = async (Id) => {
    try {
      const response = await axios.post('http://localhost:2001/savep', {
        folId: Id,
      }, { withCredentials: true });
        dispatch(setPr3());
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
          <div className='k22' style={{display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
          <div className='as111'>
          <PieColor reelCount={reels21} followerCount={reels2.length}></PieColor>
          </div>
          <div className='as33'>
          <i class="fa-solid fa-user-plus" style={{fontSize:"50px"}}></i><b style={{fontSize:"50px"}}>&nbsp;
          &nbsp; {reels2.length}</b>
          </div>
          <div className='as34'>
          <i class="fa-solid fa-video"  style={{fontSize:"50px"}}></i> <b style={{fontSize:"50px"}}>&nbsp;
          &nbsp;{reels21}</b>
          </div>
          </div>
          
            <TableContainer component={Paper} className='kk' style={{ maxHeight: '400px', overflowY: 'auto', backgroundColor: "#2f3640", width: tableWidth, marginLeft: marginLeft }}> 
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{color:"white" }}>Firstname</TableCell>
            <TableCell align="right" style={{color:"white" }}>Lastname</TableCell>
            <TableCell align="right" style={{color:"white" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {reels2 && reels2.map((row) => (
  row.followerProfile && // Add this conditional check
  <TableRow
    key={row.followerProfile._id}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    <TableCell component="th" scope="row" style={{color:"white" }} >
      {row.followerProfile.fname}
    </TableCell>
    <TableCell align="right" style={{color:"white" }}>{row.followerProfile.lname}</TableCell>
    <TableCell align="right" style={{color:"red"}} onClick={()=>{handleSaveToggle(row.followerProfile._id)}}>Remove</TableCell>
  </TableRow>
))}

          
        </TableBody>
      </Table>
    </TableContainer>
        </>
      
  );
};

export default Dash;
