import React, {useState, useEffect} from 'react'
import axios from 'axios';
import PostBox from './PostBox';
import Navbar from './Navbar';
import Cookies from 'js-cookie';

interface IMainPageProps {
  logged: boolean;
  setLogged: React.Dispatch<React.SetStateAction<boolean>>
}

function MainPage({logged, setLogged}: IMainPageProps) {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetchData();
    (Cookies.get())
  },[]);

  const fetchData = async () => {
    const req = await axios.get('/post');
    setPosts(req.data);
  }



  return (
    <React.Fragment> 
      <Navbar logged={logged} setLogged={setLogged}/>
      <PostBox posts={posts}/>
    </React.Fragment>
    
  )
}

export default MainPage;

interface IPost {
  id: number;
  like: number;
  header: string;
  content: string;
  date: Date;
  comments: [];
  user: User;
}

type User = {
  email: string;
  id: number;
  password: string;
  user_name: string;
}
