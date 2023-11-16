import { supabase } from './supabaseClient.js';
import axios from "axios";

export const getMatches = async (req: any, res: any) => {
    let modifiedMatches: { key: string; team: number; ordinalNumber: number; }[] = []
    let tournamentKey = req.query.tournamentKey
        const { data : matches, error } = await supabase.from('matches')
            .select('*')
            .eq('tournamentKey', tournamentKey)
            .order('matchNumber');
        if (error) {
            res.status(400).send(error)  
            return          

        }
        else if (matches.length == 0) {
            res.status(400).send("tournament not found")    
            return        
        } else {
            let largestQm = matches[0].matchNumber
            matches.forEach((match) => {
                if (match.matchType === 'qm') {
                    // Remove tournamentKey from the matchKey as requested
                    match.matchKey = match.key.substring(tournamentKey.length + 1)
                    if (match.matchNumber > largestQm) {
                        largestQm = match.matchNumber
                    }
                }
            })

            
            matches.forEach((match) => {
                let temp = 0
                if (match.matchType !== 'qm') {

                    temp = match.matchNumber + largestQm
                }
                else {
                    temp = match.matchNumber
                }
                 
                modifiedMatches.push({ key: match.key, team: match.teamKey, ordinalNumber : temp })

            })

            res.status(200).send(modifiedMatches)

        }
}









