import Note from './components/Note';
import Footer from './components/Footer';
import {useState, useEffect} from "react";
import noteService from "./services/notes"

const Notification = ({message}) => {
    if (message === null) return null;
    return (
        <div className="error">
            {message}
        </div>
    )
}

const App = () => {
    const [notes, setNotes] = useState(null);
    const [newNote, setNewNote] = useState("a new note");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState("some error happened");

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])

    const addNote = (e) => {
        e.preventDefault();
        const noteObject = {
            content: newNote,
            important: Math.random() < 0.5,
            id: String(notes.length + 1),
        }

        noteService.create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote("")
            })
    }

    const handleNoteChange = (e) => {
        console.log(e.target.value);
        setNewNote(e.target.value);
    }

    const notesToShow = showAll ? notes : notes.filter(note => note.important);

    const toggleImportanceOf = (id) => {
        const note = notes.find(note => note.id === id);
        const changedNote = {...note, important: !note.important};

        noteService.update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id === id ? returnedNote : note))
            })
            .catch(error => {
                setErrorMessage(
                    `The note ${note.content} was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(note => note.id !== id))
            })
    }

    if (!notes) {
        return null;
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    Show {showAll ? "important" : "all"}
                </button>
            </div>
            <ul>
                {notesToShow.map((note) => (
                    <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input type="text" value={newNote} onChange={handleNoteChange} />
                <button type="submit">Save</button>
            </form>
            <Footer />
        </div>
    )
}

export default App