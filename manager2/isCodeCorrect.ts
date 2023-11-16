import { UUID } from 'crypto';
import { supabase } from './supabaseClient.js';

export const isCodeCorrect = async (req: any, res:any) => {
    const { data : rows, error } = await supabase.from('teamsRegistered')
    .select('*')
    .eq('team', req.query.team)
    .eq('teamCode', req.query.teamCode)
        if(error){
            res.status(400).send(error)
        }
        else
        {
            if(rows != null && rows.length >= 1)
            {            
                res.status(200).send({"isCodeCorrect" : true})
            }
            else
            {
                res.status(200).send({"isCodeCorrect" : false})
            }
        }
};
