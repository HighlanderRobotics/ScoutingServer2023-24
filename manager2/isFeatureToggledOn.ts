import { UUID } from 'crypto';
import { supabase } from './supabaseClient.js';

export const isFeatureToggledOn = async (req: any, res:any) => {
    const { data : row, error } = await supabase.from('featureToggles')
    .select('*')
    .eq('feature', req.query.feature)
        if(error){
            res.status(400).send(error)
        }
        else
        {
            if(row == null || row.length == 0)
            {
                res.status(400).send("feature doesn't exist")
            }
            else
            {
                res.status(200).send(row[0].isUsed)
            }
        }
};
