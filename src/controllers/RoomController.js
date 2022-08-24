import Room from '../models/Room';

class RoomController {
  async getRooms(req, res) {
    try {
      const rooms = await Room.find({ user: req.params._id }).populate(['user', 'questions']);
      res.status(200).json({ rooms });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async getRoom(req, res) {
    try {
      const room = await Room.findById(req.params._room).populate(['user', 'questions']);

      if (!room.opened) return res.status(403).json({ error: 'Room is closed' });

      res.status(200).json(room);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getMyRoom(req, res) {
    try {
      const room = await Room.findById(req.params._room).populate([{ path: 'questions', populate: { path: 'user' }, options: { sort: { 'focused': -1, 'answered': 1, 'likes': 1 } } }]);
      if (!room.opened) return res.status(403).json({ error: 'Room is closed' });
      if (room.user._id.toString() !== req._id.toString()) return res.status(403).json({ error: 'You are not the owner of this room' });
      res.status(200).json(room);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async createRoom(req, res) {
    try {
      console.log(req.body);

      const room = await Room.create({ ...req.body, user: req._id });
      res.status(201).json({ room });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async updateRoom(req, res) {
    const { title, opened } = req.body
    try {
      const room = await Room.findByIdAndUpdate(req.params._room, { title, opened }, { new: true });

      if (!room.open) req.io.to(room._id.toString()).emit('closed', room);

      return res.status(200).json({ room });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async deleteRoom(req, res) {
    try {
      const room = await Room.findByIdAndDelete(req.params._room);
      res.status(200).json({ message: 'Room deleted' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new RoomController();