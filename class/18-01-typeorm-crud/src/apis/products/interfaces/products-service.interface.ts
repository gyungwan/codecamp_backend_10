import { CreateProductInput } from 'src/apis/products/dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { Product } from '../entities/product.entity';

export interface IProductsServiceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductsServiceFindOne {
  productId: string;
}

export interface IProductsServiceUpdate {
  product: Product;
  updateProductInput: UpdateProductInput;
}
export interface IproductsServiceCheckSoldout {
  product: Product;
}
