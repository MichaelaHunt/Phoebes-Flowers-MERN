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
    
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    
        console.log("Form state: " + JSON.stringify(formState));
    };

    // const handleFormSubmit = async (event: FormEvent) => {
    //     event.preventDefault();
    
    //     const { email, username, password } = formState;
    
    //     try {
    //         const { data } = await createUser({
    //             variables: { input: { email, username, password } },
    //         });
    
    //         Auth.login(data.createUser.token);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
    
        console.log("Submitting form state:", formState);  // <-- Debugging log
    
        const { email, username, password } = formState;
    
        if (!email || !username || !password) {
            console.error("Missing required fields!");
            return;  // Prevent mutation from running if fields are empty
        }
    
        try {
            const { data } = await createUser({
                variables: { 
                    email: formState.email, 
                    username: formState.username, 
                    password: formState.password 
                },
            });
    
            console.log("Signup successful:", data);  // <-- Debugging log
            Auth.login(data.createUser.token);
        } catch (error) {
            console.error("GraphQL Error:", error);
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
                    <Inputfield name="email" label="Email" value={formState.email} isLogin={false} change={handleChange}/>
                    <p className='error'>Invalid email</p>
                    <Inputfield name="username" label="Username" value={formState.username} isLogin={false} change={handleChange}/>
                    <p className='error'>Username already exists</p>
                    <Inputfield name="password" label="Password" value={formState.password} isLogin={false} change={handleChange}/>
                    <p className='error'>Password must contain [details here]</p>
                    <Inputfield name="confirmPassword" label="Confirm Password" value={formState.confirmPassword} isLogin={false} change={handleChange}/>
                    <p className='error'>Passwords do not match</p>
                    <button style={{marginBottom: "12px"}} onClick={handleFormSubmit}>Create Account</button>
                    <Link to="/login">back to login</Link>
                </div>
            </div>
        </>
    );
}

export default Signup;