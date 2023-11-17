import { supabase } from './supabaseClient.js';
export const approveRegisteredTeam = async (req : any, res : any) => {
    console.log(req.query.team)
    const { data, error } = await supabase.from('teamsRegistered')
        .update(
        { 'fullyVerified': true, "teamCode": Math.floor(1000 + Math.random() * 9000) })
        .eq('team', req.query.team)

    if (error) {
        res.status(400).send(error);
    }
    else {
        res.status(200).send('registed team added');
    }
};
