import { useState, type FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useMutation} from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Signup() {
    const [formState, setFormState] = useState({ email: '', username: '', password: '' });
    const [createUser, { error, data }] = useMutation(CREATE_USER);

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
    <div id="loginpage">
         <div>
         
        <h2>Sign Up for Phoebe's Flowers</h2>
    
    <div>
        <h4>Email Address</h4>
        <input type="text" />
    </div>
    <p>invalid Email</p>
    <div>
        <h4>Username</h4>
        <input type="text" />
    </div>
    <p>Username already exists</p>
    <div>
        <h4>Password</h4>
        <input type="text" />
    </div>
    <p>Password must contain...details here</p>
    <div>
        <h4>Confirm Password</h4>
        <input type="text" />
    </div>
    <p>Passwords do not match</p>
    <button>Create Account</button>
    </div>
    </div>
   
    </>
);
}
export default Signup;