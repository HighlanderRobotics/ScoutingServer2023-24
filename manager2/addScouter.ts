import { UUID } from 'crypto';
import { supabase } from './supabaseClient.js';

export const addScouter = async (req: any, res:any) => {
    const { data, error } = await supabase.from('scouters')
            .insert([
                { 'scouterUuid': req.body.scouterUuid, 'team': req.query.team, 'name': req.body.name },
            ])
            .select()
        if(error){
            res.status(400).send(error)
        }
        else
        {
            res.status(200).send("added scouter")
        }
};
