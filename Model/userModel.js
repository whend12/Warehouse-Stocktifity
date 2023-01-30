import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.schema({
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
        maxLength: [32, "Maximum password length is 32 characters"]
    },
    role: {
        type: String,
        enum: ["supplier", "admin"],
        default: "admin"
    },

});

//Encrypt password
    userSchema.pre("save", async (next) => {
        if (!this.isModified("password")){
            return next();
        }
    

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();

});

const User = mongoose.model("User", userSchema);

modeule.exports = User;
