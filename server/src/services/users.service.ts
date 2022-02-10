import UserModel from '@/models/users.model';
import ProductModel from '@/models/product.model';

class UserService {
  public User = UserModel;
  public Product = ProductModel;

  /**
   *
   * @param userId
   * @param data
   * @returns
   */
  public async addCart(userId: string, data: object): Promise<object> {
    // 먼저 User Collection에 해당 유저의 정보를 가져오기.

    const userInfo = await this.User.findOne({ _id: userId });

    let duplicate = false;

    userInfo.cart.forEach((item) => {
      if (item['id'] === data['productId']) {
        duplicate = true;
      }
    });

    //상품이 있을때

    if (duplicate) {
      const userInfo = await this.User.findOneAndUpdate(
        { '_id': userId, 'cart.id': data['productId'] },
        // increment 증가시킨다
        { $inc: { 'cart.$.quantity': parseInt(data['qty']) } },
        // update된 정보를 얻으려면 new: true를 해야함
        { new: true }
      );
      if (userInfo) {
        return { success: true, cart: userInfo.cart };
      }
    } else {
      // 상품이 있지 않을때
      const userInfo = await this.User.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            cart: {
              id: data['productId'],
              quantity: parseInt(data['qty']),
              date: Date.now(),
            },
          },
        },
        { new: true }
      );
      return { success: true, cart: userInfo.cart };
    }
  }

  /**
   *
   * @param productIds
   */
  public async getCart(productIds: string): Promise<object> {
    const ids = productIds.split(',');
    const newProductIds = ids.map((item) => {
      return item;
    });

    const products = await this.Product.find({
      _id: {
        $in: newProductIds,
      },
    }).populate('writer');

    return { success: true, products };
  }
}

export default UserService;
