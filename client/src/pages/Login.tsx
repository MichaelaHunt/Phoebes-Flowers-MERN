import { useState, type FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';







function Login() {
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
