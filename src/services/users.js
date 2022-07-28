import { User } from '../models/index.js';

class UserService {
  async getUsers(keyword, authority) {
    const keywordExp = new RegExp(keyword);
    const users = keyword ? await User.find({ name: { $regex: keywordExp } }) : await User.find({});
    const data =
      authority === 'admin'
        ? users.map(({ _id, authority, name, profileImage, friends }) => ({
          _id,
          authority,
          name,
          profileImage,
          friends,
        }))
        : users.map(({ _id, name, profileImage, friends }) => ({
          _id,
          name,
          profileImage,
          friends,
        }));
    return data;
  }

  async getUserDataById(_id) {
    const user = await User.findOne({ _id });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const error = new Error('요청한 id에 해당하는 사용자가 존재하지 않습니다.');
      error.name = 'NotFound';
      throw error;
    }
    const data = {
      _id: user._id,
      email: user.email,
      name: user.name,
      description: user.description,
      profileImage: user.profileImage,
      friends: user.friends,
    };
    return data;
  }

  async getUserDataByRefreshToken(refreshToken) {
    const user = await User.findOne({ refreshToken });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const error = new Error('요청한 refreshToken에 해당하는 사용자가 존재하지 않습니다.');
      error.name = 'NotFound';
      throw error;
    }

    return user;
  }

  async setUser(_id, update) {
    // 업데이트 진행
    const updatedUser = await User.findOneAndUpdate({ _id }, update, { returnOriginal: false });
    if (!updatedUser) {
      const error = new Error('업데이트에 실패하였습니다. id와 update 내용을 확인 바랍니다.');
      error.name = 'NotFound';
      throw error;
    }
    return updatedUser;
  }

  async friendsBulkUpdate(writes) {
    User.bulkWrite(writes);
  }

  async deleteUserData(_id) {
    const { deletedCount } = await User.deleteOne({ _id });
    // 삭제에 실패한 경우, 에러 메시지 반환
    if (deletedCount === 0) {
      const error = new Error(`요청한 id에 해당하는 사용자를 찾지 못해 삭제에 실패하였습니다.`);
      error.name = 'NotFound';
      throw error;
    }

    return { result: 'success' };
  }
}

const userService = new UserService();

export { userService };
