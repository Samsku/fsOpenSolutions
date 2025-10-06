import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const readDb = () => JSON.parse(fs.readFileSync("db.json", "utf-8"));
const writeDb = data => fs.writeFileSync("db.json", JSON.stringify(data, null, 2));

const PORT = 3001;

// Get all contacts
app.get("/persons", (req, res) => {
    const db = readDb();
    res.json(db.persons);
});

// Add new contact
app.post("/persons", (req, res) => {
    const { name, number } = req.body;
    if (!name || !number) return res.status(400).json({ error: "Name or number missing!" });

    const db = readDb();
    const newPerson = { name, number, id: Date.now().toString() };

    db.persons.push(newPerson);
    writeDb(db);

    res.status(201).json(newPerson);
});

// Update number
app.put("/persons/:id", (req, res) => {
    const { id } = req.params;
    const { number } = req.body;

    const db = readDb();
    const person = db.persons.find(p => p.id === id);
    if (!person) return res.status(404).json({ error: "Person not found" });

    person.number = number;
    writeDb(db);

    res.status(200).json(person);
});

// Delete person
app.delete("/persons/:id", (req, res) => {
    const { id } = req.params;

    const db = readDb();
    const person = db.persons.find(p => p.id === id);
    if (!person) return res.status(404).json({ error: "Person not found" });

    db.persons = db.persons.filter(p => p.id !== id);
    writeDb(db);

    res.status(204).end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
