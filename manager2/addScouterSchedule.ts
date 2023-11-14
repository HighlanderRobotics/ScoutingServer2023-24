import { supabase } from './supabaseClient.js';
import axios from "axios";
export const addScouterSchedule = async (req: any, res: any) => {
    const { data, error } = await supabase.from('scouterSchedule')
                .insert([
                    { 'sourceTeam': req.body.sourceTeam, 'startMatch': req.body.startMatch, 'endMatch': req.body.endMatch, 'tournamentKey': req.body.tournamentKey, 'team1': req.body.team1, 'team2': req.body.team2, 'team3': req.body.team3, 'team4': req.body.team4, 'team5': req.body.team5, 'team6': req.body.team6},
                ])
            if (error) {
                res.status(400).send(error);
            }
            else{
                res.status(200).send("done inserting scouter schedule");
            }

}







