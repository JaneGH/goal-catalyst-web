import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';

export const getAllGoalsThunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allGoalss;

  //let url = `/goals?status=${searchStatus}&goalType=${searchType}&sort=${sort}&page=${page}`;
  let url = `/goals?status=${searchStatus}}&sort=${sort}&page=${page}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

// export const showStatsThunk = async (_, thunkAPI) => {
//   try {
//     const resp = await customFetch.get('/goals/stats');

//     return resp.data;
//   } catch (error) {
//     return checkForUnauthorizedResponse(error, thunkAPI);
//   }
// };