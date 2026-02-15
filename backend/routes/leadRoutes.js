const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();
const prisma = new PrismaClient();

// @desc    Get all leads for the tenant
// @route   GET /api/leads
router.get('/', protect, async (req, res) => {
    try {
        const leads = await prisma.lead.findMany({
            where: {
                tenant_id: req.tenant_id // Enforce tenant isolation
            },
            orderBy: { created_at: 'desc' }
        });
        res.json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a new lead
// @route   POST /api/leads
router.post('/', protect, async (req, res) => {
    const { name, phone, email, course_interest, source } = req.body;

    try {
        const lead = await prisma.lead.create({
            data: {
                tenant_id: req.tenant_id,
                name,
                phone,
                email,
                course_interest,
                source,
                status: 'NEW',
                assigned_to_id: req.user.id // Auto-assign to creator initially (can be changed)
            }
        });
        res.status(201).json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update lead status
// @route   PUT /api/leads/:id/status
router.put('/:id/status', protect, async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    try {
        // Verify lead belongs to tenant
        const lead = await prisma.lead.findFirst({
            where: { id, tenant_id: req.tenant_id }
        });

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        const updatedLead = await prisma.lead.update({
            where: { id },
            data: { status }
        });

        res.json(updatedLead);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
