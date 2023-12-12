const User = require('../models/User');
const Note = require('../models/Note');

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');


// @desc   Get all users
// @route  GET /api/users
// @access Private

const getAllusers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if(!users?.length){
        return res.status(404).json({message: 'No users found'});
    }
    res.json(users);
});

// @desc Create a new user
// @route POST /api/users
// @access Private

const createUser = asyncHandler(async (req, res) => {   
    const { username, email, password, roles } = req.body;

    // validate fields

    if(!username || !email || !password || !Array.isArray(roles) || roles.length === 0){
        return res.status(400).json({message: 'Please fill in all fields'});
    }

    // check if user exists

    const duplicate = await User.findOne({email}).lean().exec();

    if(duplicate){
        return res.status(400).json({message: 'User already exists'});
    } 
    // hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        roles
    });

    if(user){
        return res.status(201).json({ message: 'User created successfully'})
    } else {
        return res.status(400).json({message: 'Invalid user data'});
    }
});

// @desc delete a user
// @route DELETE /api/users/:id
// @access Private

const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.body;

    if(!id){
        return res.status(400).json({message: 'Invalid data'});
    }

    const note = await Note.findOne({user: id}).lean().exec();
    if(note){
        return res.status(400).json({message: 'User has notes'});
    }

    const user = await User.findById(id).exec();

    if(!user) {
        return res.status(404).json({message: 'User not found'});
    }

    const result = await user.deleteOne();

    const reply = `User ${user.username} deleted successfully`;

    res.json({message: reply});

})
// @desc  Update a user
// @route PUT /api/users/:id
// @access Private

const updateUser = asyncHandler(async (req, res) => {
    const { id, username, email, password, roles, active } = req.body;

    // confirm data
    if (!id || !username || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'Invalid data' });
    }

    // check if user exists
    const user = await User.findByIdAndUpdate(id, {
        username,
        email,
        roles,
        active,
        ...(password && {
            password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
        }),
    }, { new: true });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: `${user.username} updated successfully` });
});



module.exports = {
    getAllusers,
    createUser,
    deleteUser,
    updateUser
}

