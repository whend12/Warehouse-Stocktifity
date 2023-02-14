import { mongoose } from 'mongoose';

const usersSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        trims: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Minimum password length is 6 characters"],
    },
    role: {
        type: String,
        default: "admin"
    },
    refresh_token: {
        type: String
    }

});

const Users = mongoose.model("Users", usersSchema);

export default Users;