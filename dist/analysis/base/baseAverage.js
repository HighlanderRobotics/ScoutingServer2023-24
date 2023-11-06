import BaseAnalysis from '.././BaseAnalysis.js';
import * as simpleStats from 'simple-statistics';
// Now you can use methods from simpleStats like so:
// let mean = simpleStats.mean([1, 2, 3]);
class baseAverage extends BaseAnalysis {
    teamAvg = 0;
    teamArray;
    allTeamAvg = 0;
    difference = 0;
    team;
    sourceTeamSetting;
    tournamentScoutedSettings;
    action;
    timeMax;
    allTeamArr;
    zScore;
    timeMin;
    constructor(team, sourceTeamSetting, tournamentScoutedSettings, action, timeMax, timeMin) {
        super();
        this.team = team;
        this.tournamentScoutedSettings = tournamentScoutedSettings;
        this.sourceTeamSetting = sourceTeamSetting;
        this.action = action;
        this.timeMax = timeMax;
        this.allTeamArr = [];
        this.zScore = 0;
        this.timeMin = timeMin;
    }
    async getTeamAverage() {
        const { data: arr, error } = await this.supabase.from('events')
            .select('match, tournamentKey, scouterUuid')
            .in('tournamentKey', this.tournamentScoutedSettings)
            .in('sourceTeam', this.sourceTeamSetting)
            .eq('action', this.action)
            .eq('team', this.team)
            .gt('time', this.timeMin)
            .lt('time', this.timeMax);
        if (error) {
            console.log(error);
        }
        let groupedArr = this.group(arr);
        this.teamArray = groupedArr;
        this.teamAvg = this.teamArray.reduce((partialSum, a) => partialSum + a, 0) / this.teamArray.length;
    }
    group(arr) {
        return [1, 2, 3];
    }
    async getAllTeamsAverage() {
        const { data: arr, error } = await this.supabase.from('events')
            .select('match, tournamentKey, scouterUuid, points')
            .in('tournamentKey', this.tournamentScoutedSettings)
            .in('sourceTeam', this.sourceTeamSetting)
            .eq('action', this.action)
            .eq('team', this.team)
            .gt('time', this.timeMin)
            .lt('time', this.timeMax);
        if (error) {
            console.log(error);
        }
        this.allTeamArr = this.group(arr);
        this.allTeamAvg = this.allTeamArr.reduce((partialSum, a) => partialSum + a, 0) / this.teamArray.length;
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