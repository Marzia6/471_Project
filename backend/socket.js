import { Server } from "socket.io";

const setupSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5174",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New user connected with ID:", socket.id);

    socket.on("join", (id) => {
      console.log(`User joined room: ${id}`);
      socket.join(id);
    });

    socket.on("privateMsg", (data) => {
      const { content, sender, receiver } = data;
      console.log(`Message from ${sender} to ${receiver}: ${content}`);
      io.to(receiver).emit("newMsg", { content, sender });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

export default setupSocket;
