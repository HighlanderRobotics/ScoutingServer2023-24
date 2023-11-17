import { supabase } from './supabaseClient.js';
export const addRegisteredTeam = async (req: any, res:any) => {
    const { data, error } = await supabase.from('teamsRegistered')
            .insert([
                { 'team': req.query.team, 'username': req.body.username, 'email': req.body.email },
            ])
        if (error) {
            res.status(400).send(error)
            return
        }
        //send email
        res.status(200).send('tournament added')
        
};
