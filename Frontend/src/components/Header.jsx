import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';

const Header = () => {
	const [isNavShowing,setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);

	const closeNavHandler = () => {
		if(window.innerWidth < 800){
			setIsNavShowing(false)
		}
		else{
			setIsNavShowing(true)
		}
	}
	return (
		<nav>
			<div className="container nav__container">
				<Link to={'/'} className="nav__logo" onClick={closeNavHandler}>
					<img src={logo} alt="Navbar Logo" />
				</Link>
				{isNavShowing && <ul className="nav__menu">
					<li>
						<Link to={'/profile'} onClick={closeNavHandler}>Ann Donut</Link>
					</li>
					<li>
						<Link to={'/create'} onClick={closeNavHandler}>Create Post</Link>
					</li>
					<li>
						<Link to={'/authors'} onClick={closeNavHandler}>Authors</Link>
					</li>
					<li>
						<Link to={'/logout'} onClick={closeNavHandler}>Logout</Link>
					</li>
				</ul>}
				<button className="nav__toggle-btn" onClick={() => setIsNavShowing(!isNavShowing)}>
					{isNavShowing ? <AiOutlineClose /> : <FaBars />}
				</button>
			</div>
		</nav>
	);
};

export default Header;
