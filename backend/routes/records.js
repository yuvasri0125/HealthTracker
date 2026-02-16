// backend/routes/records.js
const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");

const DATA_FILE = path.join(__dirname, "..", "data", "records.json");

// helper to read file
async function readRecords() {
  try {
    const content = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(content || "[]");
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.writeFile(DATA_FILE, "[]", "utf8");
      return [];
    }
    throw err;
  }
}

// helper to write file
async function writeRecords(records) {
  await fs.writeFile(DATA_FILE, JSON.stringify(records, null, 2), "utf8");
}

// GET all records
router.get("/", async (req, res) => {
  try {
    const records = await readRecords();
    res.json(records);
  } catch (err) {
    console.error("Read error:", err);
    res.status(500).json({ message: "Failed to read records" });
  }
});

// POST a new record
router.post("/", async (req, res) => {
  try {
    const { name, age, weight, height, bloodPressure, sugarLevel } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const newRecord = {
      _id: uuidv4(),               // use _id so frontend keys match
      name,
      age: age ?? null,
      weight: weight ?? null,
      height: height ?? null,
      bloodPressure: bloodPressure ?? null,
      sugarLevel: sugarLevel ?? null,
      createdAt: new Date().toISOString()
    };

    const records = await readRecords();
    records.push(newRecord);
    await writeRecords(records);

    res.status(201).json(newRecord);
  } catch (err) {
    console.error("Write error:", err);
    res.status(500).json({ message: "Failed to save record" });
  }
});

// DELETE a record by id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let records = await readRecords();
    const before = records.length;
    records = records.filter(r => r._id !== id);

    if (records.length === before) {
      return res.status(404).json({ message: "Record not found" });
    }

    await writeRecords(records);
    res.json({ message: "Record deleted", id });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete record" });
  }
});

module.exports = router;
