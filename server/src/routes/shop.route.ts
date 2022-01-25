import { Router } from 'express';
import ShopController from '@controllers/shop.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { uploadDto, getProductDto } from '@/dtos/shop.dto';
import Route from '@/interfaces/route/routes.interface';

class ShopRoute implements Route {
  public path = '/api/shop';
  public router = Router();
  public ShopController = new ShopController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/products`, /* validationMiddleware(getProductDto, 'body'), */ this.ShopController.getProducts);
    this.router.post(`${this.path}/image`, this.ShopController.imageSave);
    this.router.post(`${this.path}/upload`, validationMiddleware(uploadDto, 'body'), this.ShopController.upload);
  }
}

export default ShopRoute;
