import { group } from 'console';
import BaseAnalysis from '.././BaseAnalysis.js';
import * as simpleStats from 'simple-statistics';

class baseAverage extends BaseAnalysis {
    teamAvg = 0;
    teamArray = [];
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
        try {


            const { data: arr, error } = await this.supabase.from('events')
            .select('match, tournamentKey, scouterUuid')
            .in('tournamentKey', this.tournamentScoutedSettings)
            .in('sourceTeam', this.sourceTeamSetting)
            .eq('action', this.action)
            .eq('team', this.team)
            .gt('time', this.timeMin)
            .lt('time', this.timeMax)
            
            let groupedArr = group(arr)

            this.teamArray = groupedArr;
            this.teamAvg = this.teamArray.reduce((partialSum, a) => partialSum + a, 0) / this.teamArray.length;
        }
        catch (error) {

            console.log(error)
            return error

        }
    }
    async getAllTeamsAverage() {
        try {
            const { data: allArr, error } = await this.supabase.from('events')
            .select('matchKey, COUNT(*) as row_count')
            .in('tournamentKey', this.tournamentScoutedSettings)
            .in('sourceTeam', this.sourceTeamSetting)
            .eq('action', this.action)
            .gt('time', this.timeMin)
            .lt('time', this.timeMax)
            .group('uuid, match, tournamentKey')
            
            if(error)
            {
                console.log(error)
            }
            this.allTeamArr = allArr;
            this.allTeamAvg = this.allTeamArr.reduce((partialSum, a) => partialSum + a, 0) / this.teamArray.length;
            this.difference = this.teamAvg - this.allTeamAvg;
            this.zScore = this.difference / simpleStats.standardDeviation(this.allTeamArr);
            
        }
        catch(error)
        {
            console.log(error)
            return error
        }
    }
    runAnalysis() {
        return new Promise(async (resolve, reject) => {
            await this.getTeamAverage().catch((err) => {
                reject(err);
            });
            await this.getAllTeamsAverage().catch((err) => {
                reject(err);
            });
            resolve("done");
        });
    }
    group(arr)
    {

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