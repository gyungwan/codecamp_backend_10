import { InputType, OmitType } from '@nestjs/graphql';
import { image } from '../entities/image.entity';

@InputType()
export class ProductImageInput extends OmitType(image, ['id'], InputType) {}
