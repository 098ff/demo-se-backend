import { ProductModel, IProduct } from "../models/productModel.js";

export interface FilterOptions {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export class ProductRepository {
  async create(data: Partial<IProduct>): Promise<IProduct> {
    return await ProductModel.create(data);
  }

  async findAll(
    filters: FilterOptions = {},
    pagination: PaginationOptions = { page: 1, limit: 10 }
  ): Promise<{ products: IProduct[]; total: number }> {
    const query: Record<string, unknown> = {};

    if (filters.category) {
      query.category = { $regex: new RegExp(filters.category, "i") };
    }

    if (filters.search) {
      query.$or = [
        { name: { $regex: new RegExp(filters.search, "i") } },
        { description: { $regex: new RegExp(filters.search, "i") } },
        { tags: { $in: [new RegExp(filters.search, "i")] } },
      ];
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      const priceFilter: Record<string, number> = {};
      if (filters.minPrice !== undefined) priceFilter.$gte = filters.minPrice;
      if (filters.maxPrice !== undefined) priceFilter.$lte = filters.maxPrice;
      query.price = priceFilter;
    }

    if (filters.inStock !== undefined) {
      query.inStock = filters.inStock;
    }

    const skip = (pagination.page - 1) * pagination.limit;

    const [products, total] = await Promise.all([
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(pagination.limit)
        .exec(),
      ProductModel.countDocuments(query),
    ]);

    return { products, total };
  }

  async findById(id: string): Promise<IProduct | null> {
    return await ProductModel.findById(id).exec();
  }

  async updateById(id: string, updateData: Partial<IProduct>): Promise<IProduct | null> {
    return await ProductModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async deleteById(id: string): Promise<IProduct | null> {
    return await ProductModel.findByIdAndDelete(id).exec();
  }
}
