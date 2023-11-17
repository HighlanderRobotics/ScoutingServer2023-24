import { UUID } from 'crypto';
import { supabase } from './supabaseClient.js';

export const isScouted = async (req: any, res:any) => {
    const { data : scoutedData, error } = await supabase.from('scoutReport')
    .select('*')
    .eq('sourceTeam', req.query.sourceTeam)
    .eq('tournamentKey', req.query.tournamentKey)
    .eq('match', req.query.match)
    if(error)
    {
        res.status(400).send(error)
    }
    else
    {
        res.status(200).send(scoutedData)
    }

};
