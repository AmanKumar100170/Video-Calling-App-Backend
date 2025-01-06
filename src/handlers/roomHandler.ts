import { Socket } from "socket.io";
import { v4 as UUIDv4 } from "uuid";
import IRoomParams from "../interfaces/IRoomParams";

// Store the rooms and their users
const rooms: Record<string, string[]> = {};

const roomHandler = (socket: Socket) => {

    const createRoom = () => {
        const roomId = UUIDv4(); // Generate a random unique room ID
        socket.join(roomId);
        rooms[roomId] = []; // Initialize the room with an empty array of users

        socket.emit("room-created", { roomId });
        console.log("Room created with ID: ", roomId);
    };

    const joinedRoom = ({ roomId, peerId }: IRoomParams) => {
        if (rooms[roomId]) {
            console.log("New user has joined the room: ", roomId, "with peer Id: ", peerId);
            rooms[roomId].push(peerId);
            socket.join(roomId);

            // Notify all users in the room about the new user
            socket.emit("get-users", {
                participants: rooms[roomId],
                roomId,
            });
        }
    };

    socket.on("create-room", createRoom);
    socket.on("joined-room", joinedRoom);

};

export default roomHandler;
