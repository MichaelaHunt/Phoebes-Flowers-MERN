import { useState, type FormEvent, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Inputfield from '../components/Inputfield';
import Title from '../components/Title';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';


function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  useEffect(() => {
    const title = document.getElementById("title");
    if (title) {
      title.classList.add("titlePeach");
    }
  }, []);
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
        ...prevState,
        [name]: value,
    }));

    console.log("Form state: " + JSON.stringify(formState));
};

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { email, password } = formState;

    if (!email || !password) {
      console.error("Missing required fields!");
      return;
  }

    try {
      const { data } = await login({
        variables: { 
          email: formState.email, 
          password: formState.password 
      },
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

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <>
    <Title></Title>
      <div id="loginpage" className='site'>
        <div>
          <h2>Login to<br></br>Phoebe's Flowers</h2>
          <Inputfield value={formState.email} label="Email" change={handleChange} name="email" isLogin={true}/>
          <Inputfield value={formState.password} change={handleChange} label="Password" name="password" isLogin={true}/>
          <p className='error loginError'>Incorrect login. Please try again.</p>
          <button onClick={handleFormSubmit}>Login</button>
          <p id='space'>or</p>
          <button onClick={handleSignupClick}>Sign Up</button>
        </div>
      </div>
    </>
  );
}

export default Login;
