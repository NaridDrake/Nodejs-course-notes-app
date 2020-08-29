const fs = require('fs');
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicate = notes.find((note) => note.title === title)

    if (!duplicate){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note saved!'))
    }else{
        console.log(chalk.red.inverse('Note title is already taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const ommitted = notes.filter((note) => note.title !== title)
    if (notes.length === ommitted.length){
        console.log(chalk.red.inverse('No note found!'))
    }else{
        saveNotes(ommitted)
        console.log(chalk.green.inverse('Note removed!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.underline('Your notes:'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note){
        console.log(chalk.yellow.underline(note.title))
        console.log(note.body)
    }else{
        console.log(chalk.red.inverse('Note not found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{ 
        const databuffer = fs.readFileSync('notes.json')
        const dataJSON = databuffer.toString()
        return JSON.parse(dataJSON)
    }catch (e){
        return []
    }
}
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}