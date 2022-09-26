import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreatePost from './Components/CreatePost';
import MainPage from './Components/MainPage';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';

interface IUser {
  email: string;
  id: number;
  password: string;
  user_name: string;
}

function App() {
  const [user, setUser] = useState<string>('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage user={user} />}/>
        <Route path='/user/signup' element={<SignUp />}/>
        <Route path='/user/signin' element={<SignIn setUser={setUser}/>} />
        <Route path='/publishpost' element={<CreatePost user={user}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
