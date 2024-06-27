const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/templates', async (req, res) => {
    try {
        const response = await axios.get('https://partner.gupshup.io/partner/app/1daab562-c65b-4091-bf3f-30e4f8db0a9f/templates', {
            headers: {
                accept: 'application/json',
                token: 'sk_8b0a60fd634144b9ac4f074a5e65e8ef'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching templates:', error);
        res.status(500).send('Error fetching templates');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
