import React, { useState } from "react";
import axios from "axios";
import  {useNavigate } from 'react-router-dom'


interface ISignInProps {
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn = ({setLogged}: ISignInProps, ) => {

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
    const headers = {
      'Content-Type': 'application/json'
    };
    axios.post('/user/signin',data,
    {headers: headers, withCredentials: true}).then(function (response) {
          (JSON.stringify(response.data));
          setLogged(true);
          navigate('/');
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