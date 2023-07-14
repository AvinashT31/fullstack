import User from "../Modals/User.js";

export const register = async (req, res) => {
    try {
        const { name, email, number, password } = req.body;

        if (!name) return res.send("name is required");
        if (!email) return res.send("email is required");
        if (!number) return res.send("number is required");
        if (!password) return res.send("password is required");

        const isemailexist = await User.findOne({ email });
        if (isemailexist) {
            return res.json({ status: 400, message: "email is already present" });
        }
        const newUser = new User({
            name: name,
            email: email,
            number: number,
            password: password
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

        const user = await User.findOne({ email, password })

        if (user) {
            return res.json({ status: 200, message: " login successfully" })
        }
        else {
            return res.json({ status: 400, message: "Credentials do not match." })
        }
    } catch (error) {
        return res.send(error)
    }
}