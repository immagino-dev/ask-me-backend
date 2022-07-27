import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { Server } from 'socket.io'
import http from 'http';

import routes from '##/routes';

class App {

  constructor() {
    this.usersConnected = [{}];

    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server);

    this.connetionSocket();
    this.middlewares();
    this.routes();
    this.connectDB();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use((req, res, next) => {
      req.io = this.io;
      req.usersConnected = this.usersConnected;
      return next();
    })
  }

  routes() {
    this.app.use('/v1', routes)
  }

  connetionSocket() {
    this.io.on('connection', async (socket) => {
      const { user, room } = socket.handshake.query;
      console.log(`User ${user} connected in room ${room}`);
      this.usersConnected[user] = socket.id;
      
      socket.join(room);

      socket.on('disconnect', () => {
        console.log(`User ${user} desconnected`);
      });
    });
  }

  connectDB() {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true
    });
  }
}

export default new App().server;