// backend/server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./config/db');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'your-secret-key'; // Change this to a secure secret key

app.use(cors({
    origin: ['https://soss.site', 'http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Register new user
app.post('/api/register', async (req, res) => {
    try {
        console.log('Registration request received:', req.body)
        const { username, email, password } = req.body

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' })
        }

        // Check if user already exists
        const existingUser = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $2',
            [username, email]
        )

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Username or email already exists' })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Insert new user
        const result = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        )

        console.log('User registered successfully:', result.rows[0])
        res.status(201).json(result.rows[0])
    } catch (err) {
        console.error('Registration error:', err)
        res.status(500).json({ error: err.message })
    }
})

// Login user
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Update last login
        await pool.query(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
            [user.id]
        );

        const token = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user's services
app.get('/api/services', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM services WHERE user_id = $1 ORDER BY created_at DESC',
            [req.user.id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add new service
app.post('/api/services', authenticateToken, async (req, res) => {
    try {
        const { name, url, icon } = req.body;
        const result = await pool.query(
            'INSERT INTO services (user_id, name, url, icon) VALUES ($1, $2, $3, $4) RETURNING *',
            [req.user.id, name, url, icon]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update service
app.put('/api/services/:id', authenticateToken, async (req, res) => {
    try {
        const { name, url, icon } = req.body;
        const result = await pool.query(
            'UPDATE services SET name = $1, url = $2, icon = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 AND user_id = $5 RETURNING *',
            [name, url, icon, req.params.id, req.user.id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Service not found' });
        }
        
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete service
app.delete('/api/services/:id', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM services WHERE id = $1 AND user_id = $2 RETURNING *',
            [req.params.id, req.user.id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Service not found' });
        }
        
        res.json({ message: 'Service deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});