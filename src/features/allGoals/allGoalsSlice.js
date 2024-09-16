import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getAllGoalsThunk, showStatsThunk } from './allGoalsThunk';

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const initialState = {
  isLoading: true,
  goals: [],
  totalGoals: 0,
  numOfPages: 1,
  page: 1,
//   stats: {},
//   monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllGoals = createAsyncThunk('allGoals/getGoals', getAllGoalsThunk);

// export const showStats = createAsyncThunk('allGoals/showStats', showStatsThunk);

const allGoalsSlice = createSlice({
  name: 'allGoals',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllGoalsState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllGoals.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.goals = payload.goals;
        state.numOfPages = payload.numOfPages;
        state.totalGoals = payload.totalGoals;
      })
      .addCase(getAllGoals.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // .addCase(showStats.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(showStats.fulfilled, (state, { payload }) => {
      //   state.isLoading = false;
      //   state.stats = payload.defaultStats;
      //   state.monthlyApplications = payload.monthlyApplications;
      // })
      // .addCase(showStats.rejected, (state, { payload }) => {
      //   state.isLoading = false;
      //   toast.error(payload);
      // });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllGoalsState,
} = allGoalsSlice.actions;

export default allGoalsSlice.reducer;