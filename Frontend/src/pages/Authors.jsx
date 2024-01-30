import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authorsData } from '../components/authorsData';

const Authors = () => {
	const [authors, setAuthors] = useState(authorsData);
	return (
		<section className="authors">
			{authors.length > 0 ? (
				<div className="container authors__container">
					{authors.map(({ id, avatar, name, posts }) => {
						return <Link key={id} to={`/posts/users/${id}`} className='author'>
						<div className="author__avatar">
							<img src={avatar} alt={`Image of ${name}`} />
						</div>
						<div className="author__info">
							<h4>{name}</h4>
							<p>{posts} {posts == 1 ? "post" : "posts"}</p>
						</div>
					</Link>;
					})}
				</div>
			) : (
				<h2 className='center'>No Users Found</h2>
			)}
		</section>
	);
};

export default Authors;
