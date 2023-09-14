import Product from "../Modals/Products.js";

export const addproduct = async (req, res) => {
    try {
        const { name, image, price, userId } = req.body;

        if (!name) return res.send("name is required");
        if (!image) return res.send("image is required");
        if (!price) return res.send("price is required");
        if (!userId) return res.send("userID is required");

        const product = new Product({ name, image, price, userId });
        await product.save();
        return res.json({ status: 200, message: "Product added successfully" })

    } catch (error) {
        return res.send(error)
    }
}

export const showproduct = async (req, res) => {
    try {
        const products = await Product.find({});
        // console.log(products, "products");
        res.send(products)

    } catch (error) {
        return res.send(error)
    }
}

export const updateproduct = async (req, res) => {
    try {
        const { id, name, image, price, userId } = req.body

        if (!id) return res.send("id is required");
        if (!name) return res.send("name is required");
        if (!image) return res.send("image is required");
        if (!price) return res.send("price is required");
        if (!userId) return res.send("userId is required");

        const product = await Product.findById(id)
        if (product.userId == userId) {
            product.name = name,
            product.price = price,
            product.image = image,
            await product.save();
            return res.status(201).json({status:"success", data : "product", message:"product added successfully"})
        } else {
            alert("you cant update this product")
        }
    } catch (error) {
        return res.send(error)
    }
}

