// =================REGISTER A NEW USER
// POST: api/users/register
//UNPROTECTED

const registerUser = async (req, res) => {
	res.json('Register user');
};

// =================LOGIN A REGISTERED USER
// POST: api/users/login
//UNPROTECTED

const loginUser = async (req, res) => {
	res.json('Login user');
};

// =================USER PROFILE
// POST: api/users/:id
//PROTECTED

const getUser = async (req, res) => {
	res.json('user profile');
};

// =================CHANGE USER AVATAR (profile picture)
// POST: api/users/change-avatar
//PROTECTED

const changeAvatar = async (req, res) => {
	res.json('change avatar');
};

// =================EDIT USER
// POST: api/users/edit-user
//PROTECTED

const editUser = async (req, res) => {
	res.json('edit user details');
};

// =================GET AUTHORS
// POST: api/users/authors
//UNPROTECTED

const getAuthors = async (req, res) => {
	res.json('Get all users/authors');
};


module.exports = {registerUser,loginUser,getUser,changeAvatar,editUser,getAuthors}