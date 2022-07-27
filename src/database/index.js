import 'dotenv/config'

import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});
mongoose.Promise = global.Promise;

export default mongoose;