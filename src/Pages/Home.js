import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../Redux/actions/actions';
import { useEffect, useState } from 'react';
import style from '../Css/Home.module.css'
import Category from '../Components/Category'
import { Link } from 'react-router-dom';
import DialogComponent from '../Components/Dialog/DialogComponent';
export default function Home() {
  const posts = useSelector((state) => state.posts);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  // console.log(posts)
  return (
    <div>

      {posts.map((item, index) => (
        <Category data={item}  key={index}/>
      ))}

    </div>
  )
}
