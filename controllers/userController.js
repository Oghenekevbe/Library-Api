const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");



//@desc create a user   
//route POST /api/users
//@access public 
const createUser = asyncHandler(async (req, res) => {

    res.status(200).json({ message: 'success' });
});
//@desc get all users   
//route GET /api/users
//@access public 
const getUsers = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'success' });
});

//@desc get a user   
//route GET /api/users/:id
//@access public 
const getUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'success' });
});


//@desc upadate a user   
//route PUT /api/users
//@access public 
const updateUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'success' });
});


//@desc delete a user   
//route DEL /api/users
//@access public 
const deleteUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'success' });
});



module.exports = { createUser, getUsers, getUser, updateUser, deleteUser };