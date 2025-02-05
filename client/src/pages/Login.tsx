import { useState, type FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Inputfield from '../components/Inputfield';






function Login() {
  
  return (
    <>
    <div>
    <h2>Login to Phoebe's Flowers</h2>
    <Inputfield name="Username" />
      <Inputfield name="Password" />
      <p>Incorrect login. Please try again.</p>
        <button>Login</button>
        <p>or</p>
        <button>Sign Up</button>
    </div>
   
    </>
  );
}

export default Login;
