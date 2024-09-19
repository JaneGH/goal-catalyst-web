import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 4rem;

  h2 {
    text-transform: none;
  }

  & > h5 {
    font-weight: 700;
  }

  .goals {
    display: grid;
    grid-template-columns: 1fr; 
    gap: 2rem;
  }

  @media (min-width: 992px) {
    .goals {
      grid-template-columns: 1fr; 
    }
  }
`;

export default Wrapper;
