import { supabase } from './supabaseClient.js';
import axios from "axios";

export const getTeamsInTournament = async (req: any, res: any) => {
    const { data: teams, error } = await supabase
        .from('matches')
        .select('teamKey')
        .eq('tournamentKey', req.query.tournamentKey)
        .order('teamKey', { ascending: true })
    if (error) {
        res.status(400).send(error)
    }
    else {
        res.status(200).send(teams)
    }
}









