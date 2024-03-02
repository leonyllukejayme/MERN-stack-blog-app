import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LuLoader2 } from 'react-icons/lu';

const Register = () => {
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const changeInputHandler = (e) => {
		setUserData((prevState) => {
			return { ...prevState, [e.target.name]: e.target.value };
		});
	};

	const registerUser = async (e) => {
		e.preventDefault();
		setError('');
		setIsLoading(true)
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_APP_BASE_URL}/users/register`,
				userData
			);
			const newUser = await response.data;
			console.log(newUser);
			if (!newUser) {
				setError("Couldn't register user. Please try again.");
			}
      navigate('/login')
		} catch (err) {
			setError(err.response.data.message);
		}
		setIsLoading(false)
	};

	return (
		<section className="register">
			<div className="container">
				<h2>Sign Up</h2>
				<form className="form register__form" onSubmit={registerUser}>
					{error && <p className="form__error-message">{error}</p>}

					<input
						type="text"
						placeholder="Full Name"
						name="name"
						value={userData.name}
						onChange={changeInputHandler}
					/>
					<input
						type="email"
						placeholder="Email"
						name="email"
						value={userData.email}
						onChange={changeInputHandler}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={userData.password}
						onChange={changeInputHandler}
					/>
					<input
						type="password"
						placeholder="Confirm Password"
						name="password2"
						value={userData.password2}
						onChange={changeInputHandler}
					/>
					<button type="submit" className="btn primary">
						{isLoading?<LuLoader2 className='rotate'/> : "Register"}
					</button>
				</form>
				<small>
					Already have an account? <Link to={'/login'}>Sign in</Link>
				</small>
			</div>
		</section>
	);
};

export default Register;
