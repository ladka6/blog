import React, { useState } from "react";
import axios from "axios";
import  {useNavigate } from 'react-router-dom'
// import Session from 'react-session-api'
var Session = require('react-session-api');

interface ISignIneProps {
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

const SignIn = ({setUser}: ISignIneProps, ) => {

  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [passowrd, setPassowrd] = useState<string>('');

  const  onFormSubmit = async () => {

    var data = JSON.stringify({
      "user_name":`${username}`,
      "email": `${email}`,
      "password": `${passowrd}`
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:8080/user/signin',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    
    axios(config)
      .then(function (response) {
        setUser(response.data.user_name);
        //Session.set('ege','ege1');
        const deneme = Session.items();
        console.log(deneme);
        //navigate('/');
      })
      .catch(function (error) {
        console.log(error);
      });
    
  }

  return (
    <form onSubmit={(e) => {e.preventDefault(); onFormSubmit()}}>
      <div className="p-10">
        <div className="flex flex-col items-center justify-center space-y-9">
          <div className="font-bold text-3xl mb-8">Sign In</div>
          <div className="flex flex-col border p-5 rounded-xl w-4/6">
            <label className="text-lg">User Name</label>
            <input type='text' placeholder="User Name" className="p-3 border rounded-md" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="flex flex-col  border p-5 rounded-xl w-4/6">
            <label className="text-lg">Email</label>
            <input type='email' placeholder="Email" className="p-3 border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="flex flex-col  border p-5 rounded-xl w-4/6">
            <label className="text-lg">Password</label>
            <input type='password' placeholder="Password" className="p-3 border rounded-md" value={passowrd} onChange={(e) => setPassowrd(e.target.value)}/>
          </div>
          <button className="w-4/6 bg-slate-900 text-white rounded-md p-2">Sign In</button>
        </div>
      </div>
    </form>
  );
};

export default SignIn;