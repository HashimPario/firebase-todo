import React, {useState} from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './style.css';

const SignUp = () => {
    
    const history = useNavigate();

    const[email,setEmail] = useState();
    const[password,setPassword] = useState();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password).then(data=>{
            console.log(data,"authData");
            history('/');
        })

    }


    return(
        <>
        <div className="login-container">
        <h1>SignUp</h1>
        <form className="login-form" onSubmit={handleSubmit}>
            <input className="inp" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" required/>
            <input className="inp" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" required/>
          
            <p className="pwd-match">Password matched</p>
            <button className="login-btn" type="submit">SignUp</button>
           
        </form>
        <p onClick={()=>{history('/')}}>Already have an account? Login here!</p>
        </div>
        </>
    )
}

export default SignUp;