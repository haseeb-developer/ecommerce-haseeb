const WishList = require('../models/WishList');
const Product = require('../models/Product');
const catchAsyncErrors = require('../middlewares/helpers/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

// Add to wishlist
exports.addToWishlist = catchAsyncErrors(async (req, res, next) => {
    const { productId } = req.body;
    const userId = req.user.id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // Check if already in wishlist
    const existingWishlist = await WishList.findOne({
        user: userId,
        product: productId,
        isDeleted: null
    });

    if (existingWishlist) {
        return next(new ErrorHandler('Product already in wishlist', 400));
    }

    // Add to wishlist
    const wishlist = await WishList.create({
        user: userId,
        product: productId,
        quantity: 1
    });

    res.status(201).json({
        success: true,
        message: 'Product added to wishlist',
        wishlist
    });
});

// Remove from wishlist
exports.removeFromWishlist = catchAsyncErrors(async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user.id;

    const wishlist = await WishList.findOneAndUpdate(
        {
            user: userId,
            product: productId,
            isDeleted: null
        },
        {
            isDeleted: new Date()
        },
        { new: true }
    );

    if (!wishlist) {
        return next(new ErrorHandler('Wishlist item not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Product removed from wishlist'
    });
});

// Get user's wishlist
exports.getWishlist = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user.id;

    const wishlist = await WishList.find({
        user: userId,
        isDeleted: null
    }).populate('product');

    res.status(200).json({
        success: true,
        wishlist
    });
});

// Check if product is in wishlist
exports.checkWishlist = catchAsyncErrors(async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user.id;

    const wishlist = await WishList.findOne({
        user: userId,
        product: productId,
        isDeleted: null
    });

    res.status(200).json({
        success: true,
        inWishlist: !!wishlist
    });
});
