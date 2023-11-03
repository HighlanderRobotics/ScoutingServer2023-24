
import { time } from 'console';
import BaseAnalysis  from '.././BaseAnalysis.js';
import * as simpleStats from 'simple-statistics';


class basePointAverage extends BaseAnalysis {
    private teamAvg = 0
    private teamArray: number[] = [];
    private allTeamAvg = 0
    private difference = 0

    private team : number
    private sourceTeams : number[]
    private tournamentScoutedSettings : String[]
    private action: number
    private timeMax : number
    private timeMin : number

    private allTeamArr : number[]
    private zScore : number  

    constructor( team: number, sourceTeams: number[], tournamentScoutedSettings: String[], action: number, timeMin : number, timeMax : number) {
        super()
        this.team = team
        this.tournamentScoutedSettings = tournamentScoutedSettings
        this.sourceTeams = sourceTeams
        this.action = action
        this.timeMin = timeMax
        this.timeMax = timeMax
        this.allTeamArr = []
        this.zScore = 0
    }
    async getTeamAverage() {
        
        const { data : arr, error } = await this.supabase.rpc('groupAndCountPointsTeam', {
            tournament_keys: this.tournamentScoutedSettings,
            source_teams: this.sourceTeams,
            single_team: this.team,
            single_action : this.action,
            timeMax_input: this.timeMax,
            timeMin_input : this.timeMin
          });
          
        this.teamArray = arr
        this.teamAvg = this.teamArray.reduce((partialSum, a) => partialSum + a, 0) / this.teamArray.length
    
    }
    async getAllTeamsAverage() {
        const { data : allArr, error } = await this.supabase.rpc('groupAndCountPoints', {
            tournament_keys: this.tournamentScoutedSettings,
            source_teams: this.sourceTeams,
            single_team: this.team,
            timeMax_input: this.timeMax,
            timeMin_input : this.timeMin
          });
          
        this.allTeamArr = allArr
        this.allTeamAvg = allArr.reduce((partialSum: any, a: any) => partialSum + a, 0) / this.teamArray.length
        this.difference = this.teamAvg - this.allTeamAvg
        this.zScore = this.difference/simpleStats.standardDeviation(this.allTeamArr)

    }



    runAnalysis() {
        let a = this
        return new Promise(async (resolve, reject) => {
            await a.getTeamAverage().catch((err) => {
                reject(err)
            })
            await a.getAllTeamsAverage().catch((err) => {
                reject(err)
            })
            resolve("done")
        })


    }

    finalizeResults() {
        return {
            "team": this.team,
            "teamAvg": this.teamAvg,
            "allTeamAvg": this.allTeamAvg,
            "teamArray": this.teamArray,
            "difference": this.difference
        }
    }
}
export default basePointAverage
