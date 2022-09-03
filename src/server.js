import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import { Server } from 'socket.io'
import http from 'http';

import routes from './routes';

import ErrorMiddlaware from './middlewares/ErrorMiddlaware';
class App {

  constructor() {
    this.usersConnected = [{}];

    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server);

    this.connetionSocket();
    this.middlewares();
    this.routes();
    this.errorHandler();
    this.connectDB();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(helmet());
    this.app.use(morgan('tiny'));
    this.app.use((req, res, next) => {
      req.io = this.io;
      req.usersConnected = this.usersConnected;
      return next();
    });
  }

  routes() {
    this.app.use('/v1', routes)
  }

  errorHandler() {
    this.app.use(ErrorMiddlaware);
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