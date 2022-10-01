import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreatePost from './Components/CreatePost';
import Deneme from './Components/Deneme';
import MainPage from './Components/MainPage';
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';

function App() {
  const [logged, setLogged] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage logged={logged} setLogged={setLogged}/>}/>
        <Route path='/user/signup' element={<SignUp setLogged={setLogged}/>}/>
        <Route path='/user/signin' element={<SignIn setLogged={setLogged}/>} />
        <Route path='/publishpost' element={<CreatePost setLogged={setLogged}/>} />
        <Route path='/deneme' element={<Deneme/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
