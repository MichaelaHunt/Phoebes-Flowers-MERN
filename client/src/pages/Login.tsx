import { useState, type FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Inputfield from '../components/Inputfield';
import Title from '../components/Title';


function Login() {
  return (
    <>
      <div id="loginpage" className='site'>
        <Title></Title>
        <div>
          <h2>Login to<br></br>Phoebe's Flowers</h2>
          <Inputfield name="Username" />
          <Inputfield name="Password" />
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
 