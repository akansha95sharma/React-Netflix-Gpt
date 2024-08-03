import React, { useRef } from 'react'
import Header from './Header'
import { useState } from 'react';
import {checkValidData} from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BACKGROUND_IMAGE, USER_AVATAR } from '../utils/constants';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const email = useRef(null);
    const name = useRef(null);
    const password = useRef(null);
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
                    displayName: name.current.value, photoURL: USER_AVATAR
                  }).then(() => {
                    // Profile updated!
                    // ...
                    const {uid,email,displayName,photoURL} = auth.currentUser;
                    // ...
                    dispatch(addUser({uid:uid, email: email, displayName: displayName,photoURL:photoURL}));
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
            <img className= "h-screen object-cover" src={BACKGROUND_IMAGE} alt='logo' />
        </div>
        <form onSubmit={(e)=> e.preventDefault()} className='absolute p-12 bg-black w-full md:w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
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
