import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { handleChange, clearFilters } from '../features/allGoals/allGoalsSlice';
import { useState, useMemo } from 'react';

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('');

  const { isLoading, search, searchStatus, goalType, goalTypeOptions, sort, sortOptions } =
    useSelector((store) => store.allGoals);

  const { statusOptions }  = useSelector((store) => store.goal);


  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };
  const optimizedDebounce = useMemo(() => debounce(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          {/* search position */}
          <FormRow
            type='text'
            name='search'
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />

          {/* search by type*/}
          <FormRowSelect
            name='goalType'
            value={goalType}
            handleChange={handleSearch}
            list={goalTypeOptions}
          />

          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;