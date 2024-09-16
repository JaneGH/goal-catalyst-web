import { useEffect } from 'react';
import Goal from './Goal';
import Wrapper from '../assets/wrappers/GoalsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { getAllGoals } from '../features/allGoals/allGoalsSlice';
import PageBtnContainer from './PageBtnContainer';
const GoalsContainer = () => {
  const {
    goals,
    isLoading,
    page,
    totalGoals,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allGoals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGoals());
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading />;
  }

  if (goals.length === 0) {
    return (
      <Wrapper>
        <h2>No goals to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalGoals} goal{goals.length > 1 && 's'} found
      </h5>
      <div className='goals'>
        {goals.map((goal) => {
          return <Goal key={goal._id} {...goal} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default GoalsContainer;