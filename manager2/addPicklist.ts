import { UUID } from 'crypto';
import { supabase } from './supabaseClient.js';

export const addPicklist = async (req: any, res:any) => {
    let { data: sharedPicklist, error } = await supabase.from('sharedPicklist')
    .insert([{'name' : req.body.name, 'team' : req.query.team, 'username' : req.query.username, 'avgTotal' : req.body.avgTotal}])
        if(error){
            res.status(400).send(error)
            return
        }
        else
        {
            res.status(200).send("added picklist")
        }
};
