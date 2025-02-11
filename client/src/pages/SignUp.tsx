import { useState, type FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation} from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import Inputfield from '../components/Inputfield';
import Title from '../components/Title';

function Signup() {
    const [formState, setFormState] = useState({ email: '', username: '', password: '', confirmPassword: '' });
    const [createUser, { error }] = useMutation(CREATE_USER);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const { data } = await createUser({
                variables: { input: { ...formState } },
            });

            Auth.login(data.createUser.token);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <div id="signuppage" className='site'>
                <Title></Title>
                <div>
                    <h2>Sign Up to<br />Phoebe's Flowers</h2>
                    <Inputfield name="Email" value={formState.email} onChange={handleChange} placeholder="Email Address" />
                    <p className='error'>Invalid email</p>
                    <Inputfield name="Username" value={formState.username} onChange={handleChange} placeholder="Username" />
                    <p className='error'>Username already exists</p>
                    <Inputfield name="Password" value={formState.password} onChange={handleChange} placeholder="Password" />
                    <p className='error'>Password must contain [details here]</p>
                    <Inputfield name="ConfirmPassword" value={formState.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
                    <p className='error'>Passwords do not match</p>
                    <button onClick={handleFormSubmit}>Create Account</button>
                    <p id='space'>or</p>
                    <Link to="/login">back to login</Link>
                </div>
            </div>
        </>
    );
}

export default Signup;