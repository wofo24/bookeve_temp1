import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../Redux/actions/actions';
import { useEffect, useState } from 'react';
import style from '../Css/Home.module.css'
import Category from '../Components/Category'
export default function Home() {
  const posts = useSelector((state) => state.posts);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  console.log(posts, 'posts')
  return (
    <div>

      {posts.map((item) => (
        <Category data={item} />
      ))}

    </div>
  )
}
