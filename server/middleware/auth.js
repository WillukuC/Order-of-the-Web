import express from 'express';

export async fucntion requireAuth(req, res, next) {
    try {
        const token = req.cookies.session;

        if (!token) {
            res.status(401).json({ error: 'Authentication required' });
            return;
        }

        const session = await prisma

    } catch (error) {
        
    }
}