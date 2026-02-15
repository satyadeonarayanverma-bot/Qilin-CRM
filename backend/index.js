const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');
const aiRoutes = require('./routes/aiRoutes');

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/ai', aiRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('Qilin CRM API is running');
});

// Basic middleware for tenant context (placeholder)
app.use((req, res, next) => {
    // In future, extract tenant_id from JWT
    next();
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
