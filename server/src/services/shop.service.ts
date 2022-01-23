import { pagination } from '@/utils/pagination';
import Product from '@/models/product.model';
import { uploadDto } from '@/dtos/shop.dto';
import HttpException from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';

class ShopService {
  public Product = Product;
  public pagination = pagination;

  public async upload(productData: uploadDto): Promise<boolean> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not productData");

    const product = new Product(productData);
    await product.save();

    return true;
  }
}

export default ShopService;
