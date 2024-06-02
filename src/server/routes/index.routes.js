import express from 'express';

const router = express.Router();

router.get('/index', async (req, res) => {
    res.json({"message": "Obvio hp"});
});

export default router;
