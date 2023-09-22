import React, {useState} from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './style.css';
import { useDispatch } from "react-redux";
import { setUser } from "../store/slice.js"

const SignIn = () => {

    const[email,setEmail] = useState();
    const[password,setPassword] = useState();

    const history = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
       
        // console.log(email);
        // console.log(password);
        signInWithEmailAndPassword(auth,email,password).then(data=>{
            console.log("Welcome Login");
            console.log(data.user.uid);
            dispatch(setUser(data.user.uid));
            history('/todo');
        }).catch(err=>{
            alert(err);
        })

    }

    return(
        <>
        <div className="login-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
            <input className="inp" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email"/>        
            <input className="inp" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password"/>
            <button className="login-btn" type="submit">Login</button>
        </form>
        <p onClick={()=>{history('/signup')}}>Don't have an account?</p>

        </div>
        </> 
    )
}

export default SignIn;