const { user_model } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (payload) => {
    const { email, password } = payload;
    const user = await user_model.findOne({email: email}).lean(); 
    if (!user) {
        throw 401
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        throw 401
    }

    const secret_key = process.env.SECRET_KEY;
    const token = jwt.sign({ id: user._id }, secret_key);

    return token;
}

exports.verify = async (payload) => {
    return { message: 'Token is valid'};
}

exports.signup = async (payload) => {
    const saveUser = new user_model(payload)
    await saveUser.save()
    return {
        message: "User created succuessfuly!"
    };
}
