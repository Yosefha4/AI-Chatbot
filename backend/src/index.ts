import app from "./app.js";
import { connectToDataBase } from "./db/connect.js";

const PORT = process.env.PORT || 5004;

connectToDataBase().then(() => {
  app.listen(PORT, () => {
    console.log("Server running & Connected to DataBase 🤟");
  });
}).catch((err) => console.log(err))
