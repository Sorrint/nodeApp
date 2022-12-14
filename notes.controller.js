const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');
async function addNote(title) {
    const notes = await getNotes();

    const note = {
        title,
        id: Date.now().toString()
    };

    notes.push(note);
    await saveNotes(notes);
    console.log(chalk.bgGreen('Note was added'));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
    await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
    const notes = await getNotes();
    console.log(chalk.bgBlue('Here is the list of notes:'));
    notes.forEach((note) => {
        console.log(chalk.blue(note.id, note.title));
    });
}

async function editNote(id, title) {
    const notes = await getNotes();
    notes.forEach((note) => {
        if (note.id === id) {
            note.title = title;
            console.log(chalk.yellow(`Title note with id=${id} has been changed to "${title}" `));
        }
    });
    await saveNotes(notes);
}

async function removeNote(id) {
    const notes = await getNotes();
    filteredNotes = notes.filter((note) => note.id !== id.toString());
    console.log(filteredNotes);

    await saveNotes(filteredNotes);
    console.log(chalk.red(`Note with id=${id} has been removed`));
}

module.exports = {
    addNote,
    getNotes,
    removeNote,
    editNote
};
