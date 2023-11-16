import { supabase } from './supabaseClient.js';
export const addTournament = async (req: any, res:any) => {
    const { data, error } = await supabase.from('tournaments')
            .insert([
                { 'tournamentKey': req.query.tournamentKey, 'name': req.body.name, 'location': req.body.location, 'date': req.body.date },
            ])
        if (error) {
            res.status(400).send(error)
            return
        }
        res.status(200).send('tournament added')
};
