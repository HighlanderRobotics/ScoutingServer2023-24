import { UUID } from 'crypto';
import { supabase } from './supabaseClient.js';

export const getPicklists = async (req: any, res:any) => {
    const { data : picklists, error } = await supabase.from('sharedPicklist')
    .select('*')
    .eq('team', req.query.team)
        if(error){
            res.status(400).send(error)
        }
        else
        {
            res.status(200).send(picklists)
        }
};
