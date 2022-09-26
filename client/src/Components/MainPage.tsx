import React, {useState, useEffect} from 'react'
import axios from 'axios';
import PostBox from './PostBox';
import Navbar from './Navbar';
import Cookies from 'js-cookie';

interface IMainPageProps {
  user: string;
}

function MainPage({user}: IMainPageProps) {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    const req = await axios.get('/post');
    setPosts(req.data);
  }

  return (
    <React.Fragment>
      Welcome {user}
      <Navbar user={user}/>
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

// interface IUser {
//   email: string;
//   id: number;
//   password: string;
//   user_name: string;
// }