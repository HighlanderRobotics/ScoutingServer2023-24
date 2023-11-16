import { UUID } from 'crypto';
import { supabase } from './supabaseClient.js';

export const deleteData = async (req: any, res: any) => {
    const scouterUuid = req.query.scouterUuid;
    const match = req.query.match;
    const tournamentKey = req.query.tournamentKey;
    const sourceTeam = req.query.sourceTeam;

    let { data, error } = await supabase.from('scoutReport')
        .delete()
        .eq("scouterUuid", scouterUuid)
        .eq("match", match)
        .eq('tournamentKey', tournamentKey)
        .eq('sourceTeam', sourceTeam)
    if (error) {
        res.status(400).send(error)
    }
    {

        let { data, error } = await supabase.from('events')
            .delete()
            .eq("scouterUuid", scouterUuid)
            .eq("match", match)
            .eq('tournamentKey', tournamentKey)
            .eq('sourceTeam', sourceTeam)

        if (error) {
            res.status(400).send(error)
            return
        }
        res.status(200).send('done deleting data');

    }
    



};
