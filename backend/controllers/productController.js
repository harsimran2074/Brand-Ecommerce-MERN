const { v2: cloudinary } = require("cloudinary");
const productModel = require("../models/productModel");

//add product
exports.addProduct = async (req, res) => {
    try {
        console.log("--- addProduct API hit ---");
        // console.log("req.body:", req.body);
        // console.log("req.files:", req.files);

        const { name, description, price, category, subcategory, bestSeller, sizes } = req.body;

        const image1 = req.files?.image1 ? req.files.image1[0] : undefined;
        const image2 = req.files?.image2 ? req.files.image2[0] : undefined;
        const image3 = req.files?.image3 ? req.files.image3[0] : undefined;
        const image4 = req.files?.image4 ? req.files.image4[0] : undefined;

        const images = [image1, image2, image3, image4];
        const filteredImages = images.filter((item) => (item !== undefined));

        // saving images in cloudinary
        let imagesUrl = [];
        if (filteredImages.length > 0) {
            imagesUrl = await Promise.all(
                filteredImages.map(async (item) => {
                    let result = await cloudinary.uploader.upload(
                        item.path,
                        { resource_type: 'image' }
                    );
                    return result.secure_url;
                })
            );
        }

        console.log("Uploaded Cloudinary URLs:", imagesUrl);

        // Parse sizes safely
        let parsedSizes = [];
        if (sizes) {
            parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
        }

        // saving product in database
        const product = new productModel({
            name: name,
            description: description,
            price: Number(price),
            images: imagesUrl,
            category: category,
            subcategory: subcategory,
            date: Date.now(),
            bestSeller: bestSeller == true ? true : false,
            sizes: parsedSizes
        });
        console.log(product);
        await product.save();
        res.json({ success: true, msg: "Product added successfully", product });
    } catch (error) {
        console.error("Error in addProduct:", error);
        res.status(500).json({ success: false, msg: error.message });
    }
};

//get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, msg: "Products fetched successfully", products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "product not fetched" })
    }
}

//delete product
exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await productModel.findByIdAndDelete(id);
        if (!product) {
            return res.json({ success: false, msg: "product not found" })
        }
        res.json({ success: true, msg: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "product not deleted" })
    }
}

//update product
exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    const { name, description, price, image, category, subcategory, date, bestSeller, sizes } = req.body


    try {
        const product = await productModel.findByIdAndUpdate(id, { name, description, price, image, category, subcategory, date, bestSeller, sizes });
        if (!product) {
            return res.json({ success: false, msg: "product not found" })
        }
        res.json({ success: true, msg: "Product updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: "product not updated" })
    }
}