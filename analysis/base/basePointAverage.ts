
import { group, time } from 'console';
import BaseAnalysis  from '.././BaseAnalysis.js';
import * as simpleStats from 'simple-statistics';


class basePointAverage extends BaseAnalysis {
    private teamAvg = 0
    private teamArray: number[]
    private allTeamAvg = 0
    private difference = 0

    private team : number
    private sourceTeamSetting : number[]
    private tournamentScoutedSettings : String[]
    private action: number
    private timeMax : number
    private timeMin : number

    private allTeamArr : number[]
    private zScore : number  

    constructor( team: number, sourceTeamSetting: number[], tournamentScoutedSettings: String[], action: number, timeMin : number, timeMax : number) {
        super()
        this.team = team
        this.tournamentScoutedSettings = tournamentScoutedSettings
        this.sourceTeamSetting = sourceTeamSetting
        this.action = action
        this.timeMin = timeMax
        this.timeMax = timeMax
        this.allTeamArr = []
        this.zScore = 0
        this.teamArray = []
    }
    async getTeamAverage() {
        
        const { data: arr, error } = await this.supabase.from('events')
        .select('match, tournamentKey, scouterUuid, points')
        .in('tournamentKey', this.tournamentScoutedSettings)
        .in('sourceTeam', this.sourceTeamSetting)
        .eq('action', this.action)
        .eq('team', this.team)
        .gt('time', this.timeMin)
        .lt('time', this.timeMax)
          if (error) {
            console.log(error)
        }
        let groupedArr = this.group(arr)
        this.teamArray = groupedArr
        this.teamAvg = this.teamArray.reduce((partialSum, a) => partialSum + a, 0) / this.teamArray.length
    
    }
    group(arr: { match: any; tournamentKey: any; scouterUuid: any; points: any; }[] | null) : number[]
    {
        return [1, 2, 3]
    }
    async getAllTeamsAverage() {
       
        const { data: arr, error } = await this.supabase.from('events')
        .select('match, tournamentKey, scouterUuid, points')
        .in('tournamentKey', this.tournamentScoutedSettings)
        .in('sourceTeam', this.sourceTeamSetting)
        .eq('action', this.action)
        .eq('team', this.team)
        .gt('time', this.timeMin)
        .lt('time', this.timeMax)
          if (error) {
            console.log(error)
        }
        let allArr = this.group(arr)
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
