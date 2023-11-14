import { supabase } from './supabaseClient.js';
import axios from "axios";
export const getScouterSchedule = async (req: any, res: any) => {

    let { data: scouterSchedule, error } = await supabase.from('scouterSchedule')
        .select('*')
        .eq('sourceTeam', req.query.sourceTeam)
        .eq('tournamentKey', req.query.tournamentKey)
    if (error) {
        res.status(400).send(error)
    }
    else {
        res.status(200).send(scouterSchedule)
    }
}







