import React, {useState, useEffect} from 'react'
import axios from 'axios';
import PostBox from './PostBox';
import Navbar from './Navbar';
import Cookies from 'js-cookie';

interface IMainPageProps {
  logged: boolean;
}

function MainPage({logged}: IMainPageProps) {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetchData();
    (Cookies.get())
  },[]);

  const fetchData = async () => {
    const req = await axios.get('/post');
    setPosts(req.data);
  }

  const  onFormSubmit = async () => {
    var config = {
      method: 'GET',
      url: '/user/whoami',
      headers: {
        'Content-Type': 'application/json',
      },
      
    };
    
    axios(config)
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    
  }


  return (
    <React.Fragment> 
      <Navbar logged={logged}/>
      <PostBox posts={posts}/>
      <button onClick={onFormSubmit}>WhoAmI</button>
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