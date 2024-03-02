import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LuLoader2 } from "react-icons/lu";
import axios from 'axios';


const DeletePost = ({ postId: id }) => {
	const [isLoading, setIsLoading] = useState(false);
	const { currentUser } = useContext(UserContext);
	const token = currentUser?.token;
	const navigate = useNavigate();
	const location = useLocation();

	// redirect to login page for any user who isn't logged in
	useEffect(() => {
		if (!token) {
			navigate('/login');
		}
	}, []);

	const removePost = async () => {
		setIsLoading(true);
		try {
			const response = await axios.delete(
				`${import.meta.env.VITE_APP_BASE_URL}/posts/${id}`,
				{ withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
			);
			if (response.status == 200) {
				if (Location.pathname == `/myposts/${currentUser.id}`) {
					navigate(0);
				} else {
					navigate('/');
				}
			}
		} catch (err) {
			console.log(err.message);
		}
		setIsLoading(false);
	};

	return (
		<Link className="btn sm danger" onClick={() => removePost(id)}>
			{isLoading ? <LuLoader2 className='rotate'/> :'Delete'}
		</Link>
	);
};

export default DeletePost;
