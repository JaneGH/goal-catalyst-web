import axios from 'axios';
import { clearStore } from '../features/user/userSlice';
import { getUserFromLocalStorage } from './localStorage';

const customFetch = axios.create({
     baseURL: process.env.REACT_APP_BASE_URL,
});


customFetch.interceptors.request.use(
  (config) => {
    // Retrieve user data from localStorage
    const user = getUserFromLocalStorage();
    console.log("USER!!!", user);

     if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
     } else {
      console.log("No token found");
    }
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);
export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;