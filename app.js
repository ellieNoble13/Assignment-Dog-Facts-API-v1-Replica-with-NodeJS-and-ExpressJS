import express from 'express'
const app = express();
const port = 3000;

import dogFacts from './dog_facts.js';


app.get('/facts', (req, res) => {
    try {
        const count = req.query.number;

        if (!count) {
            return res.json(dogFacts);
        }
        const numCount = parseInt(count);

        if (isNaN(numCount) || numCount <= 0) {
            return res.status(400).json({error: "Number must be a positive integer"});
        }

        const limitedFacts = dogFacts.slice(0, numCount);
        res.json(limitedFacts);

    } catch (err) {
        res.status(500).json({error: "Uh oh! Something went wrong with the server"});
    }
});

app.listen(port, () => {
    console.log(`Dog Facts API is live at http://localhost:${port}`);
});
