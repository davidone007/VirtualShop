import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send(user);
});

export default router;