import { supabase } from './supabaseClient.js';
export const rejectRegisteredTeam = async (req: any, res: any) => {
    const { data, error } = await supabase
        .from('teamsRegistered')
        .update(
            {'fullyVerified' : false }
        )
        .eq('team', req.query.team)
    if (error) {
        res.status(400).send(error)
    }
    else
    {
        res.status(200).send('rejestering team rejected')

    }
};
