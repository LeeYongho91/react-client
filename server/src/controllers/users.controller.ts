import { NextFunction, Request, Response } from 'express';
import userService from '@services/users.service';

class UsersController {
  public userService = new userService();

  public addCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.addCart(req.user['_id'], req.body);
      if (result['success']) res.status(200).json({ success: true, cart: result['cart'] });
    } catch (error) {
      next(error);
    }
  };

  public getCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productIds: string = req.query.foo as string;
      const result = await this.userService.getCart(productIds);
      if (result['success']) res.status(200).json({ success: true, products: result['products'] });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
