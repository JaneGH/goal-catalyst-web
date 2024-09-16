import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createGoalThunk, deleteGoalThunk, editGoalThunk } from './goalThunk';

const initialState = {
    isLoading: false, 
    title: '',
    description: '',
    targetDate: '',
    progress: '0',
    assignedTo: '',
    statusOptions: ['Not Started', 'In Progress', 'Completed'],
    status: 'Not Started',
    isEditing: false,
    editGoalId: '',
};

export const createGoal = createAsyncThunk('goal/createGoal', createGoalThunk);

export const deleteGoal = createAsyncThunk('goal/deleteGoal', deleteGoalThunk);

export const editGoal = createAsyncThunk('goal/editGoal', editGoalThunk);

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: (state) => {
      // Using Object.assign for immutability and clarity
      Object.assign(state, initialState);
    },
    setEditGoal: (state, { payload }) => {
      Object.assign(state, { isEditing: true, ...payload });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Goal Created');
      })
      .addCase(createGoal.rejected, (state, { error }) => {
        state.isLoading = false;
        toast.error(error.message || 'Failed to create goal');
      })
      .addCase(deleteGoal.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteGoal.rejected, (state, { error }) => {
        toast.error(error.message || 'Failed to delete goal');
      })
      .addCase(editGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editGoal.fulfilled, (state) => {
        state.isLoading = false;
        toast.success('Goal Modified...');
      })
      .addCase(editGoal.rejected, (state, { error }) => {
        state.isLoading = false;
        toast.error(error.message || 'Failed to edit goal');
      });
  },
});

export const { handleChange, clearValues, setEditGoal } = goalSlice.actions;

export default goalSlice.reducer;
