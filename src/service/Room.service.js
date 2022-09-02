import Room from '../models/Room';

import { ForbiddenError } from '../utils/Errors';

class RoomService {
  async getRooms(_id) {
    const rooms = await Room.find({ user: _id }).populate(['user', 'questions']);
    return { rooms };
  }
  async getRoom(_room) {
    const room = await Room.findById(_room).populate(['user', 'questions']);
    if (!room.opened) throw new ForbiddenError('Room is closed');
    return { room };
  }
  async getMyRoom(_room, _id) {
    const room = await Room.findById(_room).populate([{ path: 'questions', populate: { path: 'user' }, options: { sort: { 'focused': -1, 'answered': 1, 'likes': 1 } } }]);
    if (!room.opened) throw new ForbiddenError('Room is closed');
    if (room.user._id.toString() !== _id.toString()) throw new ForbiddenError('You are not the owner of this room');
    return { room };
  }
  async createRoom(room_create, _id) {
    const room = await Room.create({ ...room_create, user: _id });
    return { room };
  }
  async updateRoom(title, opened, _room) {
    console.log(_room);
    const room = await Room.findByIdAndUpdate(_room, { title, opened }, { new: true });
    return { room };
  }
  async deleteRoom(_room) {
    await Room.findByIdAndDelete(_room);
    return { message: 'Room deleted' };
  }
}

export default new RoomService();