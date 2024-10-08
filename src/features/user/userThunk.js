import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
// import { clearAllGoalState } from '../allGoals/allGoalsSlice';
import { clearValues } from '../goal/goalSlice';
import { logoutUser } from './userSlice';


export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutUser(message));
    // thunkAPI.dispatch(clearAllGoalsState());
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};