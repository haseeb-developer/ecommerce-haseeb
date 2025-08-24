const express = require('express');
const { 
    addToWishlist, 
    removeFromWishlist, 
    getWishlist, 
    checkWishlist 
} = require('../controllers/wishlistController');
const { isAuthenticatedUser } = require('../middlewares/user_actions/auth');

const router = express.Router();

// All routes require authentication
router.use(isAuthenticatedUser);

// Add to wishlist
router.route('/wishlist/add').post(addToWishlist);

// Remove from wishlist
router.route('/wishlist/remove/:productId').delete(removeFromWishlist);

// Get user's wishlist
router.route('/wishlist').get(getWishlist);

// Check if product is in wishlist
router.route('/wishlist/check/:productId').get(checkWishlist);

module.exports = router;
