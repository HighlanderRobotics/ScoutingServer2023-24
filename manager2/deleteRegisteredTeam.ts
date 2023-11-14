import { supabase } from './supabaseClient.js';
export const deleteRegisteredTeam = async (req: any, res: any) => {
    let { data, error } = await supabase.from('teamsRegistered')
        .delete()
        .eq('team', req.query.team)
    if (error) {
        res.status(400).send(error)
    }
    else {
        res.status(200).send('registered team deleted')
    }
};
