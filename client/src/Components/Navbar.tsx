import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
interface INavbarProps {
  logged: boolean;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>
}


function Navbar({logged, setLogged}: INavbarProps) {

  const navigate = useNavigate();

  const onSignOut = () => {
    const header = {
      'Content-Type': 'application/json',
    }
    axios.post('user/signout',{
      headers: header,
      withCredentials: true,
    }).then(function (response) {
      navigate('/');
      setLogged(false);
    });
  } 

  if(!logged) {
    console.log(logged);
    return (
      <div className="mx-auto px-5 py-5 bg-gray-800">
        <nav className="flex items-center justify-between text-white font-bold text-2xl">
          <div className="p-5  hover:bg-gray-600 hover:rounded-md">
            <a href="">BLOG</a>
          </div>
          <div className="flex space-x-10">
            <div className="p-3 hover:bg-gray-600 hover:rounded-md">
              <a href="/user/signin">Sign in</a>
            </div>
            <div className="p-3 hover:bg-gray-600 hover:rounded-md">
              <a href="/user/signup">Sign up</a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  else {
    return (
      <div className="mx-auto px-5 py-5 bg-gray-800">
        <nav className="flex items-center justify-between text-white font-bold text-2xl">
          <div className="p-5  hover:bg-gray-600 hover:rounded-md">
            <a href="/">BLOG</a>
          </div>
          <div className="flex space-x-10">
            <div className="p-3 hover:bg-gray-600 hover:rounded-md">
              <a href="/publishpost">Publish Post</a>
            </div>
            <div className="p-3 hover:bg-gray-600 hover:rounded-md">
              <a href="/user/signup">See your posts</a>
            </div>
            <div className="p-3 hover:bg-gray-600 hover:rounded-md">
              <a href="/" onClick={onSignOut}>Sign Out</a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  
}

export default Navbar;
