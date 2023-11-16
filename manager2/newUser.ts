import { supabase } from './supabaseClient.js';
export const newUser = async (req: any, res: any) => {
    let { data: teamRegistered, error } = await supabase.from('teamsRegistered')
        .select('*')
        .eq('team', req.query.team)

    if (error) {
        res.status(400).send(error)
    }
    else {
        if(teamRegistered?.length != null && teamRegistered.length >= 1)
        {
            res.status(200).send({"isTeamRegisted" : true})
        }
        else
        {
            res.status(200).send({"isTeamRegisted" : false})
        }
    }
};
