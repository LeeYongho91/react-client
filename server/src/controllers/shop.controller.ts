import { NextFunction, Request, Response } from 'express';
import shopService from '@services/shop.service';
import upload from '@utils/upload';
class ShopController {
  public shopService = new shopService();

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.shopService.getProducts(req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  public imageSave = (req: Request, res: Response, next: NextFunction) => {
    try {
      upload(req, res, (err) => {
        if (err) {
          console.log(err);
          return res.json({ success: false, err });
        }
        console.log({ success: true, filePath: res.req['file'].path, filename: res.req['file'].filename });
        return res.json({ success: true, filePath: res.req['file'].path, filename: res.req['file'].filename });
      });
    } catch (error) {
      next(error);
    }
  };

  public upload = (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = this.shopService.upload(req.body);
      if (result) res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };
}

export default ShopController;