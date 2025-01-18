import React from 'react'
import { useState } from 'react';

const Content = () => {
    const[blogs, setBlogs]= useState("hi");
    const addBlog= () => setBlogs("bye");
    console.log(blogs);
    
  return (
    <div>
      <button onClick={addBlog}>Click me</button>
      
    </div>
    
    
  )
}

export default Content
