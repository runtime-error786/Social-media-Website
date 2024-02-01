import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { NavLink } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import { FaInstagram } from "react-icons/fa";
import "../App.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Role,R1 } from '../Redux/Action';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#182C61', // Set the background color to yellow
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const CustomDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      backgroundColor: '#182C61', // Set the background color of the drawer to yellow
      ...(open ? openedMixin(theme) : closedMixin(theme)),
      '& .MuiDrawer-paper': {
        backgroundColor: '#182C61', // Set the background color of the drawer content to yellow
        ...(open ? openedMixin(theme) : closedMixin(theme)),
      },
    }),
  );
  
 // ... (previous imports)

export default function MiniDrawer() {
    const dispatch = useDispatch();
  const role = useSelector((state) => state.Role);

  const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    let [role1,setr] = React.useState(role);
    React.useEffect(() => {
        dispatch(Role());

        setr(role);
      }, [role]); // Only re-run the effect if `role` changes
let Signout = async () => {
  try {
    const response = await axios.post(
      'http://localhost:2001/delete',
      {},
      {
        withCredentials: true,
      }
    );

    // Dispatch the action to update the Redux store
    dispatch(R1("Gue"));

    // Update the role state
    setr("Gue");

    // Navigate to the sign-in page
    navigate('/signin');
  } catch (error) {
    console.error(error);
  }
};


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    console.log("from",role,role1)
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" noWrap component="div" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
  <FaInstagram style={{ marginBottom: '5px' }} /> {/* Adjust margin-bottom as needed */}
  ConnectHub
</Typography>

                </Toolbar>
            </AppBar>
            <CustomDrawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                {role1==="Cus" && 
                <>
                    <ListItem key="house" disablePadding>
                        <ListItemButton
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                color: 'white',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                             <NavLink to="/home" className="nav-link" sx={{ textDecoration: 'none !important', color: "white", display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                <i className="fa-solid fa-house" style={{ color: "white", fontSize: "30px" }}></i>
                                </NavLink>
                            </ListItemIcon>
                            {open && (
                                <NavLink to="/home" className="nav-link" sx={{ textDecoration: 'none !important', color: "white", display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <Typography variant="inherit" noWrap sx={{ textDecoration: 'none !important', color: "white" }}>
                                        Home
                                    </Typography>
                                </NavLink>
                            )}
                        </ListItemButton>
                    </ListItem>

                   

                   
                    

                    <ListItem key="save" disablePadding>
                        <ListItemButton
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                color: 'white',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                              <NavLink to="/save" className="nav-link" sx={{ textDecoration: 'none important', color: "white", display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>

                                <i class="fa-sharp fa-solid fa-floppy-disk" style={{ color: "white", fontSize: "30px" }}></i>
                              </NavLink>

                            </ListItemIcon>
                            {open && (
                                <NavLink to="/save" className="nav-link" sx={{ textDecoration: 'none important', color: "white", display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <Typography variant="inherit" noWrap sx={{ textDecoration: 'none  important', color: "white" }}>
                                        Save Post
                                    </Typography>
                                </NavLink>
                            )}
                        </ListItemButton>
                    </ListItem>

                    <ListItem key="explore" disablePadding>
                        <ListItemButton
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                color: 'white',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                             <NavLink to="/explore/:null" className="nav-link" sx={{ textDecoration: 'none important', color: "white", display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>

                                <i class="fa-solid fa-browser" style={{ color: "white", fontSize: "30px" }}></i>
                             </NavLink>

                            </ListItemIcon>
                            {open && (
                                <NavLink to="/explore/:null" className="nav-link" sx={{ textDecoration: 'none important', color: "white", display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <Typography variant="inherit" noWrap sx={{ textDecoration: 'none  important', color: "white" }}>
                                        Explore
                                    </Typography>
                                </NavLink>
                            )}
                        </ListItemButton>
                    </ListItem>

                    <ListItem key="post" disablePadding>
                        <ListItemButton
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                color: 'white',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                            <NavLink to="/post" className="nav-link" sx={{ textDecoration: 'none important', color: "white", display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>

                            <i class="fa-solid fa-mailbox" style={{ color: "white", fontSize: "30px" }}></i>
                            </NavLink>
                            </ListItemIcon>
                            {open && (
                                <NavLink to="/post" className="nav-link" sx={{ textDecoration: 'none important', color: "white", display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <Typography variant="inherit" noWrap sx={{ textDecoration: 'none  important', color: "white" }}>
                                        Create Post
                                    </Typography>
                                </NavLink>
                            )}
                        </ListItemButton>
                    </ListItem>
                    
                            
                    <ListItem key="help" disablePadding>
                        <ListItemButton
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                color: 'white',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                              <NavLink to="/help" className="nav-link" sx={{ textDecoration: 'none important', color: "white", display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>

                                <i class="fa-sharp fa-solid fa-circle-info" style={{ color: "white", fontSize: "30px" }}></i>
                              </NavLink>

                            </ListItemIcon>
                            {open && (
                                <NavLink to="/help" className="nav-link" sx={{ textDecoration: 'none important', color: "white", display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <Typography variant="inherit" noWrap sx={{ textDecoration: 'none  important', color: "white" }}>
                                        Help
                                    </Typography>
                                </NavLink>
                            )}
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="profile" disablePadding>
                        <ListItemButton
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                color: 'white',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                             <NavLink to="/profile" className="nav-link" sx={{ textDecoration: 'none important', color: "white", display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>

                                <i class="fa-solid fa-user"  style={{ color: "white", fontSize: "30px" }}></i>
                             </NavLink>

                            </ListItemIcon>
                            {open && (
                                <NavLink to="/profile" className="nav-link" sx={{ textDecoration: 'none important', color: "white", display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <Typography variant="inherit" noWrap sx={{ textDecoration: 'none  important', color: "white" }}>
                                        Profile
                                    </Typography>
                                </NavLink>
                            )}
                        </ListItemButton>
                    </ListItem>
</>
                }
{role1==="Gue" && (
    <>

    
                    <ListItem key="signin" disablePadding>
                        <ListItemButton
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                color: 'white',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                              <NavLink to="/signin" className="nav-link" sx={{ textDecoration: 'none !important', color: "white", display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>

                                <i class="fa-solid fa-right-to-bracket" style={{ color: "white", fontSize: "30px" }}></i>
                              </NavLink>

                            </ListItemIcon>
                            {open && (
                                <NavLink to="/signin" className="nav-link" sx={{ textDecoration: 'none !important', color: "white", display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <Typography variant="inherit" noWrap sx={{ textDecoration: 'none !important', color: "white" }}>
                                        Sign in
                                    </Typography>
                                </NavLink>
                            )}
                        </ListItemButton>
                    </ListItem>
</>
)}
{role1==="Cus" && <>
                    <ListItem key="signout" disablePadding>
                        <ListItemButton
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                color: 'white',
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'white',
                                }}
                            >
                             <NavLink  className="nav-link" sx={{ textDecoration: 'none !important', color: "white", display: 'flex', flexDirection: 'column', marginLeft: '10px' }} onClick={Signout}>

                                <i class="fa-solid fa-arrow-right-from-bracket" style={{ color: "white", fontSize: "30px" }}></i>
                             </NavLink>

                            </ListItemIcon>
                           

                            {open && (
                                <NavLink  className="nav-link" sx={{ textDecoration: 'none !important', color: "white", display: 'flex', flexDirection: 'column', marginLeft: '10px' }} onClick={()=>{
                                    Signout()
                                }}>
                                    <Typography variant="inherit" noWrap sx={{ textDecoration: 'none !important', color: "white" }}>
                                        Sign out
                                    </Typography>
                                </NavLink>
                            )}
                        </ListItemButton>
                    </ListItem>
                    </>}
                </List>
                <Divider />
                {/* Additional list items if needed */}
            </CustomDrawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {/* Main content */}
            </Box>
        </Box>
    );
}
