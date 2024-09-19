import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import {
  handleChange,
  clearValues,
  createGoal,
  editGoal,
} from '../../features/goal/goalSlice';

const AddGoal = () => {
  // Destructure state correctly
  const {
    isLoading,
    title,
    description,
    targetDate,
    progress,
    assignedToEmail,
    statusOptions,
    status,
    isEditing,
    editGoalId,
  } = useSelector((store) => store.goal);
  
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !targetDate || !status) {
      toast.error('Please fill out all fields');
      return;
    }

    if (isEditing) {
      dispatch(
        editGoal({
          goalId: editGoalId,
          goal: { title, description, targetDate, progress, status},
        })
      );
    } else {
      dispatch(createGoal({ title, description, targetDate, progress, assignedToEmail, status }));
    }
  };


  const handleGoalInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>{isEditing ? 'Edit Goal' : 'Add Goal'}</h3>
        <div className='form-center'>
          {/* Title */}
          <FormRow
            type='text'
            name='title'
            value={title}
            handleChange={handleGoalInput}
          />
          {/* Description */}
          <FormRow
            type='text'
            name='description'
            value={description}
            handleChange={handleGoalInput}
          />
          <FormRow
            type='date'  
            name='targetDate'  
            value={targetDate} 
            handleChange={handleGoalInput} 
          />

           {/* Progress */}
           <FormRow
            type='number'
            name='progress'
            value={progress}
            handleChange={handleGoalInput}
            min="0"
            max="100"
            step="1"
          />

          {/* Status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleGoalInput}
            list={statusOptions}
          />

        {/* Assigned To */}
        {!isEditing && (
          <FormRow
            type='email'
            name='assignedToEmail'
            value={assignedToEmail || ''}
            handleChange={handleGoalInput}
          />
        )}

          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}
            >
              Clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              disabled={isLoading}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddGoal;
