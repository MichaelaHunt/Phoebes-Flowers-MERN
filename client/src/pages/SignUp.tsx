import { useState, type FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation} from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import Inputfield from '../components/Inputfield';

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
    <div id="SignUppage">
         <div>
         
        <h2>Sign Up for Phoebe's Flowers</h2>
    
    <Inputfield name="email" value={formState.email} onChange={handleChange} />
    <p>invalid Email</p>
    <Inputfield name="username" value={formState.username} onChange={handleChange} />
    <p>Username already exists</p>
    <Inputfield name="password" value={formState.password} onChange={handleChange} />
    <p>Password must contain...details here</p>
    <Inputfield name="confirmPassword" value={formState.confirmPassword} onChange={handleChange} />
    <p>Passwords do not match</p>
    <button>Create Account</button>
    </div>
    </div>
   
    </>
);
}
export default Signup;