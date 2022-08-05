import { appendNote, renderNotes, fillForm, onHandleSubmit } from "./ui.js";
import { loadNotes, onNewNote, onSelected } from "./sockets.js";

// Este main.js es el js del cliente

// Load initial Notes
window.addEventListener("DOMContentLoaded", () => {

    loadNotes(renderNotes); //Transfieriendo el callback de socket.js a loadNotes y luego a renderNotes.
    onNewNote(appendNote);
    onSelected(fillForm);
    
});

// Save a new Note
const noteForm = document.querySelector("#noteForm");
noteForm.addEventListener("submit", onHandleSubmit);
