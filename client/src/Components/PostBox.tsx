import React from "react";

const PostBox = (props: {posts: IPost[]}) => {
  

  const showBoxes = props.posts.map((post:IPost,index:number) => {
    return (
      <div className='flex flex-col px-5 mt-10 justify-center' key={index}>
        <div className='border-4 rounded-md text-center'>
          <div>{post.header}</div>
          <div>{post.content}</div>
          <div>{post.user.email}</div>
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
