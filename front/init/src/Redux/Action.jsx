// actions.js
import axios from 'axios';

export const setReel = (sea,sort,currentPage) => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:2001/reels', {
  params: {
    search: sea,
    sort: sort,
    current: currentPage,
    pageSize: 3,
  },
});
  
      const reelsData = response.data.reels;

      // Dispatch the SET_REEL action with the retrieved data
      dispatch({
        type: "Reel",
        payload: reelsData,
      });

      dispatch({
        type: "C",
        payload: response.data.current,
      });

      dispatch({
        type: "T",
        payload: response.data.totalPage,
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
};

export const r1 = (sea) => {
  return async (dispatch) => {
      dispatch({
        type: "C",
        payload: sea,
      });
};
}

export const setPr = (sea) => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:2001/profile1', {
  params: {
    search: sea,
  },
  withCredentials:true
});
      const reelsData = response.data.profiles;

      // Dispatch the SET_REEL action with the retrieved data
      dispatch({
        type: "Pr",
        payload: reelsData,
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
};

export const setPr1 = (sea) => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:2001/profile2', {
  params: {
    Id: sea,
  },
  withCredentials:true
});
      console.log(response.data.profiles.reel);
      const reelsData = response.data.profiles.reel;
      const response1 = await axios.get('http://localhost:2001/cx', {
        withCredentials:true
      });
      // Dispatch the SET_REEL action with the retrieved data
      dispatch({
        type: "Pr2",
        payload: reelsData,
      });
      dispatch({
        type: "all",
        payload: response.data.profiles,
      });
      dispatch({
        type: "Coun",
        payload:response1.data.reelCount,
      });
      
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
};

export const setPr2 = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:2001/profile3', {
  withCredentials:true
});



console.log(response.data.reelsArray);
      const reelsData = response.data.reelsArray;
      // Dispatch the SET_REEL action with the retrieved data
      dispatch({
        type: "Pr2",
        payload: reelsData,
      });
      
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
};

export const setPr3 = () => {
  return async (dispatch) => {
    try {
     
      const response1 = await axios.get('http://localhost:2001/cy', {
        withCredentials:true
      });
      const response2 = await axios.get('http://localhost:2001/cou', {
        withCredentials:true
      });
      const reelsData = response1.data.userProfile;
      // Dispatch the SET_REEL action with the retrieved data
      console.log(response1.data.followersDetails);
      dispatch({
        type: "Pr2",
        payload: response1.data.followersDetails,
      });
      dispatch({
        type: "Coun",
        payload:reelsData.reelcount,
      });
      dispatch({
        type: "Cou",
        payload:response2.data.totalSavedUsersCount,
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
};
export const Role = () => {
  return async (dispatch) => {
    try {
     
      const response1 = await axios.get('http://localhost:2001/role', {
        withCredentials:true
      });
     
      
      dispatch({
        type: "Role",
        payload:response1.data.f,
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
};
export const R1 = (C) => {
  return async (dispatch) => {
    try {
     
     
      dispatch({
        type: "Role",
        payload:C,
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };
};