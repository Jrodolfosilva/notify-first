import express from "express";
import UseWorkana from "../controllers/useWorkana.js";
import client from "../db/redis/clientRedis.js";
const port = 3000;
const controllerWorkana = new UseWorkana();
const app = express();
app.use(express.json());

app.get("/healthcheck", async (req, res) => {
  res.send("OK");
});


//espera a conexão do redis e inicia o servidor
client.ping().then(() => {
  console.log("Redis is connected");
    
  app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
        
    async function runWorkana(){
           try {
              await controllerWorkana.execute();
           } catch (error) {
              console.log(error);
           }
           finally{
            setTimeout(runWorkana, 600000); //60s x 1000ms = 60000 ms 
           }
        }
        runWorkana();


    });
   
    

})
.catch((err) => {
  console.log("Redis is not connected");
  console.log(err);
  process.exit(1)
});


