import { config } from "dotenv";
config();

export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://ricardo:76723500@cluster0.aisvm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  PORT: process.env.PORT || 4000,
  SECRET: 'sistema-venta-kiosco'
};
