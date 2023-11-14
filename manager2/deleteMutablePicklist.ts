import { UUID } from 'crypto';
import { supabase } from './supabaseClient.js';

export const deleteMutablePicklist = async (req: any, res:any) => {
    const { data , error } = await supabase.from('mutablePicklist')
    .delete()
    .eq('mutablePicklistUuid', req.query.mutablePicklistUuid)
        if(error){
            res.status(400).send(error)
        }
        else
        {
            res.status(200).send("deleted mutable picklist")
        }
};
