
function Signup() {
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