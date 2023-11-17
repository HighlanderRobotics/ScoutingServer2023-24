import { supabase } from './supabaseClient.js';
export const checkRegistrationProgress = async (req: any, res: any) => {
    const { data : verificationProgress, error } = await supabase.from('teamsRegistered')
        .select('*')
        .eq('team', req.query.team)
        
    if (error) {
        res.status(400).send(error)
    }
    else
    {
        if(verificationProgress == null || verificationProgress.length == 0)
        {
            res.status(200).send({"emailVerification" : false, "fullyVerified" : false})
        }
        else
        {
            res.status(200).send({"emailVerification" : verificationProgress[0].emailVerified, "fullyVerified" : verificationProgress[0].fullyVerified})

        }
    }
};
