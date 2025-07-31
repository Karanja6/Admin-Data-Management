const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Create uploads folder if not exists
if (!fs.existsSync('./uploads')) fs.mkdirSync('./uploads');

// Multer storage config
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return cb(new Error('Only JPG, PNG, and PDF files are allowed'));
    }
    cb(null, true);
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize DB
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('DB connection error:', err.message);
  } else {
    console.log('Connected to SQLite DB.');

    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS form_data (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER, -- 🔗 FK to users.id
          name TEXT,
          gender TEXT,
          disability TEXT,
          userType TEXT,
          age INTEGER,
          yearsInBusiness INTEGER,
          country TEXT,
          city TEXT,
          sector TEXT,
          description TEXT,
          license TEXT,
          logo TEXT,
          isOperational TEXT
        )
      `);
    });
  }
});

// Dummy auth middleware
const authenticate = (req, res, next) => next();

// ===== USER AUTH ENDPOINTS =====
app.post('/api/signup', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.run(query, [name, email, hashedPassword], function (err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Email already registered.' });
        }
        return res.status(500).json({ error: 'Database error.' });
      }
      return res.status(201).json({ message: 'User registered successfully!' });
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error.' });
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error.' });
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'Invalid email or password.' });

    return res.status(200).json({
      message: 'Login successful!',
      user: { id: user.id, name: user.name, email: user.email }
    });
  });
});

// ===== FORM SUBMISSION =====
app.post('/api/form', upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'license', maxCount: 1 }
]), (req, res) => {
  const {
    name, gender, disability, userType,
    age, yearsInBusiness, country, city,
    sector, description, isOperational
  } = req.body;

  const logo = req.files?.logo?.[0]?.filename || null;
  const license = req.files?.license?.[0]?.filename || null;

  const query = `
    INSERT INTO form_data (
      name, gender, disability, userType, age, yearsInBusiness,
      country, city, sector, description, license, logo, isOperational
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [
    name, gender, disability, userType,
    age ? Number(age) : null,
    yearsInBusiness ? Number(yearsInBusiness) : null,
    country, city, sector, description,
    license, logo, isOperational
  ], function (err) {
    if (err) {
      console.error("DB insert error:", err.message);
      return res.status(500).json({ error: "Failed to save form data." });
    }
    res.status(201).json({
      message: "Form submitted successfully!",
      name: name,
    });
  });
});

// ===== LIST SUBMISSIONS =====
app.get('/api/submissions', authenticate, (req, res) => {
  db.all('SELECT * FROM form_data', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(rows);
  });
});

// ===== FILE UPLOAD (Dashboard documents) =====
app.post('/upload', upload.single('file'), (req, res) => {
  const { userId } = req.body;

  if (!req.file || !userId) {
    return res.status(400).json({ error: 'Missing file or userId' });
  }

  // Save to a new table if needed, or return info
  return res.json({
    message: 'File uploaded successfully',
    fileUrl: `/uploads/${req.file.filename}`,
    userId,
  });
});
// ===== GET USER DATA FOR UPLOADS =====
app.get('/api/uploads/:userId', (req, res) => {
  const { userId } = req.params;
  const query = `SELECT * FROM user_uploads WHERE userId = ?`;

  db.all(query, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(rows);
  });
});
// ===== FINANCIAL SCORE CALCULATION =====
app.post('/financials', (req, res) => {
  const { income, expenses, debt } = req.body;

  const i = parseFloat(income);
  const e = parseFloat(expenses);
  const d = parseFloat(debt);

  if (isNaN(i) || isNaN(e) || isNaN(d)) {
    return res.status(400).json({ error: 'Invalid financial data' });
  }

  const profit = i - e;
  let score = 100;

  if (profit <= 0) score -= 40;
  if (d > profit * 0.5) score -= 30;
  if (e > i) score -= 20;

  score = Math.max(0, Math.min(score, 100));
  res.json({ score });
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}`);
});
