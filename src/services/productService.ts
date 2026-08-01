import { ProductRepository, FilterOptions, PaginationOptions } from "../repositories/productRepository.js";
import { IProduct } from "../models/productModel.js";
import { AppError } from "../utils/customError.js";

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    if (!data.name || !data.price || !data.category) {
      throw new AppError("Name, price, and category are required fields", 400);
    }
    if (data.price < 0) {
      throw new AppError("Price cannot be negative", 400);
    }
    return await this.productRepository.create(data);
  }

  async getAllProducts(
    filters: FilterOptions,
    pagination: PaginationOptions
  ): Promise<{ products: IProduct[]; total: number; page: number; totalPages: number }> {
    const { products, total } = await this.productRepository.findAll(filters, pagination);
    const totalPages = Math.ceil(total / pagination.limit) || 1;

    return {
      products,
      total,
      page: pagination.page,
      totalPages,
    };
  }

  async getProductById(id: string): Promise<IProduct> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError(`Product with ID '${id}' not found`, 404);
    }
    return product;
  }

  async updateProduct(id: string, updateData: Partial<IProduct>): Promise<IProduct> {
    // Ensure product exists
    await this.getProductById(id);

    if (updateData.price !== undefined && updateData.price < 0) {
      throw new AppError("Price cannot be negative", 400);
    }

    const updatedProduct = await this.productRepository.updateById(id, updateData);
    if (!updatedProduct) {
      throw new AppError("Failed to update product", 500);
    }
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<IProduct> {
    // Ensure product exists
    const product = await this.getProductById(id);

    const deletedProduct = await this.productRepository.deleteById(id);
    if (!deletedProduct) {
      throw new AppError("Failed to delete product", 500);
    }
    return product;
  }
}
