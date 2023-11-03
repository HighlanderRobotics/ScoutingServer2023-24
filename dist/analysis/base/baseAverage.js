import BaseAnalysis from '.././BaseAnalysis.js';
import * as simpleStats from 'simple-statistics';
// Now you can use methods from simpleStats like so:
// let mean = simpleStats.mean([1, 2, 3]);
class baseAverage extends BaseAnalysis {
    teamAvg = 0;
    teamArray = [];
    allTeamAvg = 0;
    difference = 0;
    team;
    sourceTeams;
    tournamentScoutedSettings;
    action;
    timeMax;
    allTeamArr;
    zScore;
    timeMin;
    constructor(team, sourceTeams, tournamentScoutedSettings, action, timeMax, timeMin) {
        super();
        this.team = team;
        this.tournamentScoutedSettings = tournamentScoutedSettings;
        this.sourceTeams = sourceTeams;
        this.action = action;
        this.timeMax = timeMax;
        this.allTeamArr = [];
        this.zScore = 0;
        this.timeMin = timeMin;
    }
    async getTeamAverage() {
        const { data: arr, error } = await this.supabase.rpc('groupAndCountTeam', {
            tournament_keys: this.tournamentScoutedSettings,
            source_teams: this.sourceTeams,
            single_team: this.team,
            single_action: this.action,
            timeMax_input: this.timeMax,
            timeMin_input: this.timeMin
        });
        this.teamArray = arr;
        this.teamAvg = this.teamArray.reduce((partialSum, a) => partialSum + a, 0) / this.teamArray.length;
    }
    async getAllTeamsAverage() {
        const { data: allArr, error } = await this.supabase.rpc('groupAndCount', {
            tournament_keys: this.tournamentScoutedSettings,
            source_teams: this.sourceTeams,
            single_team: this.team,
            timeMax_input: this.timeMax,
            timeMin_input: this.timeMin
        });
        this.allTeamArr = allArr;
        this.allTeamAvg = allArr.reduce((partialSum, a) => partialSum + a, 0) / this.teamArray.length;
        this.difference = this.teamAvg - this.allTeamAvg;
        this.zScore = this.difference / simpleStats.standardDeviation(this.allTeamArr);
    }
    runAnalysis() {
        let a = this;
        return new Promise(async (resolve, reject) => {
            await a.getTeamAverage().catch((err) => {
                reject(err);
            });
            await a.getAllTeamsAverage().catch((err) => {
                reject(err);
            });
            resolve("done");
        });
    }
    finalizeResults() {
        return {
            "team": this.team,
            "teamAvg": this.teamAvg,
            "allTeamAvg": this.allTeamAvg,
            "teamArray": this.teamArray,
            "difference": this.difference,
            "allTeamArr": this.allTeamArr,
            "zScore": this.zScore
        };
    }
}
export default baseAverage;
//# sourceMappingURL=baseAverage.js.map