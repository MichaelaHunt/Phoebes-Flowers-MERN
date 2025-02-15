import { useState, type FormEvent, ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import Inputfield from '../components/Inputfield';
import Title from '../components/Title';

function Signup() {
    const [formState, setFormState] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        apiError: '' // Store API error responses here
    });

    const [createUser, { error }] = useMutation(CREATE_USER);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
      
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Live validation
        let newErrors = { ...formErrors, apiError: '' }; // Reset API error on input
        if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            newErrors.email = 'Invalid email format';
        } else {
            newErrors.email = '';
        }

        if (name === 'password' && value.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        } else {
            newErrors.password = '';
        }

        if (name === 'confirmPassword' && value !== formState.password) {
            newErrors.confirmPassword = 'Passwords do not match';
        } else {
            newErrors.confirmPassword = '';
        }

        setFormErrors(newErrors);
    };

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();

        // Final validation before submission
        let newErrors = { ...formErrors };

        if (!formState.email) newErrors.email = 'Email is required';
        if (!formState.username) newErrors.username = 'Username is required';
        if (!formState.password) newErrors.password = 'Password is required';
        if (formState.password !== formState.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setFormErrors(newErrors);

        // Stop if any errors exist
        if (Object.values(newErrors).some(error => error)) return;

       const { email, username, password } = formState;
    
        if (!email || !username || !password) {
            console.error("Missing required fields!");
            return;
        }
    
        try {
            const { data } = await createUser({
                variables: { 
                    email: formState.email, 
                    username: formState.username, 
                    password: formState.password 
                },
            });
    
            Auth.login(data.createUser.token);
        } catch (err) {
            setFormErrors({ ...formErrors, apiError: error?.message || 'Signup failed. Try again.' });
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
            <Title />
            <div id="loginpage" className='site'>
                <div>
                    <h2>Sign Up to<br />Phoebe's Flowers</h2>
                    
                    <Inputfield name="email" label="Email" value={formState.email} isLogin={false} change={handleChange}/>
                    {formErrors.email && <p className='error'>{formErrors.email}</p>}
                    
                    <Inputfield name="username" label="Username" value={formState.username} isLogin={false} change={handleChange}/>
                    {formErrors.username && <p className='error'>{formErrors.username}</p>}
                    
                    <Inputfield name="password" label="Password" value={formState.password} isLogin={false} change={handleChange}/>
                    {formErrors.password && <p className='error'>{formErrors.password}</p>}
                    
                    <Inputfield name="confirmPassword" label="Confirm Password" value={formState.confirmPassword} isLogin={false} change={handleChange}/>
                    {formErrors.confirmPassword && <p className='error'>{formErrors.confirmPassword}</p>}

                    {formErrors.apiError && <p className='error'>{formErrors.apiError}</p>}

                    <button style={{ marginBottom: "12px", marginTop: "12px"}} onClick={handleFormSubmit}>Create Account</button>
                    <Link to="/login">back to login</Link>
                </div>
            </div>
        </>
    );
}

export default Signup;
