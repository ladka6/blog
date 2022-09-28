import React, { useState } from "react";
import axios from "axios";
import  {useNavigate } from 'react-router-dom'


interface ISignOutProps {
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignOut = ({setLogged}: ISignOutProps, ) => {

  const navigate = useNavigate();

  const  onFormSubmit = async () => {

    const headers = {
      'Content-Type': 'application/json'
    };
    axios.post('/user/signout',
    {
      headers: headers, withCredentials: true
    }).then(function (response) {
          (JSON.stringify(response.data));
          navigate('/');
          setLogged(false);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  return (
    <button onClick={onFormSubmit}>Sign Out</button>
  );
};

export default SignOut;