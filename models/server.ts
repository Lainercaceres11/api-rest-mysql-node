import express from "express";
import cors from "cors";
import userRouter from "../routes/user";
import connectionDB from "../db/connectionDB";

class Server {
  private app: express.Application;
  private port: String | undefined;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.dbConnection()

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.app.use(express.json());

    this.app.use(cors());

    this.app.use(express.static("public"));
  }

  async dbConnection(){
    try {
        await connectionDB.authenticate()
        console.log("Base de datos conectada")
    } catch (error) {
        console.log(error)
        
    }

  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }

  routes() {
    this.app.use("/user", userRouter);
  }
}

export default Server;
