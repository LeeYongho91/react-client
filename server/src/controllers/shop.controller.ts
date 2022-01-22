import { NextFunction, Request, Response } from 'express';
import shopService from '@services/shop.service';
import upload from '@utils/upload';
class ShopController {
  public shopService = new shopService();

  // /**
  //  *
  //  * @param req
  //  * @param res
  //  * @param next
  //  */
  // public getProducts = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const params = req.params.params;
  //     const findAllProduct: Product[] = await this.shopService.findAllProduct(JSON.parse(params));
  //     const findAllProductCount: number = await this.shopService.findAllProductCount(JSON.parse(params));

  //     res.status(200).json({ products: findAllProduct, count: findAllProductCount, message: 'findAll' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

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
          return res.json({ success: false, err });
        }
        return res.json({ success: true, filePath: res.req['file'].path, filename: res.req['file'].filename });
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ShopController;
