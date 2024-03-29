import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { LuLoader2 } from 'react-icons/lu';

const Login = () => {
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const { setCurrentUser } = useContext(UserContext);

	const changeInputHandler = (e) => {
		setUserData((prevState) => {
			return { ...prevState, [e.target.name]: e.target.value };
		});
	};

	const loginUser = async (e) => {
		e.preventDefault();
		setError('');
		setIsLoading(true)
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_APP_BASE_URL}/users/login`,
				userData
			);
			const user = await response.data;
			setCurrentUser(user);
			navigate('/');
		} catch (err) {
			setError(err.response.data.message);
		}
		setIsLoading(false)
	};

	return (
		<section className="login">
			<div className="container">
				<h2>Sign In</h2>
				<form className="form login__form" onSubmit={loginUser}>
					{error && <p className="form__error-message">{error}</p>}
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
					<button type="submit" className="btn primary" disabled={isLoading}>
						{isLoading ? <LuLoader2 className='rotate' /> : "Login"}
					</button>
				</form>
				<small>
					Don't have an account yet? <Link to={'/register'}>Sign up</Link>
				</small>
			</div>
		</section>
	);
};

export default Login;
