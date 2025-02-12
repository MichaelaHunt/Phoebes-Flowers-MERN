import { useState, type FormEvent, ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
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

    useEffect(() => {
        const title = document.getElementById("title");
        if (title) {
            title.classList.add("titlePeach");
        }
    }, []);


    return (
        <>
            <Title></Title>
            <div id="signuppage" className='site'>
                <div>
                    <h2>Sign Up to<br />Phoebe's Flowers</h2>
                    <Inputfield name="Email" value={formState.email} isLogin={false} onChange={handleChange}/>
                    <p className='error'>Invalid email</p>
                    <Inputfield name="Username" value={formState.username} isLogin={false} onChange={handleChange}/>
                    <p className='error'>Username already exists</p>
                    <Inputfield name="Password" value={formState.password} isLogin={false} onChange={handleChange}/>
                    <p className='error'>Password must contain [details here]</p>
                    <Inputfield name="Confirm Password" value={formState.confirmPassword} isLogin={false} onChange={handleChange}/>
                    <p className='error'>Passwords do not match</p>
                    <button style={{marginBottom: "12px"}} onClick={handleFormSubmit}>Create Account</button>
                    <Link to="/login">back to login</Link>
                </div>
            </div>
        </>
    );
}

export default Signup;