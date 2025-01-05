import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import ServerConfig from "./config/serverConfig";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("New User Connected");

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    })
});

server.listen(ServerConfig.PORT, () => {
    console.log(`Server is running on port ${ServerConfig.PORT}`);
});
