import { WebClient } from '@slack/web-api';
import { UUID } from 'crypto';
import { supabase } from './supabaseClient.js';

const token = 'your-oauth-access-token'; 
const slackClient = new WebClient(token);

export const sendSlackVerification = async (req: any, res: any) => {
    try {
        const result = await slackClient.chat.postMessage({
            channel: 'your-channel-id', 
            text: "Team " + req.query.team + " wants to register and has given the website " + req.query.website
        });

        console.log('Message sent: ', result.ts);
    } catch (error) {
        console.error('Error sending message: ', error);
        res.status(500).send('Error sending Slack message');
        return;
    }

    res.status(200).send('Message sent');
};
