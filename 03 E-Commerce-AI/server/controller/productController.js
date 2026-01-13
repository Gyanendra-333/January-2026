import database from "../database/db.js";
import { v2 as cloudinary } from 'cloudinary';
import { ErrorHandler } from "../utils/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";

export const createProduct = catchAsyncError(async (req, res, next) => {
    const { name, description, price, category, stock } = req.body;
    if (!name || !description || !price || !category || !stock) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }
    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }
    const imageLinks = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: "products"
        });
        imageLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        });
    }
    await database.query(
        "INSERT INTO products (name, description, price, category, stock, images) VALUES (?, ?, ?, ?, ?, ?)",
        [name, description, price, category, stock, JSON.stringify(imageLinks)]
    );
    res.status(201).json({
        success: true,
        message: "Product created successfully"
    });
});

// Fetch product 
export const getProduct = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const [product] = await database.query("SELECT * FROM products WHERE id = ?", [id]);
    if (product.length === 0) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        product: product[0]
    });
    // filter Product 

    if (category) {
        query += " AND category = ?";
        params.push(category);
    }
    if (priceRange) {
        const [min, max] = priceRange.split("-");
        query += " AND price BETWEEN ? AND ?";
        params.push(min, max);
    }

    // search 
});

// update product 
export const updateProduct = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const [product] = await database.query("SELECT * FROM products WHERE id = ?", [id]);
    if (product.length === 0) {
        return next(new ErrorHandler("Product not found", 404));
    }
    await database.query(
        "UPDATE products SET name = ?, description = ?, price = ?, category = ?, stock = ? WHERE id = ?",
        [name || product[0].name, description || product[0].description, price || product[0].price, category || product[0].category, stock || product[0].stock, id]
    );
    res.status(200).json({
        success: true,
        message: "Product updated successfully"
    });
});
// delete product
export const deleteProduct = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const [product] = await database.query("SELECT * FROM products WHERE id = ?", [id]);
    if (product.length === 0) {
        return next(new ErrorHandler("Product not found", 404));
    }
    await database.query("DELETE FROM products WHERE id = ?", [id]);
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});
// get all products
export const getAllProducts = catchAsyncError(async (req, res, next) => {
    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];
    const { category, priceRange, search } = req.query;
    // filter Product

    if (category) {
        query += " AND category = ?";
        params.push(category);
    }
    if (priceRange) {
        const [min, max] = priceRange.split("-");
        query += " AND price BETWEEN ? AND ?";
        params.push(min, max);
    }
    // search
    if (search) {
        query += " AND name LIKE ?";
        params.push(`%${search}%`);
    }
    const [products] = await database.query(query, params);
    res.status(200).json({
        success: true,
        products
    });
});

// fetchSingleProduct
export const fetchSingleProduct = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const [product] = await database.query("SELECT * FROM products WHERE id = ?", [id]);
    if (product.length === 0) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({
        success: true,
        product: product[0]
    });
});

// post product review 
export const postProductReview = catchAsyncError(async (req, res, next) => {
    const { productId, rating, comment } = req.body;
    const userId = req.user.id;
    const [product] = await database.query("SELECT * FROM products WHERE id = ?", [productId]);
    if (product.length === 0) {
        return next(new ErrorHandler("Product not found", 404));
    }
    const review = {
        userId,
        rating,
        comment,
        createdAt: new Date()
    };
    let reviews = [];
    if (product[0].reviews) {
        reviews = JSON.parse(product[0].reviews);
    }
    reviews.push(review);
    const numOfReviews = reviews.length;
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews;
    await database.query(
        "UPDATE products SET reviews = ?, ratings = ?, numOfReviews = ? WHERE id = ?",
        [JSON.stringify(reviews), avgRating, numOfReviews, productId]
    );
    res.status(200).json({
        success: true,
        message: "Review added successfully"
    });
});

// delete product review
export const deleteProductReview = catchAsyncError(async (req, res, next) => {
    const { productId, reviewId } = req.query;
    const [product] = await database.query("SELECT * FROM products WHERE id = ?", [productId]);
    if (product.length === 0) {
        return next(new ErrorHandler("Product not found", 404));
    }
    let reviews = [];
    if (product[0].reviews) {
        reviews = JSON.parse(product[0].reviews);
    }
    const newReviews = reviews.filter(review => review.id !== parseInt(reviewId));
    const numOfReviews = newReviews.length;
    const avgRating = newReviews.reduce((acc, item) => item.rating + acc, 0) / (numOfReviews || 1);
    await database.query(
        "UPDATE products SET reviews = ?, ratings = ?, numOfReviews = ? WHERE id = ?",
        [JSON.stringify(newReviews), avgRating, numOfReviews, productId]
    );
    res.status(200).json({
        success: true,
        message: "Review deleted successfully"
    });
});

// fetch filtere product 
export const fetchFilteredProducts = catchAsyncError(async (req, res, next) => {
    let query = "SELECT * FROM products WHERE 1=1";
    const params = [];
    const { category, priceRange } = req.query;
    // filter Product

    if (category) {
        query += " AND category = ?";
        params.push(category);
    }
    if (priceRange) {
        const [min, max] = priceRange.split("-");
        query += " AND price BETWEEN ? AND ?";
        params.push(min, max);
    }
    const [products] = await database.query(query, params);
    res.status(200).json({
        success: true,
        products
    });
});


// fetch ai filtered products
export const fetchAIFilteredProducts = catchAsyncError(async (req, res, next) => {
    // Implementation for AI filtered products
    const { aiCriteria } = req.body;
    // AI filtering logic goes here
    const [products] = await database.query("SELECT * FROM products");
    res.status(200).json({
        success: true,
        products
    });
});