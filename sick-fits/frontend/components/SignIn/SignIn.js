import { useMutation } from '@apollo/client';
// import styled from 'styled-components';
import useForm from '../../lib/useForm';
import ErrorMessage from '../ErrorMessage';
import { FormStyled, SickButton } from '../styles';
import SIGN_IN_MUTATION from './mutations/signInMutation';
import CURRENT_USER_QUERY from '../User/queries/currentUserQuery';

// const ButtonContainer = styled.div`
//   display: grid;
//   gap: 1rem;
// `;

export default function SignIn() {
  const initialValues = {
    email: '',
    password: '',
  };

  const { inputs, handleChange, resetForm } = useForm(initialValues);

  const { email, password } = inputs;

  const [signInMutation, { data, loading: isLoading }] = useMutation(
    SIGN_IN_MUTATION,
    {
      variables: {
        email,
        password,
      },
      // refetch currently logged in user
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    },
  );

  const signInError = data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure'
    ? data?.authenticateUserWithPassword
    : undefined;

  const submitSignInHandler = async (evt) => {
    evt.preventDefault(); // stop form from submitting

    await signInMutation();

    resetForm(); // clear the form data after clicking sign in
  };

  return (
    /* POST method is muy importante to avoid leaking sensitive
       data into URL params and server logs */
    <FormStyled method="POST" onSubmit={submitSignInHandler}>
      <h2>Sign into your account</h2>
      <ErrorMessage error={signInError} />
      <fieldset disabled={isLoading} aria-busy={isLoading}>
        <label htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            required
            placeholder="Your email address goes here!"
            autoComplete="email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            required
            placeholder="Now do the password"
          />
        </label>
      </fieldset>

      {/* <ButtonContainer>
        <SickButton type="submit">Lemme iinnnn! 🎟️</SickButton>
        // TODO: show/hide password reset on click ⬇️
        <SickButton type="button">I forget the thing 👉👈</SickButton>
      </ButtonContainer> */}
      <SickButton type="submit">Lemme iinnnn! 🎟️</SickButton>
    </FormStyled>
  );
}
