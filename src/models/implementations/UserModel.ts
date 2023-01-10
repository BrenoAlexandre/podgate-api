import bcrypt from 'bcrypt';
import mongoose, { model, Schema } from 'mongoose';
import { IUserDocument } from 'models/IUserModel';

const UserSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
      select: false,
    },
    favoritesId: { type: Schema.Types.ObjectId, ref: 'UserFavorites' },
    subscriptionsId: { type: Schema.Types.ObjectId, ref: 'UserSubscriptions' },
    casterId: { type: Schema.Types.ObjectId, ref: 'UserCasterProfile' },
    supportsId: { type: Schema.Types.ObjectId, ref: 'UserSupports' },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, options) => {
        ret._id = ret._id.toString();
        return ret;
      },
    },
  }
);

UserSchema.pre(
  'save',
  async function (
    this: IUserDocument,
    next: mongoose.CallbackWithoutResultAndOptionalError
  ) {
    // only hash the password if it has been modified (or is new)
    if (!this.password) return next();
    if (!this.isModified('password')) return next();

    // Random additional data
    const salt = await bcrypt.genSalt(10);

    const hash = bcrypt.hashSync(this.password, salt);

    // Replace the password with the hash
    this.password = hash;

    return next();
  }
);

UserSchema.methods.setPassword = async function (
  newPassword: string
): Promise<boolean> {
  const user = this as IUserDocument;

  user.password = newPassword;

  await user.save();

  return true;
};

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  // So we don't have to pass this into the interface method
  const user = this as IUserDocument;

  // only compare the password if it exists
  if (!user.password) return false;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = model<IUserDocument>('User', UserSchema);

export default UserModel;
