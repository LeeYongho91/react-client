import { pagination } from '@/utils/pagination';
import Product from '@/models/product.model';

class ShopService {
  public Product = Product;
  public pagination = pagination;
}

export default ShopService;
