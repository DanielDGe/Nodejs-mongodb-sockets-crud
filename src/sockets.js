import Note from "./models/Note";

export default (io) => {

    io.on("connection", (socket) => {

        //socket.emit envia datos solo a la ventana que ha emitido el evento en el cliente.
        //io.emmit envia eventos a todas las ventanas que estan conectadas.

        // console.log(socket.handshake.url);
        console.log("nuevo socket connectado:", socket.id);

        // Send all messages to the client
        const emitNotes = async (prop) => {
            const notes = await Note.find();

            if (prop === "confirm") {
                io.emit("server:loadnotes", notes);
            } else {
                socket.emit("server:loadnotes", notes);
            }
            
        };
        emitNotes();

        socket.on("client:newnote", async (data) => {
            const newNote = new Note(data);
            const savedNote = await newNote.save();
            io.emit("server:newnote", savedNote);
        });

        socket.on("client:deletenote", async (noteId) => {
            await Note.findByIdAndDelete(noteId);
            emitNotes("confirm");
        });

        socket.on("client:getnote", async (noteId) => {
            const note = await Note.findById(noteId);
            socket.emit("server:selectednote", note);
        });

        socket.on("client:updatenote", async (updatedNote) => {
            await Note.findByIdAndUpdate(updatedNote._id, {
                title: updatedNote.title,
                description: updatedNote.description,
            });
            emitNotes("confirm");
        });

        socket.on("disconnect", () => {
            console.log(socket.id, "disconnected");
        });

    });

};