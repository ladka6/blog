import React from 'react'

function Deneme() {
  return (
    <div className='grid grid-cols-2'>
      <div className='container mx-auto p-5 '>
        <div style={{backgroundColor:'rgb(245 245 245)'}} className='flex flex-row py-5 pl-5 rounded-lg shadow-md'>
          <div className='flex place-items-center'>
          <img className="object-cover shadow-lg rounded-lg group-hover:opacity-75 w-56 h-5/6" src="https://stackdiary.com/140x100.png" alt="Featured Photo"  />
          </div>
          <div className='px-5'>
            <h1 className='text-lg text-bold'>A Tailwind Css Card for Displaying Blog Posts</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, dolores!</p>
            <div className='flex flex-row mt-3'>
              <img className='w-10 h-10 rounded-full' src="https://stackdiary.com/140x100.png" alt="profilepic" />
              <div className='mx-3'>
                <a href="">Yazar</a>
                <p className="text-sm text-slate-400">1 Feb,2022</p>
              </div>
            </div>
          </div>
        </div>
    </div>
    </div>
  )
}

export default Deneme