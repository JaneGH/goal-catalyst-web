import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

export const getAllGoalsThunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } = thunkAPI.getState().allGoals; // Fixed typo here
   let url = `/goals/all`;
   try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};