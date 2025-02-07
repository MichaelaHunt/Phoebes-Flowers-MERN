import { useState, type FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Inputfield from '../components/Inputfield';
import Title from '../components/Title';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';


function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

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
      <div id="loginpage" className='site'>
        <Title></Title>
        <div>
          <h2>Login to<br></br>Phoebe's Flowers</h2>
          <Inputfield value={formState.email} onChange={handleChange} name="Email" />
          <Inputfield value={formState.password} onChange={handleChange} name="Password" />
          <p className='error loginError'>Incorrect login. Please try again.</p>
          <button>Login</button>
          <p id='space'>or</p>
          <button>Sign Up</button>
        </div>
      </div>
    </>
  );
}

export default Login;
 