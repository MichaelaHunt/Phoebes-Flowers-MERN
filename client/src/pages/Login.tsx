import { useState, type FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';






function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;

  setFormState({
    ...formState,
    [name]: value,
  })
};

const handleFormSubmit = async (event: FormEvent) => {
  event.preventDefault();
  console.log(formState);
try {
  const { data } = await login({
    variables: { ...formState },
});

Auth.login(data.login.token);
} catch (error) {
  console.error(error);
}

setFormState({
  email: '',
  password: '',
});
};

  return (
    <>
    <div>
    <h2>Login to Phoebe's Flowers</h2>
      <div>
        <h4>Username</h4>
        <input type="text" />
      </div>
      <div>
        <h4>Password</h4>
        <input type="text" />
      </div>
      <p>Incorrect login. Please try again.</p>
        <button>Login</button>
        <p>or</p>
        <button>Sign Up</button>
    </div>
   
    </>
  );
}
