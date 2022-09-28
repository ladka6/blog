import React from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';

function Deneme() {
  const  onFormSubmit = async () => {
    var config = {
      method: 'GET',
      url: 'http://localhost:8080/user/whoami',
      headers: {
        'Content-Type': 'application/json',
      },
      
    };
    
    axios(config)
      .then(function (response) {
      })
      .catch(function (error) {
        (error);
      });
    
  }

  const  signIn = async () => {
    var data = JSON.stringify({
      "user_name": "deneme1",
      "email": "deneme1@deneme1.com",
      "password": "1"
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:8080/user/signin',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
      
    };

    // axios(config).
    //   then(function (response) {
    //     (JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     (error);
    //   });

   const headers = {
      'Content-Type': 'application/json',
    };
  
    axios.post('http://localhost:8080/user/signin',data,{withCredentials: true, headers: headers})
  }


  const out = async () => {
    var config = {
      method: 'POST',
      url: 'http://localhost:8080/user/signout',
      headers: {
        'Content-Type': 'application/json'
      },
      
    };
    
    axios(config)
      .then(function (response) {
        localStorage.setItem('userId',"");
        (JSON.stringify(response.data));
      })
      .catch(function (error) {
        (error);
      });
    
  }

  const  cookie = async () => {
    var config = {
      method: 'get',
      url: 'http://localhost:8080/cookies',
      headers: {
        'Content-Type': 'application/json'
      },
      
    };
    
    axios(config)
      .then(function (response) {
        (JSON.stringify(response.data));
      })
      .catch(function (error) {
        (error);
      });
    
  }

  
  return (
    <div className='m-5 p-4'>
      <button className='bg-slate-900 text-white rounded-md p-2' onClick={signIn}>Sign In</button>
      <button className='bg-slate-900 text-white rounded-md p-2' onClick={onFormSubmit}>Who Am I</button>
      <button className='bg-slate-900 text-white rounded-md p-2' onClick={out}>SignOut</button>
    </div>
  )
}

export default Deneme