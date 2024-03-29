import { useMutation } from '@apollo/client';
import useForm from '../../lib/useForm';
import ErrorMessage from '../ErrorMessage';
import { FormStyled, SickButton } from '../styles';
import { REQUEST_PASSWORD_RESET_MUTATION } from './mutations';

export default function RequestPasswordReset() {
  const initialValues = {
    email: '',
  };

  const { inputs, handleChange, resetForm } = useForm(initialValues);

  const { email } = inputs;

  const [
    sendUserPasswordResetLink,
    {
      data,
      error: passwordResetRequestError,
      loading: isLoading,
    },
  ] = useMutation(
    REQUEST_PASSWORD_RESET_MUTATION,
    {
      variables: {
        email,
      },
    },
  );

  const submitPasswordResetRequestHandler = async (evt) => {
    evt.preventDefault(); // stop form from submitting

    await sendUserPasswordResetLink();

    resetForm(); // clear the form data after clicking
  };

  const showSuccessMessage = () => (
    data?.sendUserPasswordResetLink === null && <p>Heard! Password reset inc ✨</p>
  );

  return (
    /* POST method is muy importante to avoid leaking sensitive
       data into URL params and server logs */
    <FormStyled method="POST" onSubmit={submitPasswordResetRequestHandler}>
      <h2>Plea4Password</h2>
      <ErrorMessage error={passwordResetRequestError} />
      {showSuccessMessage()}
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
            placeholder="Where does the email go sending"
            autoComplete="email"
          />
        </label>
      </fieldset>

      <SickButton type="button" onClick={submitPasswordResetRequestHandler}>I forget the thing 👉👈</SickButton>
    </FormStyled>
  );
}
