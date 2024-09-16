// import { showLoading, hideLoading, getAllGoals } from '../allGoals/allGoalsSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { clearValues } from './goalSlice';


export const createGoalThunk = async (goal, thunkAPI) => {
  try {
    // Log the goal object to check its content before the request
    console.log('Goal object being sent:', goal);
    
    const resp = await customFetch.post('/goals', goal);
    
    // Log the full response from the API
    console.log('Response:', resp); 
    
    thunkAPI.dispatch(clearValues());
    return resp.data.msg;
  } catch (error) {
    // Log the error response
    console.error('API Error:', error.response ? error.response.data : error.message);
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};


export const deleteGoalThunk = async (goalId, thunkAPI) => {
//   thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/goals/${goalId}`);
    // thunkAPI.dispatch(getAllGoals());
    return resp.data.msg;
  } catch (error) {
    // thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editGoalThunk = async ({ goalId, goal}, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/goals/${goalId}`, goal);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};