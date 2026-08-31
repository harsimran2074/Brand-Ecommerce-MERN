import { useState } from "react";

function TestUpload() {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Product data
        formData.append("name", "Classic Black T-Shirt");
        formData.append(
            "description",
            "A comfortable cotton T-shirt for everyday use"
        );
        formData.append("price", "599");
        formData.append("category", "Men");
        formData.append("subcategory", "T-Shirts");
        formData.append("date", Date.now().toString());
        formData.append("bestSeller", "true");

        // Array must be converted to JSON string
        formData.append(
            "sizes",
            JSON.stringify(["S", "M", "L", "XL"])
        );

        // Images
        if (image1) {
            formData.append("image1", image1);
        }

        if (image2) {
            formData.append("image2", image2);
        }

        if (image3) {
            formData.append("image3", image3);
        }

        if (image4) {
            formData.append("image4", image4);
        }

        // Debug before sending
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await fetch(
                "http://localhost:5001/api/product/add",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            console.log("Server response:", data);

        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <h2>Test Product Upload</h2>

            <div>
                <label>Image 1: </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage1(e.target.files[0])}
                />
            </div>

            <div>
                <label>Image 2: </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage2(e.target.files[0])}
                />
            </div>

            <div>
                <label>Image 3: </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage3(e.target.files[0])}
                />
            </div>

            <div>
                <label>Image 4: </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage4(e.target.files[0])}
                />
            </div>

            <button type="submit">
                Add Product
            </button>

        </form>
    );
}

export default TestUpload;