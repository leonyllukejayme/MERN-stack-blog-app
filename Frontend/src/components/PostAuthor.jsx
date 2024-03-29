import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import blankProPic from '../assets/blank.png'

TimeAgo.addDefaultLocale(en)
TimeAgo.addDefaultLocale(ru)


const PostAuthor = ({ authorID, createdAt }) => {
	const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
					`${import.meta.env.VITE_APP_BASE_URL}/users/${authorID}`
				);
				setAuthor(response?.data);
      } catch (err) {
        console.log(err)
      }
    }
    getAuthor()
  },[])

	return (
		<Link to={`/posts/users/${authorID}`} className="post__author">
			<div className="post__author-avatar">
				{!author?.avatar ? <img src={blankProPic} alt="" />  :<img src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${author?.avatar}`} alt="" />}
			</div>
			<div className="post__author-details">
				<h5>By: {author?.name}</h5>
				<small><ReactTimeAgo date={new Date(createdAt)} locale='en-US'/></small>
			</div>
		</Link>
	);
};

export default PostAuthor;
