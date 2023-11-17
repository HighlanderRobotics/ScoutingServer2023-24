import { supabase } from './supabaseClient.js';
export const newUser = async (req: any, res: any) => {
    let { data: teamRegistered, error } = await supabase.from('teamsRegistered')
        .select('*')
        .eq('team', req.query.team)
        

    if (error) {
        res.status(400).send(error)
    }
    else {
        if(teamRegistered?.length != null && teamRegistered.length >= 1)
        {
            if(teamRegistered[0].emailVerified && teamRegistered[0].fullyVerified)
            {
                res.status(200).send({"isTeamRegisted" : true, "message" : teamRegistered[0].username + " fully registered your team"})

            }
            res.status(200).send({"isTeamRegisted" : false, "message" : teamRegistered[0].username + " is registering on behalf of your team"})
        }
        else
        {
            res.status(200).send({"isTeamRegisted" : false, "message" : "nobody has registered your team"})
        }
    }
};
