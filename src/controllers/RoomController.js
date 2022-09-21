import RoomService from "../services/Room.service";

class RoomController {
  async getRooms(req, res, next) {
    try {
      const { rooms } = await RoomService.getRooms(req._id.toString());
      return res.status(200).json({ rooms });
    } catch (error) {
      next(error)
    }
  }
  async getRoom(req, res, next) {
    try {
      const { room } = await RoomService.getRoom(req.params._room);
      return res.status(200).json(room);
    } catch (error) {
      next(error)
    }
  }

  async getMyRoom(req, res, next) {
    try {
      const { room } = await RoomService.getMyRoom(req.params._room, req._id);
      return res.status(200).json(room);
    } catch (error) {
      next(error)
    }
  }
  async createRoom(req, res, next) {
    try {
      const { room } = await RoomService.createRoom(req.body, req._id);
      return res.status(201).json({ room });
    } catch (error) {
      next(error)
    }
  }
  async updateRoom(req, res, next) {
    const { title, opened } = req.body
    try {
      const { room } = await RoomService.updateRoom(title, opened, req.params._room);
      console.log(room)
      if (!room.open) req.io.to(room._id.toString()).emit('closed', room);

      return res.status(200).json({ room });
    } catch (error) {
      next(error)
    }
  }
  async deleteRoom(req, res, next) {
    try {
      await RoomService.findByIdAndDelete(req.params._room);
      return res.status(200).json({ message: 'Room deleted' });
    } catch (error) {
      next(error)
    }
  }
}

export default new RoomController();