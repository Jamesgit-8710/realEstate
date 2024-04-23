const { property_model } = require("../models");

exports.register = async (payload) => {
    const saveUser = new property_model(payload)
    await saveUser.save()
    return {
        message: "Property registered succuessfuly!"
    };
}

exports.get_list = async (req_query) => {
    const all_property = await property_model.find(req_query);
    return all_property;
}
