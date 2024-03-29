import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid black;
    &:focus,
    &:focus-visible {
      outline: 0.255rem solid var(--red);
      border-color: transparent;
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: var(--black);
    color: var(--white);
    border: 0;
    font-size: 1.25rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;

    &:hover {
      cursor: pointer;
    }

    &:focus-visible {
      outline: 0.255rem solid var(--red);
      transition: outline 0s;
    }
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(
        to right,
        var(--red) 0%,
        var(--white) 50%,
        var(--red) 100%
      );
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
`;

export default Form;
