import { supabase } from './supabaseClient.js';
export const getRegisteredTeam = async (req: any, res: any) => {
    let { data: teamRegistered, error } = await supabase.from('teamsRegistered')
        .select('*')
        .eq('team', req.query.team)

    if (error) {
        res.status(400).send(error)
    }
    else {
        res.status(200).send(teamRegistered)
    }
};
