import Manager from './Manager.js'
import axios from 'axios';
import isFullyScouted from './isFullyScouted.js';

class AddScoutReport extends Manager {
    static name = 'addScoutReport'

    constructor() {
        super()
    }

    async runTask(teamKey, tournamentKey, data) {
        let localMatchKey = `${tournamentKey}_${data.matchKey}`
        let matchKey = null

        if (err) {
            console.error(err)
            reject({
                "result": err,
                "customCode": 500
            })
        }
        else if (match != undefined) {
            matchKey = match.key
            try {
                const { data, error } = await supabase
                    .from('scoutReport')
                    .insert([
                        { 'tournamentKey': data.tournamentKey, 'match': data.match, 'scouterName': data.scouterName, 'statTime': data.startTime, 'notes': data.notes, 'links': data.links, 'robotRule': data.robotRule, 'autochallengeResult': data.autoChallengeResult, 'challengeResult': data.challengeResult, 'penaltyCard': data.penaltyCard, 'driverAbility': data.driverAbility },
                    ])
                    .select()
                if (error) {
                    console.log(error)
                    return error
                }
                let events = data.events
                for (let i = 0; i < events.length; i++) {
                    let points = 0
                    if (events[i][1] === 2) {
                        level = ceil(position / 3)
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
                    const { data1, error1 } = await supabase
                        .from('events')
                        .insert([
                            { 'team': data.team, 'tournamentKey': data.tournamentKey, 'match': data.match, 'sourceTeam': data.sourceTeam, 'time': events[i][0], 'action': data.action, 'position': data.position, 'points': points },
                        ])
                        .select()
                    if (error1) {
                        console.log(error1)
                        return error1
                    }
                }
            }
            catch {
                if (err) {
                    console.log(err)
                    reject({
                        "results": err,
                        "customCode": 500,
                        "justForJacob": "SQLITE UNIQUE ERROR, run node resetDataTable.js"
                    })
                }
            }

            console.log(`Data entry complete for ${match.key}`)
            const { data, error } = await supabase
                .from('matches')
                .select('*')
                .eq('teamKey', teamKey)
                .eq('tournamentKey', tournamentKey)
                .eq('SUBSTRING(key, 1, LENGTH(key)-1)', `${localMatchKey}_`)
                .from('matches')
                .select('matchNumber')
                .eq('key', matchKey);
            if (error) {
                console.log(error)
                return error
            }
            else if (row == undefined || row.length === 0) {
                console.log("can't find match number")
            }

            resolve("done")

        } else {
            console.log(`Couldn't find match for:`)
            reject({
                "results": `Match doesn't exist`,
                "customCode": 406
            })
        }
    }
}

// console.log(gameDependent)

export default AddScoutReport