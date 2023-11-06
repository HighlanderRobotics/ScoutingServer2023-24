import Manager from './Manager.js';
import axios from 'axios';
import isFullyScouted from './isFullyScouted.js';
// import checkNewMatch from '../analysis/checkNewMatch.ts'
class AddScoutReport extends Manager {
    static name = 'addScoutReport';
    constructor() {
        super();
    }
    async runTask(sourceTeam, tournamentKey, data, tournamentSettings, sourceTeamSettings) {
        let localMatchKey = `${tournamentKey}_${data.match}`;
        let matchKey = null;
        matchKey = match.key;
        try {
            const { data, error } = await this.supabase
                .from('scoutReport')
                .insert([
                { 'team': data.team, 'sourceTeam': sourceTeam, 'tournamentKey': data.tournamentKey, 'match': data.match, 'scouterUuid': data.scouterUuid, 'statTime': data.startTime, 'notes': data.notes, 'links': data.links, 'robotRole': data.robotRole, 'autochallengeResult': data.autoChallengeResult, 'challengeResult': data.challengeResult, 'penaltyCard': data.penaltyCard, 'driverAbility': data.driverAbility },
            ])
                .select();
            if (error) {
                console.log(error);
                return error;
            }
            let events = data.events;
            for (let i = 0; i < events.length; i++) {
                let points = 0;
                if (events[i][1] === 2) {
                    level = ceil(position / 3);
                    if (time <= 17) {
                        if (level === 1) {
                            points = 3;
                        }
                        else if (level === 2) {
                            points = 4;
                        }
                        else if (level === 3) {
                            points = 6;
                        }
                    }
                    else {
                        if (level === 1) {
                            points = 2;
                        }
                        else if (level === 2) {
                            points = 3;
                        }
                        else if (level === 3) {
                            points = 5;
                        }
                    }
                }
                const { data1, error1 } = await this.supabase
                    .from('events')
                    .insert([
                    { 'team': data.team, 'tournamentKey': data.tournamentKey, 'match': data.match, 'sourceTeam': data.sourceTeam, 'time': events[i][0], 'action': data.action, 'position': data.position, 'points': points },
                ])
                    .select();
                if (error1) {
                    console.log(error1);
                    return error1;
                }
            }
        }
        catch {
            if (err) {
                console.log(err);
                reject({
                    "results": err,
                    "customCode": 500,
                    "collectionApp": "SQLITE UNIQUE ERROR, run node resetDataTable.js"
                });
            }
        }
        await new checkNewMatch(team, data.scouterUuid, data.match, tournamentKey, tournamentSettings, sourceTeamSettings).runAnalysis();
        console.log(`Data entry complete for ${match.key}`);
        const { data1, error } = await this.supabase
            .from('matches')
            .select('*')
            .eq('teamKey', teamKey)
            .eq('tournamentKey', tournamentKey)
            .eq('SUBSTRING(key, 1, LENGTH(key)-1)', `${localMatchKey}_`);
        if (error) {
            console.log(error);
            return error;
        }
        const { data2, error1 } = await this.supabase
            .from('matches')
            .select('matchNumber')
            .eq('key', data.match);
        if (error1) {
            console.log(error1);
            return error1;
        }
        else if (row == undefined || row.length === 0) {
            console.log("can't find match number");
        }
        resolve("done");
    }
}
// console.log(gameDependent)
export default AddScoutReport;
//# sourceMappingURL=AddScoutReport.js.map