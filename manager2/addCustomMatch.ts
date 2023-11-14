import { supabase } from './supabaseClient.js';
import axios from "axios";
export const addCustomMatch = async (req: any, res: any) => {
    let teams = req.body.teams
    let tournamentKey = req.body.tournamentKey
    let matchType = req.body.matchType
    let matchNumber = req.body.matchNumber
    for (let i = 0; i < teams.length; i++) {
        let currKey = tournamentKey + '_' + matchType + matchNumber + '_' + i
        let currTeamKey = "frc" + teams[i]
        let { data: match, error } = await supabase.from('matches')
            .select('*')
            .eq('matchNumber', matchNumber)
            .eq('tournamentKey', tournamentKey)
            .eq('matchType', matchType)
            .eq('teamKey', currTeamKey)
        if (error) {
            res.status(400).send(error)
        }

        if (match == null || match.length > 0) {
            const { error } = await supabase.from('matches')
                .delete()
                .eq('matchNumber', matchNumber)
                .eq('tournamentKey', tournamentKey)
                .eq('matchType', matchType)
                .eq('teamKey', currTeamKey)

            if (error) {
                console.log(error)
                return error
            }
        }
        {
            const { data, error } = await supabase.from('matches')
                .insert([
                    { 'key': currKey, 'tournamentKey': tournamentKey, 'matchNumber': matchNumber, 'teamKey': currTeamKey, 'matchType': matchType }
                ])
            if (error) {
                res.status(400).send(error)
            }
        }
    }
    res.status(200).send("done adding custom matches");


}









