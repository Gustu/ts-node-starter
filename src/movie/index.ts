import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.json({movies: []})
});

router.post('/', (req, res) => {
    res.json({name: 'Back To The Future'});
});

export default router;
