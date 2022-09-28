import React from "react";

interface INavbarProps {
  logged: boolean;
}

function Navbar({logged}: INavbarProps) {
  if(!logged) {
    return (
      <div className="mx-auto px-5 py-5 bg-gray-800">
        <nav className="flex items-center justify-between text-white font-bold text-2xl">
          <div className="p-5  hover:bg-gray-600 hover:rounded-md">
            <a href="">BLOG</a>
          </div>
          <div className="flex space-x-10">
            <div className="p-3 hover:bg-gray-600 hover:rounded-md">
              <a href="/user/signin">Sign in</a>
            </div>
            <div className="p-3 hover:bg-gray-600 hover:rounded-md">
              <a href="/user/signup">Sign up</a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  else {
    return (
      <div className="mx-auto px-5 py-5 bg-gray-800">
        <nav className="flex items-center justify-between text-white font-bold text-2xl">
          <div className="p-5  hover:bg-gray-600 hover:rounded-md">
            <a href="">BLOG</a>
          </div>
          <div className="flex space-x-10">
            <div className="p-3 hover:bg-gray-600 hover:rounded-md">
              <a href="/publishpost">Publish Post</a>
            </div>
            <div className="p-3 hover:bg-gray-600 hover:rounded-md">
              <a href="/user/signup">See your posts</a>
            </div>
            <div className="p-3 hover:bg-gray-600 hover:rounded-md">
              <a href="/user/signout">Sign Out</a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  
}

export default Navbar;
