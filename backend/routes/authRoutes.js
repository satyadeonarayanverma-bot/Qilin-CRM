const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { generateToken } = require('../utils/auth');

const router = express.Router();
const prisma = new PrismaClient();

// @desc    Register a new Organization (Tenant + Super Admin)
// @route   POST /api/auth/register-org
router.post('/register-org', async (req, res) => {
    const { name, email, password, company_name } = req.body;

    try {
        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 1. Create Tenant
        const tenant = await prisma.tenant.create({
            data: {
                company_name,
                plan: 'FREE' // Default plan
            }
        });

        // 2. Encrypt Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create Super Admin User
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                tenant_id: tenant.id,
                role: 'SUPER_ADMIN',
                associate_ref_id: `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}` // Generate unique ref ID
            }
        });

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            tenant_id: user.tenant_id,
            token: generateToken(user)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Login User
// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                tenant_id: user.tenant_id,
                token: generateToken(user)
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
