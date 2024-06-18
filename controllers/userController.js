const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");





//@desc create a user   
//route POST /api/users
//@access public 
const registerUser = asyncHandler(async (req, res) => {
    const { email, password, isStaff, isAdmin } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({ where: { email } });
    if (userAvailable) {
        res.status(400);
        throw new Error("This user already exists");
    }

    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({ email, password: hashedPassword, isStaff, isAdmin });
    if (user) {


        res.status(201).json({
            message: "User successfully created", user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                libraryId: user.libraryId,
                isStaff: user.isStaff,
                isAdmin: user.isAdmin,
                books: user.books,
                readCount: user.readCount,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }



});


//@desc Login a user
//@route POST /api/user
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ where: { email } });
    const isMatch = bcrypt.compareSync(password, user.password);

    if (user && isMatch) {

        const accessToken = jwt.sign({

            user: {
                username: user.username,
                email: user.email,
                id: user._id,
                isStaff: user.isStaff,
                isAdmin: user.isAdmin
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15min" }
        );
        user.status = user.isAdmin && user.isStaff ? "Administrator" : user.isStaff ? "Staff" : "reader";
        res.status(200).json({ message: "User successfully logged in", userStatus: user.status, "accessToken": accessToken });

    } else {
        res.status(401);
        throw new Error("User not found. Email or Password is not valid");
    }


}
);


//@desc get all users   
//route GET /api/users
//@access private 
const getUsers = asyncHandler(async (req, res) => {
    const user = req.user;
    console.log(user.isStaff);
    console.log(user);
    if (user && user.isStaff === true) {
        const users = await User.findAll({ attributes: { exclude: ['password'] } }); // Exclude password field
        if (!users) {
            res.status(404);
            throw new Error("No users found");
        }
        res.status(200).json(users);
    } else {
        res.status(401);
        throw new Error("You are unauthorized to view this");
    }
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



module.exports = { registerUser, getUsers, loginUser, getUser, updateUser, deleteUser };