import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { validateObjectId } from "../middlewares/validateObjectId.js";

const router = Router();

// Route: /api/products
router.route("/")
  .post(createProduct)
  .get(getProducts);

// Route: /api/products/:id
router.route("/:id")
  .all(validateObjectId("id"))
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
