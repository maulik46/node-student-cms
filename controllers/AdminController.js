import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from "../models/Admin.js";

export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    const existing = await Admin.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already used' });

    const hashed = await bcrypt.hash(password, 10);

    const admin = await Admin.create({ name, email, password: hashed });

    res.status(201).json({ id: admin.id, name: admin.name, email: admin.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export async function login (req, res) {
  try {
    const { email, password } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};