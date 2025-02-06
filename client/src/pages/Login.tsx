import { useState, type FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Inputfield from '../components/Inputfield';






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
    <div id="loginpage"> 
      <div>
    <h2>Login to Phoebe's Flowers</h2>
    <Inputfield name="Username" />
      <Inputfield name="Password" />
      <p>Incorrect login. Please try again.</p>
        <button>Login</button>
        <p>or</p>
        <button>Sign Up</button>
    </div>
     </div>
   
    </>
  );
}

export default Login;
