import React , { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {auth} from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
    const handleSignOut = () =>{
        signOut(auth).then(() => {
            // Sign-out successful.
            
          }).catch((error) => {
            // An error happened.
           
          });
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              const {uid,email,displayName,photoURL} = user;
              // ...
              dispatch(addUser({uid:uid, email: email, displayName: displayName,photoURL:photoURL}));
                navigate("/browse");
            } else {
              // User is signed out
              // ...
              dispatch(removeUser());
              navigate("/");
            }
          });
          // unsubscribe when component unmounts
          return () => unsubscribe();
    },[]);
    const handleGptSearchClick = () =>{
        // Toggle GPT Search
        dispatch(toggleGptSearchView());
    }
    const handleLanguageChange = (e) => {
      console.log(e.target.value);
      dispatch(changeLanguage(e.target.value));
    }
    return (
        <div className='absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-screen flex flex-col md:flex-row justify-between'>
            <img className='w-44 mx-auto md:mx-0' src={LOGO} alt='logo'/>

            {user && (<div className='flex p-2 justify-between'>
                {showGptSearch && (<select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
                {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
                </select>)}
                <button className='py-2 px-4 m-2 mt-2 mx-4 bg-purple-800 text-white rounded-lg' onClick={handleGptSearchClick}>{showGptSearch? "HomePage": "GPT Search"}</button>
                <img alt='usericon' className='hidden md:block w-12 h-12' src= {user.photoURL} />
                <button className='font-bold text-white' onClick={handleSignOut}>(Sign Out)</button>
            </div>)}
        </div>
    )
}

export default Header
