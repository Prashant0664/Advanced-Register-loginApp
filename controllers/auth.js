const User = require('../models/register');

const StatusCodes = require("http-status-codes");

const register = async (req, res) => {
    const bod = { ...req.body }

    try {
        const Users = await User.create({ ...req.body })
        const token = Users.createJWT()
        Users.token = token
        await Users.save();
        res.status(201).json({ user: { name: Users.username, email: Users.email }, token, msg: "Suggesfully Registered" });
    } catch (error) {
        if (User.findOne({ email: bod.mail })) {
            res.status(202).json({ Error: "Email already registered" })
        }
        else {
            res.status(201).json({ Error: "Something went wrong" })
        }
    }
}

module.exports = {
    register,
}
