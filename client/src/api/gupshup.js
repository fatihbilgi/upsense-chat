// src/api/gupshup.js

import axios from 'axios';

export const getTemplates = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/templates');
        if (response.data.status === 'success') {
            return response.data.templates;
        } else {
            throw new Error('Failed to fetch templates');
        }
    } catch (error) {
        console.error('Error fetching templates:', error);
        throw error;
    }
};

export const sendMessage = async (phoneNumber, messageText) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('message', `${messageText}`);
    encodedParams.set('channel', 'whatsapp');
    encodedParams.set('source', '908503770269');
    encodedParams.set('destination', phoneNumber);
    encodedParams.set('src.name', 'CwWpApp2');

    const options = {
        method: 'POST',
        url: 'https://api.gupshup.io/wa/api/v1/msg',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
            apikey: 'vgpbqiq1fwemgwrsgm2l4zhv8xpcmmlo'
        },
        data: encodedParams,
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};