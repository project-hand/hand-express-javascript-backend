import mongoose from 'mongoose';
import { UserSchema } from './schemas/user.js';
export const User = mongoose.model('User', UserSchema);
