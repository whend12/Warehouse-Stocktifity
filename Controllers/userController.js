import Users from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) => {
    try{
        const user = await Users.find();
        res.json(user);
    } catch (error) {
        console.log(error);
    }
};

export const Register = async(req, res) => {
    const { name, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({message: "Password dan Confirm Password tidak cocok"});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({ msg: "Create Account Succefully!" });
    } catch (error) {
        console.log(error, { msg: "Failed Create Account" });
    }
};

export const Login = async(req, res) => {
    try {
        const body = req.body;
        const user = await Users.findOne({ 
            email: req.body.email });
        const match = await bcrypt.compare(body.password, user.password);
        if(!match) return res.status(400).json({messagePassword: "Wrong Password"});
        const userId = user.id;
        const name = user.name;
        const email = user.email;
        const accessToken = jwt.sign({ userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        const refreshToken = jwt.sign({ userId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken}, {
            where:{
                id : userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 *1000
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({messageEmail: "Email tidak ditemukan"});
        
    }
};

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);
        const user = await Users.find({
            where: {
                refresh_token : refreshToken
            }
        });
        if(!user) return res.sendStatus(204);
        const userId = user.id;
        await Users.update({refresh_token:null}, {
            where:{
                id: userId
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
};