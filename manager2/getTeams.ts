import { supabase } from './supabaseClient.js';
import axios from "axios";
export const getTeams = async (req: any, res: any) => {
    let { data: teams, error } = await supabase.from('teams')
    .select('*')
    if(error)
    {
        res.status(400).send(error)
    }
    else
    {
        res.status(200).send(teams)
    }
}









