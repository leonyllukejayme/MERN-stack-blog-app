import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import blankProPic from '../assets/blank.png'

const Authors = () => {
	const [authors, setAuthors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const getAuthors = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/users`);
				setAuthors(response.data);
			} catch (err) {
				console.log(err);
			}
			setIsLoading(false);
		};
		getAuthors()
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<section className="authors">
			{authors.length > 0 ? (
				<div className="container authors__container">
					{authors.map(({ _id: id, avatar, name, posts }) => {
						return (
							<Link key={id} to={`/posts/users/${id}`} className="author">
								<div className="author__avatar">
									{!avatar ? <img src={blankProPic} alt="" /> :<img src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${avatar}`} alt={`Image of ${name}`} />}
								</div>
								<div className="author__info">
									<h4>{name}</h4>
									<p>
										{posts} {posts == 1 ? 'post' : 'posts'}
									</p>
								</div>
							</Link>
						);
					})}
				</div>
			) : (
				<h2 className="center">No Users Found</h2>
			)}
		</section>
	);
};

export default Authors;
