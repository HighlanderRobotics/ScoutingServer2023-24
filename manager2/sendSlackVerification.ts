import { WebClient } from '@slack/web-api';
import { UUID } from 'crypto';
import { supabase } from './supabaseClient.js';
import dotenv from 'dotenv';
dotenv.config();


export const sendSlackVerification = async (req: any, res: any) => {
    const body = {
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Received a new team wanting to register"
                }
            },
            {
                "type": "divider"
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `*Name*\n${req.query.team}\n\n*Website*\n${req.body.website || '_None_'}`
                }
            },
            {
                "type": "actions",
                "elements": [
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Approve",
                            "emoji": true
                        },
                        "value":`approve_${req.query.team}`,
                        "action_id": "verify_action" 
                    },
                    {
                        "type": "button",
                        "text": {
                            "type": "plain_text",
                            "text": "Reject",
                            "emoji": true
                        },
                        "value": `reject_${req.query.team}`,
                        "action_id": "reject_action"
                    }
                ]
            }
        ]
    }
    if (process.env.SLACK_WEBHOOK == undefined) {
        res.status(500).send("We weren't able to get your message through.");
    }
    else {
        const response = await fetch(process.env.SLACK_WEBHOOK, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            console.log("here")
            res.status(500).send("We weren't able to get your message through.");
        }
        else
        {
            res.status(200).send('Verification message sent')
        }
    }

};
