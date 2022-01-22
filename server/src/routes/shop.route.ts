import { Router } from 'express';
import ShopController from '@controllers/shop.controller';

import Route from '@/interfaces/route/routes.interface';

class ShopRoute implements Route {
  public path = '/api/shop';
  public router = Router();
  public ShopController = new ShopController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.path}/:params`, this.ShopController.getProducts);
    this.router.post(`${this.path}/image`, this.ShopController.imageSave);
  }
}

export default ShopRoute;
