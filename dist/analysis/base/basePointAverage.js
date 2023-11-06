import BaseAnalysis from '.././BaseAnalysis.js';
import * as simpleStats from 'simple-statistics';
class basePointAverage extends BaseAnalysis {
    teamAvg = 0;
    teamArray = [];
    allTeamAvg = 0;
    difference = 0;
    team;
    sourceTeams;
    tournamentScoutedSettings;
    action;
    timeMax;
    timeMin;
    allTeamArr;
    zScore;
    constructor(team, sourceTeams, tournamentScoutedSettings, action, timeMin, timeMax) {
        super();
        this.team = team;
        this.tournamentScoutedSettings = tournamentScoutedSettings;
        this.sourceTeams = sourceTeams;
        this.action = action;
        this.timeMin = timeMax;
        this.timeMax = timeMax;
        this.allTeamArr = [];
        this.zScore = 0;
    }
    async getTeamAverage() {
        const { data: arr, error } = await this.supabase 
        .select('match, tournamentKey, scouterUuid, points')
        .in('tournamentKey', this.tournamentScoutedSettings)
        .in('sourceTeam', this.sourceTeamSetting)
        .eq('action', this.action)
        .eq('team', this.team)
        .gt('time', this.timeMin)
        .lt('time', this.timeMax)

        let groupedArr = this.group(arr)
        this.teamArray = groupedArr;
        this.teamAvg = this.teamArray.reduce((partialSum, a) => partialSum + a, 0) / this.teamArray.length;
    }
    async getAllTeamsAverage() {
        const { data: allArr, error } = await this.supabase.rpc('groupAndCountPoints', {
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
    group(arr)
    {

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
            "difference": this.difference
        };
    }
}
export default basePointAverage;
//# sourceMappingURL=basePointAverage.js.map