const { property_service } = require("../services");

exports.register_property =  async (req, res) => {
    try {
        const data = {...req.body, uploaded_by: req.user_id};
        const response = await property_service.register(data);
        res.status(201).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send({
            code: 500,
            message: "Somthing went wrong!"
        })
    }
}

exports.get_property_list =  async (req, res) => {
    try {
        const response = await property_service.get_list(req.query);
        res.status(200).send(response)
    } catch (err) {
        console.log(err)
        res.status(500).send({
            code: 500,
            message: "Somthing went wrong!"
        })
    }
}