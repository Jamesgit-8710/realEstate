const { user_service } = require("../services");

exports.login_user = async (req, res) => {
    try {
        const response = await user_service.login(req.body);
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        if(err===401){
            res.status(401).send({
                code: 401,
                message: "Invalid email or password!"
            })
        }else{
            res.status(500).send({
                code: 500,
                message: "Somthing went wrong!"
            })
        }
    }
}

exports.verify_user = async (req, res) => {
    try {
        const response = await user_service.verify();
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send({
            code: 500,
            message: "Somthing went wrong!"
        })
    }
}

exports.signup_user =  async (req, res) => {
    try {
        const response = await user_service.signup(req.body);
        res.status(201).send(response)
    } catch (err) {
        console.log(err)
        if(err.code==11000){
            res.status(409).send({
                code: 409,
                message: "User already exist with same email!"
            })
        }else{
            res.status(500).send({
                code: 500,
                message: "Somthing went wrong!"
            })
        }
    }
}

