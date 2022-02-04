import ProductModel from '@/models/product.model';
import ReviewModel from '@/models/review.model';
import { uploadDto } from '@/dtos/shop.dto';
import HttpException from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';

class ShopService {
  public Product = ProductModel;
  public Review = ReviewModel;

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

  public async getProductById(type, productIds): Promise<object> {
    if (isEmpty(type)) throw new HttpException(400, "You're nottype");
    if (isEmpty(productIds)) throw new HttpException(400, "You're not productIds");

    if (type === 'array') {
      const ids = productIds.split(',');
      productIds = ids.map((item) => {
        return item;
      });
    }

    const product = await this.Product.find({
      _id: {
        $in: productIds,
      },
    })
      .populate('writer')
      .populate('review');

    return { success: true, product };
  }

  public async reviewAdd(req): Promise<boolean> {
    if (isEmpty(req.body)) throw new HttpException(400, "You're not reviewData");
    const reviewData = {
      writer: req.user['_id'],
      description: req.body.description,
    };
    const review = new this.Review(reviewData);
    const { _id } = await review.save();
    await this.Product.findOneAndUpdate({ _id: req.body.productId }, { review: _id }, { new: true });
    return true;
  }
}

export default ShopService;
