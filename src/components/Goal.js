import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Goal';
import { useDispatch } from 'react-redux';
import GoalInfo from './GoalInfo';
import moment from 'moment';
import { deleteGoal, setEditGoal } from '../features/goal/goalSlice';
const Goal = ({
  _id,
  title,
  description,
  targetDate,
  createdAt,
  status,
}) => {
  const dispatch = useDispatch();

  const date = moment(createdAt).format('MMM Do, YYYY');

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{title.charAt(0)}</div>
        <div className='info'>
          <h5>{description}</h5>
          <p>{title}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
           <GoalInfo icon={<FaCalendarAlt />} text={date} />
          {/* <GoalInfo icon={<FaBriefcase />} text={goalType} /> */}
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-goal'
              className='btn edit-btn'
              onClick={() =>
                dispatch(
                  setEditGoal({
                    editGoalId: _id,
                    title,
                    description,
                    targetDate,
                    status,
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => dispatch(deleteGoal(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Goal;