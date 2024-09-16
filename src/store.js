import { configureStore } from '@reduxjs/toolkit';
import goalSlice from './features/goal/goalSlice';
import userSlice from './features/user/userSlice';
import allGoalsSlice from './features/allGoals/allGoalsSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    goal: goalSlice,
    allGoals: allGoalsSlice,
  },
});