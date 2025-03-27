import express from "express"
import http from "http"
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import { log } from "console";
const app=express()

const server=http.createServer(app)  //main method
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("view engine","ejs")
app.set('views', './views');
app.use(express.static(path.join(__dirname,"public")))

io.on("connection",function(socket){   //cb   //in cb we pass unique socket key(socket is unique) //io is basically server by socketio server  //setting server
    socket.on("send-location",function(data){   //this is the what we accepting from frontend-send location
        io.emit("recieved-location",{    //now backend will send location to all connected ppl  i.e to frontend
            id:socket.id,   //every person have unique socket id
           ...data         //send all data recived lat long
         })  
     })
     socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id);
     })
    
})

app.get('/',(req,res)=>{
    res.render("index")   //res.send('Hello World')  //rendering ejs file
})

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});