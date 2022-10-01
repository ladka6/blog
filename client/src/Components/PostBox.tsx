import React from "react";

const PostBox = (props: {posts: IPost[]}) => {
  

  const showBoxes = props.posts.map((post:IPost,index:number) => {
    const [date] = new Date(post.date.toString()).toISOString().split('T');
    return (
      <div className='container mx-auto p-5 '>
        <div style={{backgroundColor:'rgb(245 245 245)'}} className='flex flex-row py-5 pl-5 rounded-lg shadow-md'>
          <div className='flex place-items-center'>
          <img className="object-cover shadow-lg rounded-lg group-hover:opacity-75 w-56 h-5/6" src="https://stackdiary.com/140x100.png" alt="Featured Photo"  />
          </div>
          <div className='px-5'>
            <h1 className='text-lg text-bold'>{post.header}</h1>
            <p>{post.content}</p>
            <div className='flex flex-row mt-3'>
              <img className='w-10 h-10 rounded-full' src="https://stackdiary.com/140x100.png" alt="profilepic" />
              <div className='mx-3'>
                <a href="">{post.user.user_name}</a>
                <p className="text-sm text-slate-400">{date}</p>
              </div>
            </div>
          </div>
        </div>
    </div>

    );
  })
  return (
    <div className="grid grid-cols-2">
      {showBoxes}
    </div>
   
  );
};

export default PostBox;

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
