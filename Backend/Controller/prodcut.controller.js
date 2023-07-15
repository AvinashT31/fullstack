import Product from "../Modals/Products.js";

export const addproduct = async (req, res) => {
    try {
        const { name, image, price } = req.body;

        if (!name) return res.send("name is required");
        if (!image) return res.send("image is required");
        if (!price) return res.send("price is required");

        const product = new Product({ name, image, price });
        await product.save();
        return res.json({ status: 200, message: "Product added successfully" })

    } catch (error) {
        return res.send(error)
    }
}

export const homepage = async (req, res) => {
    try {
        const products = await Product.find({});
        // console.log(products, "products");
        res.send(products)

    } catch (error) {
        return res.send(error)
    }
}