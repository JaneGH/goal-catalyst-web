import { showLoading, hideLoading, getAllGoals } from '../allGoals/allGoalsSlice';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearValues } from './goalSlice';
import { toast } from 'react-toastify';


export const createGoalThunk = async (goal, thunkAPI) => {
  try {
    // Log the goal object to check its content before the request
    console.log('Goal object being sent:', goal);
    
    const resp = await customFetch.post('/goals', goal);
    
    // Log the full response from the API
    console.log('Response:', resp); 

    const email = {
      toEmail: goal.assignedToEmail,
      textContent: "You have a new task to do!"
    };

    const emailResponse = await thunkAPI.dispatch(sendEmailThunk(email));
    console.log('Email response:', emailResponse);

    thunkAPI.dispatch(clearValues());
    return resp.data.msg;

  } catch (error) {
    // Log the error response
    toast.error(""+(error.response ? error.response.data.error : error.message));
    console.error('API Error:', error.response ? error.response.data.error: error.message);
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const sendEmailThunk = createAsyncThunk(
  'goal/sendEmail',
  async (email, thunkAPI) => {
    try {
      const { toEmail, textContent } = email;
     // const textContent = "You have a new task to do!"; // Corrected declaration
      console.log('Email object being sent:', { toEmail, textContent });

      const emailData = {
        toEmail,
        textContent,
      };

      const resp = await customFetch.post('/email', emailData);

      // Log the full response from the API
      console.log('Response:', resp);

      thunkAPI.dispatch(clearValues());
      return resp.data.message; // Adjust based on your API response
    } catch (error) {
      // Log the error response
      console.error('API Error:', error.response ? error.response.data : error.message);
      return thunkAPI.rejectWithValue(checkForUnauthorizedResponse(error, thunkAPI));
    }
  }
);


export const deleteGoalThunk = async (goalId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    console.log('try delete' + goalId);
    const resp = await customFetch.delete(`/goals/${goalId}`);
    thunkAPI.dispatch(getAllGoals());
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    console.error('API Error:', error.response ? error.response.data : error.message);
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editGoalThunk = async ({ goalId, goal}, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/goals/${goalId}`, goal);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};