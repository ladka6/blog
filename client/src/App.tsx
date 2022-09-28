import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreatePost from './Components/CreatePost';
import MainPage from './Components/MainPage';
import SignIn from './Components/SignIn';
import SignOut from './Components/SignOut';
import SignUp from './Components/SignUp';

interface IUser {
  email: string;
  id: number;
  password: string;
  user_name: string;
}

function App() {
  const [logged, setLogged] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage logged={logged} />}/>
        <Route path='/user/signup' element={<SignUp setLogged={setLogged}/>}/>
        <Route path='/user/signin' element={<SignIn setLogged={setLogged}/>} />
        <Route path='/publishpost' element={<CreatePost setLogged={setLogged}/>} />
        <Route path='user/signout' element={<SignOut setLogged={setLogged}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
