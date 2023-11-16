import { supabase } from './supabaseClient.js';
export const addRegisteredTeam = async (req: any, res: any) => {
    const { data, error } = await supabase
        .from('teamsRegistered')
        .insert([
            { 'team': req.query.team, 'teamCode': ('0000' + Math.floor(Math.random() * 10000)).slice(-4), 'email' : req.body.email }
        ])
    if (error) {
        res.status(400).send(error)
    }
    res.status(200).send('registed team added')
};
