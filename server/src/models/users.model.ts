import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import { UserInput } from '@/interfaces/user/users.interface';
import jwt from 'jsonwebtoken';
import moment from 'moment';

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
  generateToken(): Promise<UserDocument>;
  findByToken(token, cb): Promise<UserDocument>;
}

export interface UserModel extends mongoose.Model<UserDocument> {
  findByToken: (token, cb) => Promise<UserDocument>;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
    },
    email: {
      type: String,
      trim: true,
      unique: 1,
    },
    password: {
      type: String,
      minglength: 5,
    },
    role: {
      type: Number,
      default: 0,
    },
    cart: {
      type: Array,
      default: [],
    },
    history: {
      type: Array,
      default: [],
    },
    image: String,
    token: {
      type: String,
    },
    tokenExp: {
      type: Number,
    },
    userType: {
      type: String,
      default: 'normal',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  const user = this as UserDocument;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

  const hash = bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => {
    console.log(e);
    return false;
  });
};

userSchema.methods.generateToken = async function (): Promise<object> {
  const user = this as UserDocument;
  const token = jwt.sign(user._id.toHexString(), 'secret');
  const oneHour = moment().add(1, 'hour').valueOf();
  user.tokenExp = oneHour;
  user.token = token;
  await user.save();
  return { tokenExp: user.tokenExp, token: user.token };
};

userSchema.statics.findByToken = function (token, cb) {
  const user = this as UserModel;
  jwt.verify(token, 'secret', function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default User;
