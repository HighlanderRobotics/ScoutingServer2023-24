import { supabase } from './supabaseClient.js';
import axios from "axios";
import { deleteData } from './deleteData.js';
export const addData = async (req: any, res: any) => {
    let matchData = req.body.data
    let sourceTeam = req.query.sourceTeam
    let tournamentKey = req.query.tournamentKey
    let team = req.query.team
    let match = req.query.match


    try {
        const { data, error } = await supabase.from('scoutReport')
            .insert([
                { 'team': team, 'sourceTeam': sourceTeam, 'tournamentKey': tournamentKey, 'match': match, 'scouterUuid': matchData.scouterUuid, 'startTime': matchData.startTime, 'notes': matchData.notes, 'links': matchData.links, 'robotRole': matchData.robotRole, 'autoChallengeResult': matchData.autoChallengeResult, 'challengeResult': matchData.challengeResult, 'penaltyCard': matchData.penaltyCard, 'driverAbility': matchData.driverAbility },
            ])
            .select()
        if (error) {
            console.log(error)
            return error
        }
        let events = matchData.events
        for (let i = 0; i < events.length; i++) {
            let points = 0
            let time = events[i][0]
            let position = events[i][2]

            if (events[i][1] === 2) {
                let level = Math.ceil(position / 3)
                if (time <= 17) {
                    if (level === 1) {
                        points = 3
                    }
                    else if (level === 2) {
                        points = 4
                    }
                    else if (level === 3) {
                        points = 6
                    }
                }
                else {
                    if (level === 1) {
                        points = 2
                    }
                    else if (level === 2) {
                        points = 3
                    }
                    else if (level === 3) {
                        points = 5
                    }
                }
            }
            {


                const { data, error } = await supabase.from('events')
                    .insert([
                        { 'team': team, 'tournamentKey': tournamentKey, 'match': matchData.match, 'sourceTeam': matchData.sourceTeam, 'time': events[i][0], 'action': events[i][1], 'position': position, 'points': points },
                    ])
                if (error) {
                    res.status(400).send(error)
                }
            }
        }
        res.status(200).send('done editing data')

    }
    catch (err) {
        if (err) {
            console.log(err)

        }
    }

}









