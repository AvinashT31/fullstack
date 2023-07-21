import User from "../Modals/User.js";
import jwt from 'jsonwebtoken'; 

export const register = async (req, res) => {
    try {
        const { name, email, number, password, role } = req.body;

        if (!name) return res.send("name is required");
        if (!email) return res.send("email is required");
        if (!number) return res.send("number is required");
        if (!password) return res.send("password is required");
        if (!role) return res.send("role is required");

        const isemailexist = await User.findOne({ email });
        if (isemailexist) {
            return res.json({ status: 400, message: "email is already present" });
        }
        const newUser = new User({
            name: name,
            email: email,
            number: number,
            password: password,
            role: role
        })
        await newUser.save()
        return res.json({ status: 200, message: " registration successfully" })
    } catch (error) {
        res.send(error)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(email, password);
        if (!email) return res.send("email is required");
        if (!password) return res.send("password is required");

        const user = await User.findOne({ email, password }).select("-password")
        console.log(user, "before token")

        const payload = { id: user._id, email: user.email, role: user.role }
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        console.log(token, "token");

        if (user) {
            return res.json({ status: 200, message: " login successfully", data: token })
        }
        else {
            return res.json({ status: 400, message: "Credentials do not match." })
        }
    } catch (error) {
        return res.send(error)
    }
}


export const getCurrentUser = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.send("Token is required!")

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // console.log(decodedToken, "decoeded tokem")

        const userId = decodedToken.id;

        const user = await User.findById(userId);

        if (user) {
            res.status(200).json({ data: user, status: "Sucess" })
        }

    } catch (error) {
        return res.send(error)
    }
}