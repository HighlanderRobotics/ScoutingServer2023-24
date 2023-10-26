import Manager from './Manager.js'
import axios from 'axios';
import isFullyScouted from'./isFullyScouted.js';

class AddScoutReport extends Manager {
    static name = 'addScoutReport'

    constructor() {
        super()
    }

    runTask(teamKey, tournamentKey, data) {
        let localMatchKey = `${tournamentKey}_${data.matchKey}`

        let sql = `
        SELECT * FROM matches 
        WHERE
            teamKey = '${teamKey}'
            AND tournamentKey = '${tournamentKey}'
            AND SUBSTRING(key, 1, LENGTH(key)-1) = '${localMatchKey}_'
        `
        var sqlMatchNumber = `SELECT matchNumber
        FROM matches
        WHERE matches.key = ?`

        let matchKey = null

        // console.log(sql)

        return new Promise((resolve, reject) => {

            Manager.db.get(sql, (err, match) => {
                if (err) {

                    console.error(err)


                    reject({

                        "result": err,

                        "customCode": 500
                    })
                } else if (match != undefined) {
                    try {
                        matchKey = match.key
                        this.insertNonEventData(data.tournamentKey, data.match, data.scouterUuid, data.startTime, data.notes, data.links, data.robotRule, data.autoChallengeResult, data.challengeResult, data.penaltyCard, data.driverAbility)
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
                            this.insertEventData(data.team, data.tournamentKey, data.match, data.sourceTeam, events[i][0], data.position, data.action, points)
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
                    Manager.db.all(sqlMatchNumber, [matchKey], async (err, row) => {
                        if (err) {
                            console.log(err)
                            reject(err)
                        }
                        else if (row == undefined || row.length === 0) {
                            console.log("can't find match number")
                        }

                        resolve("done")


                    })

                } else {
                    console.log(`Couldn't find match for:`)
                    reject({
                        "results": `Match doesn't exist`,
                        "customCode": 406
                    })
                }
            })
        })
    }

    async insertNonEventData(tournamentKey, match, scouterName, startTime, notes, links, robotRule, autoChallengeResult, challengeResult, penaltyCard, driverAbility) {
        try {
            let sql = `INSERT INTO nonEventData (tournamentKey, match, scouterName, startTime, notes, links, robotRule, autoChallengeResult, challengeResult, penaltyCard, driverAbility) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
            return new Promise((resolve, reject) =>
                Manager.db.get(sql, [tournamentKey, match, scouterName, startTime, notes, links, robotRule, autoChallengeResult, challengeResult, penaltyCard, driverAbility], (err, row) => {
                    if (err) {
                        console.error(err)

                        reject({
                            "result": err,

                            "customCode": 500
                        })
                    }
                    else {
                        result("done")
                    }
                })
            )
        }
        catch (err) {
            return (err)
        }
    }
    async insertEventData(team, tournamentKey, match, sourceTeam, time, position, action, points) {
        try {
            let sql = `INSERT INTO events (team, tournamenyKey, match, sourceTeam, time, position, action, points) VALUES (?, ?, ?, ?, ?, ?, ?)`
            return new Promise((resolve, reject) =>
                Manager.db.get(sql, [team, tournamentKey, match, sourceTeam, time, position, action, points], (err, row) => {
                    if (err) {
                        console.error(err)

                        reject({
                            "result": err,

                            "customCode": 500
                        })
                    }
                    else {
                        result("done")
                    }
                })
            )
        }
        catch (err) {
            return (err)
        }
    }
}

// console.log(gameDependent)

export default AddScoutReport