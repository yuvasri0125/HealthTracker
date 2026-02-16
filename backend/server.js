// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // loads .env into process.env

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

// show what uri is used (redact credentials if printed)
console.log("Running server.js from:", __filename);
console.log("Using MONGO_URI:", MONGO_URI ? MONGO_URI.replace(/\/\/.*@/, "//<redacted>@") : "(none)");

if (MONGO_URI) {
  // connect using current mongoose style (no useNewUrlParser/useUnifiedTopology)
  mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB error:", err));
} else {
  console.warn("⚠️ MONGO_URI not set, skipping MongoDB connection.");
}

// mount your routes if any (adjust path to your router)
const recordsRouter = require("./routes/records");
app.use("/api/records", recordsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
