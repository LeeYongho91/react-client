import { CreateUserDto, LoginUserDto } from '@dtos/auth.dto';
import HttpException from '@exceptions/HttpException';
import { UserInput } from '@/interfaces/user/users.interface';
import User from '@/models/users.model';
import { isEmpty } from '@utils/util';

class AuthService {
  public User = User;

  /**
   *
   * @param userData
   * @returns
   */
  public async signup(data: CreateUserDto): Promise<boolean> {
    if (isEmpty(data)) throw new HttpException(400, "You're not userData");

    const findUser: UserInput = await this.User.findOne({ email: data.email });
    if (findUser) throw new HttpException(409, `You're email ${data.email} already exists`);

    const user = new this.User(data);
    const result = await user.save();
    if (!result) return false;

    return true;
  }

  /**
   *
   * @param userData
   * @returns
   */
  public async login(loginData: LoginUserDto): Promise<object> {
    if (isEmpty(loginData)) throw new HttpException(400, "You're not userData");

    const user = await this.User.findOne({ email: loginData.email });
    if (!user) throw new HttpException(409, `You're email ${loginData.email} not found`);

    const isPasswordMatching = await user.comparePassword(loginData.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = await user.generateToken();

    return { _id: user._id, tokenExp: tokenData.tokenExp, token: tokenData.token };
  }

  /**
   *
   */

  public auth(user): object {
    return {
      _id: user._id,
      isAdmin: user.role === 0 ? false : true,
      isAuth: true,
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      role: user.role,
      image: user.image,
      cart: user.cart,
      history: user.history,
      userType: user.userType,
    };
  }

  /**
   *
   * @param userId
   */

  public async logout(userId): Promise<boolean> {
    const result = await this.User.findOneAndUpdate({ _id: userId }, { token: '', tokenExp: '' });
    if (!result) throw new HttpException(409, "You're userId not found");

    return true;
  }

  /**
   *
   * @param userData
   * @param loginType
   * @returns
   */
  public async snsLogin(userData): Promise<object> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    let findUser = await this.User.findOne({ email: userData['email'], userType: userData['userType'] });
    let tokenData = {};
    if (!findUser) {
      const result = await this.signup(userData);
      if (result) {
        findUser = await this.User.findOne({ email: userData['email'], userType: userData['userType'] });
        tokenData = await findUser.generateToken();
      }
    } else {
      tokenData = await findUser.generateToken();
    }
    return { tokenExp: tokenData['tokenExp'], token: tokenData['token'] };
  }

  // /**
  //  *
  //  * @param email
  //  * @returns
  //  */
  // public async emailDoubleCheck(email: EmailDoubleCheckDto): Promise<boolean> {
  //   if (isEmpty(email)) throw new HttpException(400, 'email is empty');
  //   const login_type: LOGINTYPE = LoginType.NORMAL;

  //   const emailCount = await this.users.count({ where: { email: email, login_type: login_type } });

  //   if (emailCount == 0) {
  //     return true;
  //   }

  //   return false;
  // }

  // /**
  //  *
  //  * @param nickname
  //  * @returns
  //  */
  // public async nicknameDoubleCheck(nickname: nicknameDoubleCheckDto): Promise<boolean> {
  //   if (isEmpty(nickname)) throw new HttpException(400, 'nickname is empty');
  //   const login_type: LOGINTYPE = LoginType.NORMAL;

  //   const nicknameCount = await this.users.count({ where: { nickname: nickname, login_type: login_type } });

  //   if (nicknameCount == 0) {
  //     return true;
  //   }

  //   return false;
  // }

  // /**
  //  *
  //  * @param userData
  //  * @returns
  //  */
  // public async accountUpdate(userData: accountUpdateDto): Promise<boolean> {
  //   if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

  //   const hashedPassword = await bcrypt.hash(userData.password, 10);

  //   const result = await this.users.update({ ...userData, password: hashedPassword }, { where: { uuid: userData.uuid } });

  //   if (result[0] == 1) {
  //     return true;
  //   }

  //   return false;
  // }

  // /**
  //  *
  //  * @param uuid
  //  * @returns
  //  */
  // public async userWithdraw(uuid: userWithdrawDto): Promise<boolean> {
  //   if (isEmpty(uuid)) throw new HttpException(400, 'uuid is empty');

  //   const result = await this.users.destroy({ where: { ...uuid } });

  //   if (result == 1) {
  //     return true;
  //   }

  //   return false;
  // }
}

export default AuthService;