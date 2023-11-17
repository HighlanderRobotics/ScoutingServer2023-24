import { UUID } from 'crypto';
import { supabase } from './supabaseClient.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


export const addTournamentMatches = async (req: any, res: any) => {
    var url = 'https://www.thebluealliance.com/api/v3'
    var nonQM = 1

    const { data: tournamentRow, error } = await supabase.from('tournaments')
        .select('*')
        .eq('tournamentKey', req.query.tournamentKey)
    if (error) {
        res.status(400).send(error)
        return
    }
    if (tournamentRow == null || tournamentRow.length == 0) {
        res.status(400).send("tournament not found")
        return
    } else {
        let key = req.query.tournamentKey

        axios.get(`${url}/event/${key}/matches/`, {
            headers: { 'X-TBA-Auth-Key': process.env.KEY }
        }).then(async response => {
            // For each match in the tournament
            for (var i = 0; i < response.data.length; i++) {
                // console.log(response.data[i])
                // console.log("-----------------------------")
                if (response.data[i].comp_level == 'qm') {
                    //all teams in the match
                    var teams = [...response.data[i].alliances.red.team_keys, ...response.data[i].alliances.blue.team_keys]
                    let matchesString = ``
                    //make matches with trailing _0, _1, _2 etc
                    for (var k = 0; k < teams.length; k++) {
                        matchesString = matchesString + `('${response.data[i].key}_${k}', '${key}', ${response.data[i].match_number}, '${teams[k]}', '${response.data[i].comp_level}'), `
                        let currMatchKey = `${response.data[i].key}_${k}', '${key}`

                        const { data: tournamentRow, error } = await supabase.from('tournaments')
                            .insert([{ "key": currMatchKey, "tournamentKey": key, "matchNumber": response.data[i].match_number, "teamKey": teams[k], "matchType": response.data[i].comp_level}])

                        if (error) {
                            res.status(400).send(error)
                            return
                        }
                    }

                    // var sql = `INSERT INTO matches (key, tournamentKey, matchNumber, teamKey, matchType) VALUES ${matchesString}`
                    // //add to matches
                    // await this.whyGodInsert(sql)
                    //     .catch((err) => {
                    //         if (err) {
                    //             reject({
                    //                 "result": err,
                    //                 "customCode": 500
                    //             })
                    //         }
                    //     })
                }

                else {
                    var teams = [...response.data[i].alliances.red.team_keys, ...response.data[i].alliances.blue.team_keys]
                    for (var k = 0; k < 6; k++) {
                        let currMatchKey = `${key}_em${nonQM}_${k}`

                        const { data: tournamentRow, error } = await supabase.from('tournaments')
                            .insert([{ "key": currMatchKey, "tournamentKey": key, "matchNumber": nonQM, "teamKey": teams[k], "matchType": "em" }])

                        if (error) {
                            res.status(400).send(error)
                            return
                        }

                    }
                    nonQM += 1

                }

            }
            res.status(200).send("tournament matches added")
            return
        })

            .catch((err) => {
                if (err) {
                    res.status(500).send(err)
                    return

                }
            })
    }
}


