const userModel = require("../models/userModel");

// Get cart data
exports.getCart = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: true, cartData: {} });
    }

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error("[CartController - Get Cart Error]:", error.message);
    res.json({ success: false, message: "Error fetching cart" });
  }
};

// Add item to cart
exports.addCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.user?.id || req.body?.userId;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      msg: "Item added to cart",
      cartData
    });
  } catch (error) {
    console.error("[CartController - Add Cart Error]:", error.message);
    res.json({
      success: false,
      message: "Error adding to cart"
    });
  }
};

// Update item quantity in cart
exports.updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.user?.id || req.body?.userId;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (quantity <= 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, msg: "Item updated in cart", cartData });
  } catch (error) {
    console.error("[CartController - Update Cart Error]:", error.message);
    res.json({ success: false, message: "Error updating cart" });
  }
};

// Remove item from cart
exports.removeCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.user?.id || req.body?.userId;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (size && cartData[itemId][size]) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      } else {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, msg: "Item removed from cart", cartData });
  } catch (error) {
    console.error("[CartController - Remove Cart Error]:", error.message);
    res.json({ success: false, message: "Error removing from cart" });
  }
};

