import { configureStore } from '@reduxjs/toolkit';
import goalSlice from './features/goal/goalSlice';
import userSlice from './features/user/userSlice';
// import allJobsSlice from './features/allJobs/allJobsSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    goal: goalSlice,
    // allGoals: allGoalsSlice,
  },
});