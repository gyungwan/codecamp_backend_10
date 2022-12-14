import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { IUserContext } from 'src/commons/types/context';
import { Like } from 'typeorm';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(
    //
    private readonly productsService: ProductsService, //
  ) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    // @Args({ name: 'imgUrls', type: () => [String] }) imgUrls: string[],
  ): Promise<Product> {
    return this.productsService.create({ createProductInput });
  }
  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const product = await this.productsService.findOne({ productId });

    return this.productsService.update({ product, updateProductInput });
  }
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Product)
  UpdateLike(
    //토큰
    @Context() context: IUserContext,
    @Args('productId') id: Product,
  ) {
    const user = context.req.user.email;
    return this.productsService.LikeUpdate({ id, user });
  }

  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ): Promise<Product> {
    return this.productsService.findOne({ productId });
  }
  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ): Promise<boolean> {
    return this.productsService.delete({ productId });
  }
  @Query(() => [Product])
  fetchDeletedProducts(): Promise<Product[]> {
    return this.productsService.findDeletedAll();
  }
  @Mutation(() => Boolean)
  restoreProduct(
    @Args('productId') productId: string, //
  ): Promise<boolean> {
    return this.productsService.restore({ productId });
  }
}
