import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

export const getAllGoalsThunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, goalType, sort } = thunkAPI.getState().allGoals; // Fixed typo here
  let url = `/goals/all?status=${searchStatus}&sort=${sort}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  if (goalType) {
    url = url + `&goalType=${goalType}`;
  }
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};