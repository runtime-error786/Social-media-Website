import logo from './logo.svg';
import './App.css';
import React from 'react';
import MiniDrawer from './pag/drawer';
import { BrowserRouter , Route, Routes, useParams } from 'react-router-dom';
import SignupForm from './pag/Signup';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signin from './pag/Signin';
import UserProfile from './pag/profile';
import Post from './pag/CreatePost';
import Home from './pag/Home';
import { Provider } from 'react-redux';
import { Storee } from './Store';
import Explore from './pag/Explore';
import Save from './pag/Save';
import { Mainaa } from './pag/Help';
import Dash from './pag/Dash';
import { useDispatch, useSelector } from 'react-redux';
import { Role } from './Redux/Action';
import { Error } from './pag/Error';
const ProtectedRoute = ({ path, element }) => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.Role);
  dispatch(Role());
  const { type } = useParams();
  if (role === "Cus" && (path==="/home" || path === "/Signup"  || path === "/profile" || path === "/post" || path==="/explore/:Id" || path==="/save"|| path==="/help")) {
    return element;
  } else if (role === "Gue" && (path === "/signin" || path==="/Signup")) {
    return element;
  }
   else {
    return <Error />;
  }
};
function App() {
  return (
    <>
    <Provider store={Storee}>

    <BrowserRouter >
    <MiniDrawer></MiniDrawer>
        <Routes>
        <Route path="/home" element={<ProtectedRoute path="/home" element={<Home />}></ProtectedRoute>}></Route>
        <Route path="/Signup" element={<ProtectedRoute path="/Signup" element={<SignupForm />}></ProtectedRoute>}></Route>
        <Route path="/signin" element={<ProtectedRoute path="/signin" element={<Signin />}></ProtectedRoute>}></Route>
        <Route path="/profile" element={<ProtectedRoute path="/profile" element={<UserProfile />}></ProtectedRoute>}></Route>
        <Route path="/post" element={<ProtectedRoute path="/post" element={<Post />}></ProtectedRoute>}></Route>
        <Route path="/explore/:Id" element={<ProtectedRoute path="/explore/:Id" element={<Explore />}></ProtectedRoute>}></Route>
        <Route path="/save" element={<ProtectedRoute path="/save" element={<Save />}></ProtectedRoute>}></Route>
        <Route path="/help" element={<ProtectedRoute path="/help" element={<Mainaa />}></ProtectedRoute>}></Route>
        <Route path="/*" element={<ProtectedRoute path="/*" element={<Error />}></ProtectedRoute>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
