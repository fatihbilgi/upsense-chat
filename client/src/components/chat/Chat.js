import React, { useState, useEffect } from 'react';
import { getTemplates, sendMessage } from '../../api/gupshup';

const Chat = () => {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const templates = await getTemplates();
                setTemplates(templates);
            } catch (error) {
                console.error('Error fetching templates:', error);
            }
        };
        fetchTemplates();
    }, []);

    const handleSend = async () => {
        try {
            await sendMessage(phoneNumber, selectedTemplate);
            console.log('Message sent successfully');
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message');
        }
    };

    return (
        <div>
            <h1>Chat Application</h1>
            <div>
                <label>Phone Number:</label>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <div>
                <label>Select Template:</label>
                <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                >
                    <option value="">Select a template</option>
                    {templates.map(template => (
                        <option key={template.id} value={template.data}>
                            {template.elementName}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleSend}>Send Message</button>
        </div>
    );
};

export default Chat;
