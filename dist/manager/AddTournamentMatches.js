import Manager from './Manager.js';
import axios from 'axios';
class AddTournamentMatches extends Manager {
    static name = 'addTournamentMatches';
    constructor() {
        super();
    }
    runTask(key) {
        console.log(key);
        var url = 'https://www.thebluealliance.com/api/v3';
        var nonQM = 1;
        return new Promise(async (resolve, reject) => {
            let { data: match, error } = await this.supabase
                .from('tournaments')
                .select('*')
                .eq('tournamentKey', key);
            if (error) {
                console.log(error);
                return error;
            }
            if (match == undefined) {
                console.error(`Error with addMatches(): Tournament not found`);
                reject({
                    "result": `Error with addMatches(): Tournament not found`,
                    "customCode": 406
                });
            }
            else {
                for (var i = 0; i < match.length; i++) {
                    // Get matches in tournament
                    //tournament length is 1
                    axios.get(`${url}/event/${tournament[i].key}/matches/simple`, {
                        headers: { 'X-TBA-Auth-Key': process.env.KEY }
                    }).then(async (response) => {
                        // For each match in the tournament
                        for (var i = 0; i < response.data.length; i++) {
                            // console.log(response.data[i])
                            // console.log("-----------------------------")
                            if (response.data[i].comp_level == 'qm') {
                                //all teams in the match
                                var teams = [...response.data[i].alliances.red.team_keys, ...response.data[i].alliances.blue.team_keys];
                                let matchesString = ``;
                                //make matches with trailing _0, _1, _2 etc
                                for (var k = 0; k < teams.length; k++) {
                                    matchesString = matchesString + `('${response.data[i].key}_${k}', '${tournament[0].key}', ${response.data[i].match_number}, '${teams[k]}', '${response.data[i].comp_level}'), `;
                                    if (k == 5) {
                                        // Get rid of the trailing comma
                                        matchesString = matchesString.substring(0, matchesString.length - 2);
                                    }
                                }
                                //add to matches
                                const { data, error } = await this.supabase
                                    .from('match')
                                    .insert([
                                    { 'key': key, 'tournamentKey': tournamentKey, 'matchNumber': matchNumber, 'teamKey': teamKey, 'matchType': matchType },
                                ])
                                    .select();
                                if (error) {
                                    console.log(error);
                                    return error;
                                }
                            }
                            // } else if (response.data[i].comp_level == 'f') {
                            //     teams = [...response.data[i].alliances.red.team_keys, ...response.data[i].alliances.blue.team_keys]
                            //     let matchesString = ''
                            //     if (response.data[i].key.substring(response.data[i].key.length - 4, response.data[i].key.length - 2) == 'f2') {
                            //         var ourKey = response.data[i].key.substring(0, response.data[i].key.length - 4) + "gf" + response.data[i].match_number;
                            //         for (var k = 0; k < 6; k++) {
                            //             matchesString += `('${ourKey}_${k}', '${tournament[0].key}', ${response.data[i].key.substring(response.data[i].key.length - 1, response.data[i].key.length)}, '${teams[k]}', 'gf'), `
                            //             // console.log(matchesString)
                            //             if (k == 5) {
                            //                 // Get rid of the trailing comma
                            //                 matchesString = matchesString.substring(0, matchesString.length - 2)
                            //             }
                            //         }
                            //         sql = `INSERT INTO matches (key, tournamentKey, matchNumber, teamkey, matchType) VALUES ${matchesString}`
                            //         await this.whyGodInsert(sql)
                            //             .catch((err) => {
                            //                 if (err) {
                            //                     reject({
                            //                         'result': err,
                            //                         'customCode': 500
                            //                     })
                            //                 }
                            //             })
                            // } else {
                            //     for (var k = 0; k < 6; k++) {
                            //         matchesString = matchesString + `('${response.data[i].key.substring(0, response.data[i].key.length - 2)}_${k}', '${tournament[0].key}', ${response.data[i].key.substring(response.data[i].key.length - 3, response.data[i].key.length - 2)}, '${teams[k]}', '${response.data[i].comp_level}'), `
                            //         if (k == 5) {
                            //             // Get rid of the trailing comma
                            //             matchesString = matchesString.substring(0, matchesString.length - 2)
                            //         }
                            //     }
                            //     sql = `INSERT INTO matches (key, tournamentKey, matchNumber, teamkey, matchType) VALUES ${matchesString}`
                            //     await this.whyGodInsert(sql)
                            //         .catch((err) => {
                            //             if (err) {
                            //                 reject({
                            //                     'result': err,
                            //                     'customCode': 500
                            //                 })
                            //             }
                            //         })
                            // }
                            else {
                                var teams = [...response.data[i].alliances.red.team_keys, ...response.data[i].alliances.blue.team_keys];
                                var matchesString = ``;
                                for (var k = 0; k < 6; k++) {
                                    const data = `('${key}_em${nonQM}_${k}', '${key}', ${nonQM}, '${teams[k]}', 'em'), `;
                                    matchesString = matchesString + data;
                                    if (k == 5) {
                                        matchesString = matchesString.substring(0, matchesString.length - 2);
                                    }
                                }
                                nonQM += 1;
                                const { data, error } = await this.supabase
                                    .from('match')
                                    .insert([
                                    { 'key': key, 'tournamentKey': tournamentKey, 'matchNumber': matchNumber, 'teamKey': teamKey, 'matchType': matchType },
                                ])
                                    .select();
                                if (error) {
                                    console.log(error);
                                    return error;
                                }
                            }
                        }
                        resolve();
                    })
                        .catch((err) => {
                        if (err) {
                            reject({
                                "result": "Could not connect to tba api",
                                "customCode": 500
                            });
                        }
                    });
                }
            }
        });
    }
}
export default AddTournamentMatches;
//# sourceMappingURL=AddTournamentMatches.js.map