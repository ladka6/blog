import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface ICreatePostProps {
  setLogged: React.Dispatch<React.SetStateAction<boolean>>;
}


const CreatePost = ({setLogged}: ICreatePostProps) => {

  const [header, setHeader] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate();

  const onFormSubmit = async () => {
    var data = JSON.stringify({
      "header":`${header}`,
      "content": `${content}`,
    });
    const axiosheader = {
      'Content-Type': 'application/json'
    }
    var config = {
      method: 'post',
      url: '/post/publish',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.post('/post/publish',data,{
      headers:axiosheader,
      withCredentials: true,
    }).then(function(req) {
      navigate('/');
      setLogged(true);
    }).catch(function(err) { console.log(err);})
    
    
  }



  return (
    <form onSubmit={(e) => {e.preventDefault(); onFormSubmit();}}>
      <div className="p-10">
        <div className="flex flex-col items-center justify-center space-y-9">
          <div className="font-bold text-3xl mb-8">Publish Post</div>
          <div className="flex flex-col border p-5 rounded-xl w-4/6">
            <label className="text-lg">Post Header</label>
            <input type='text' placeholder="Post Header" className="p-3 border rounded-md" value={header} onChange={(e) => setHeader(e.target.value)} />
          </div>
          <div className="flex flex-col  border p-5 rounded-xl w-4/6">
            <label className="text-lg">Post Content</label>
            <textarea  placeholder="Content" className="p-3 border rounded-md h-32 text-left align-top" value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <button className="w-4/6 bg-slate-900 text-white rounded-md p-2">Sign Up</button>
        </div>
      </div>
    </form>
  )
}

export default CreatePost