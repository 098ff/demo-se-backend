import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/productService.js";
import { sendResponse } from "../utils/apiResponse.js";

const productService = new ProductService();

// @desc    Create a new product
// @route   POST /api/products
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.createProduct(req.body);
    sendResponse(res, 201, "Product created successfully", product);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products (with search, category filter, and pagination)
// @route   GET /api/products
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, search, minPrice, maxPrice, inStock, page, limit } = req.query;

    const filters = {
      category: category ? String(category) : undefined,
      search: search ? String(search) : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      inStock: inStock !== undefined ? inStock === "true" : undefined,
    };

    const pagination = {
      page: page ? Math.max(1, Number(page)) : 1,
      limit: limit ? Math.max(1, Number(limit)) : 10,
    };

    const result = await productService.getAllProducts(filters, pagination);

    sendResponse(res, 200, "Products fetched successfully", result.products, {
      total: result.total,
      page: result.page,
      totalPages: result.totalPages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single product by ID
// @route   GET /api/products/:id
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.getProductById(req.params.id);
    sendResponse(res, 200, "Product retrieved successfully", product);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a product by ID
// @route   PUT /api/products/:id
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    sendResponse(res, 200, "Product updated successfully", updatedProduct);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a product by ID
// @route   DELETE /api/products/:id
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    sendResponse(res, 200, "Product deleted successfully", deletedProduct);
  } catch (error) {
    next(error);
  }
};
