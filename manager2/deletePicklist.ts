import { UUID } from 'crypto';
import { supabase } from './supabaseClient.js';

export const deletePicklist = async (req: any, res:any) => {
    const { data, error } = await supabase.from('sharedPicklist')
    .delete()
    .eq('picklistUuid', req.query.picklistUuid)
        if(error){
            res.status(400).send(error)
        }
        else
        {
            res.status(200).send("deleted picklist")
        }
};
