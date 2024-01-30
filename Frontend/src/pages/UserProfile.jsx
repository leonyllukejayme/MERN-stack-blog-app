import { useState } from 'react'
import { FaCheck, FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Avatar from '../images/avatar12.jpg'

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [currentPassword,setCurrentPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [confirmNewPassword,setConfirmNewPassword] = useState('')

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/a`} className='btn'>My Posts</Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={avatar} alt="" />
            </div>
            {/* Form to update avatar */}
            <form className="avatar__form">
              <input type="file" name="avatar" id="avatar" onChange={e=> setAvatar(e.target.files[0])} accept="png, jpg, jpeg" />
              <label htmlFor="avatar"><FaEdit/></label>
            </form>
            <button className=' profile__avatar-btn' ><FaCheck /></button>
          </div>

          <h1>Ann Donut</h1>
            
            {/* Form to update user Details */}
            <form className="form profile__form">
              <p className="form__error-message">This is an error message</p>
              <input type="text" placeholder='Full Name' onChange={e=> setName(e.target.value)}/>
              <input type="email" placeholder='Email' onChange={e=> setName(e.target.value)}/>
              <input type="password" placeholder='Current Password' onChange={e=> setName(e.target.value)}/>
              <input type="password" placeholder='New Password' onChange={e=> setName(e.target.value)}/>
              <input type="password" placeholder='Confirm New Password' onChange={e=> setName(e.target.value)}/>
              <button type="submit" className='btn primary'>Update</button>
            </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile