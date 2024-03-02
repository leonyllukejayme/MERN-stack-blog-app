import { useContext, useEffect, useState } from 'react';
import { FaCheck, FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '../context/userContext';
import axios from 'axios';
import { LuLoader2 } from 'react-icons/lu';

const UserProfile = () => {
	const [avatar, setAvatar] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const [isAvatarTouched, setIsAvatarTouched] = useState(false);

	const { currentUser } = useContext(UserContext);
	const token = currentUser?.token;
	const navigate = useNavigate();

	// redirect to login page for any user who isn't logged in
	useEffect(() => {
		if (!token) {
			navigate('/login');
		}
	}, []);

	useEffect(() => {
		const getUser = async () => {
			const response = await axios.get(
				`${import.meta.env.VITE_APP_BASE_URL}/users/${currentUser.id}`,
				{ withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
			);
			const { name, email, avatar } = response.data;
			setName(name);
			setEmail(email);
			setAvatar(avatar);
		};
		getUser();
	}, []);

	const changeAvatarHandler = async () => {
		setIsAvatarTouched(false);
		try {
			const postData = new FormData();
			postData.set('avatar', avatar);
			const response = await axios.post(
				`${import.meta.env.VITE_APP_BASE_URL}/users/change-avatar`,postData,{ withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
			setAvatar(response?.data.avatar);
		} catch (err) {
			console.log(err);
		}
	};

	const updateUserDetail = async (e) => {
		e.preventDefault();
    setIsLoading(true)
		try {
      const userData = new FormData();
      userData.set('name', name);
      userData.set('email', email);
      userData.set('currentPassword', currentPassword);
      userData.set('newPassword', newPassword);
      userData.set('confirmNewPassword', confirmNewPassword);

      const response = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/users/edit-user`,userData,{ withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
      if (response.status == 200) {
        // log user out
        navigate('/logout')
      }
    } catch (err) {
      setError(err.response.data.message)
    }
    setIsLoading(false)
	};

	return (
		<section className="profile">
			<div className="container profile__container">
				<Link to={`/myposts/${currentUser.id}`} className="btn">
					My Posts
				</Link>

				<div className="profile__details">
					<div className="avatar__wrapper">
						<div className="profile__avatar">
							<img
								src={`${import.meta.env.VITE_APP_ASSETS_URL}/uploads/${avatar}`}
								alt=""
							/>
						</div>
						{/* Form to update avatar */}
						<form className="avatar__form">
							<input
								type="file"
								name="avatar"
								id="avatar"
								onChange={(e) => setAvatar(e.target.files[0])}
								accept="png, jpg, jpeg"
							/>
							<label
								htmlFor="avatar"
								style={{ cursor: 'pointer' }}
								onClick={() => setIsAvatarTouched(true)}>
								<FaEdit />
							</label>
						</form>
						{isAvatarTouched && (
							<button
								className=" profile__avatar-btn"
								onClick={changeAvatarHandler}>
								<FaCheck />
							</button>
						)}
					</div>

					<h1>{currentUser.name}</h1>

					{/* Form to update user Details */}
					<form className="form profile__form" onSubmit={updateUserDetail}>
						{error && <p className="form__error-message">{error}</p>}
						<input
							type="text"
							placeholder="Full Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="password"
							placeholder="Current Password"
							onChange={(e) => setCurrentPassword(e.target.value)}
						/>
						<input
							type="password"
							placeholder="New Password"
							onChange={(e) => setNewPassword(e.target.value)}
						/>
						<input
							type="password"
							placeholder="Confirm New Password"
							onChange={(e) => setConfirmNewPassword(e.target.value)}
						/>
						<button type="submit" className="btn primary">
							{isLoading ? <LuLoader2 className='rotate' /> : "Update Detail"}
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default UserProfile;
