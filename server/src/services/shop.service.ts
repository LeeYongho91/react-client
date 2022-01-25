import { pagination } from '@/utils/pagination';
import ProductModel from '@/models/product.model';
import { uploadDto } from '@/dtos/shop.dto';
import HttpException from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';

class ShopService {
  public Product = ProductModel;
  public pagination = pagination;

  public async upload(productData: uploadDto): Promise<boolean> {
    if (isEmpty(productData)) throw new HttpException(400, "You're not productData");

    const product = new this.Product(productData);
    await product.save();

    return true;
  }

  public async getProducts(filterData): Promise<object> {
    if (isEmpty(filterData)) throw new HttpException(400, "You're not filterData");

    const limit = filterData.limit ? parseInt(filterData.limit) : 100;
    const skip = filterData.skip ? parseInt(filterData.skip) : 0;
    const term = filterData.searchTerm;

    const findArgs = {};

    for (const key in filterData.filters) {
      if (filterData.filters[key].length > 0) {
        if (key === 'price') {
          findArgs[key] = {
            // grater than or equivalent 크거나 같은
            $gte: filterData.filters[key][0],
            // less than or equivalent 작거나 같은
            $lte: filterData.filters[key][1],
          };
        }
      }
    }

    console.log(findArgs);

    if (term) {
      const productInfo = await this.Product.find(findArgs)
        .find({ $text: { $search: term } })
        .populate('writer')
        .skip(skip)
        .limit(limit);
      const next = await this.Product.find(findArgs)
        .skip(skip + limit)
        .limit(limit);
      return { success: true, productInfo, postSize: productInfo.length, next: next.length !== 0 };
    } else {
      const productInfo = await this.Product.find(findArgs).populate('writer').skip(skip).limit(limit);
      const next = await this.Product.find(findArgs)
        .skip(skip + limit)
        .limit(limit);
      return { success: true, productInfo, postSize: productInfo.length, next: next.length !== 0 };
    }
  }
}

export default ShopService;
