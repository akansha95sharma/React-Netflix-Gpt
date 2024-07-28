import React, { useRef } from 'react'
import Header from './Header'
import {useNavigate} from "react-router-dom";
import { useState } from 'react';
import {checkValidData} from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const email = useRef(null);
    const name = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorMessage,setErrorMessage] = useState(null);
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    };
    const handleButtonClick = () => {
        // Validate the form data
        const message = checkValidData(email.current.value,password.current.value);
        console.log(email.current.value);
        console.log(password.current.value);
        console.log(message);
        setErrorMessage(message);
        if(message) return

        // sign in sign up logic
        if(!isSignInForm){
            // sign up logic
            createUserWithEmailAndPassword(auth,
                email.current.value,
                password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                updateProfile(user, {
                    displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/35160663?v=4"
                  }).then(() => {
                    // Profile updated!
                    // ...
                    const {uid,email,displayName,photoURL} = auth.currentUser;
                    // ...
                    dispatch(addUser({uid:uid, email: email, displayName: displayName,photoURL:photoURL}));
                    navigate("/browse");
                  }).catch((error) => {
                    setErrorMessage(error.message);
                  });
                  
                
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode +" - "+ errorMessage);
            });

        }
        else {
            // sign in logic
            signInWithEmailAndPassword(auth,email.current.value,
                password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                navigate("/browse");
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode +" - "+ errorMessage);
            });
        }
    }
    return (
        
        <div>
        <Header />
        <div className='absolute'>
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/21a8ba09-4a61-44f8-8e2e-70e949c00c6f/6678e2ea-85e8-4db2-b440-c36547313109/IN-en-20240722-POP_SIGNUP_TWO_WEEKS-perspective_WEB_3457a8b1-284d-4bb5-979e-2a2e9bb342b3_large.jpg' alt='logo' />
        </div>
        <form onSubmit={(e)=> e.preventDefault()} className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
            <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && (<input type='text' ref={name} placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />)}
            <input type='text' ref={email} placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700' />
            <input type='password' ref={password} placeholder='Password' className='p-4 my-4 w-full bg-gray-700' />
            <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
            <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registed? Sign In Now"}</p>
        </form>
        </div>
    )
}

export default Login
