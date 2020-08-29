const notes = require('./notes')
const chalk = require('chalk')
const yargs = require('yargs')

//customise yargs version
yargs.version('1.1.0')

//commands: add, remove, read, list
//--add
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'main text of note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//--remove
yargs.command({
    command: 'remove',
    describe: 'removes a note',
    builder:{
        title: {
            describe: 'Title of the note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//--read
yargs.command({
    command: 'read',
    describe: 'displays a note to the user',
    builder: {
        title: {
            describe: 'Title of the note to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

//--list
yargs.command({
    command: 'list',
    describe: 'Lists the user\'s notes',
    handler() {
        notes.listNotes()
    }
})

yargs.parse()
