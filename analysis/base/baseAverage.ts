
import BaseAnalysis  from '.././BaseAnalysis';

class baseAverage extends BaseAnalysis {
    private teamAvg = 0
    private teamArray = []
    private allTeamAvg = 0
    private difference = 0

    private team : number
    private sourceTeams : number[]
    private tournamentScoutedSettings : String[]
    private action: number 

    constructor( team: number, sourceTeams: number[], tournamentScoutedSettings: String[], action: number) {
        super()
        this.team = team
        this.tournamentScoutedSettings = tournamentScoutedSettings
        this.sourceTeams = sourceTeams
        this.action = action
    }
    async getTeamAverage() {
        
                    
        this.teamArray = this.knex.avg().count().from("events").whereIn('action', this.action).where("source_team", this.sourceTeams).where("team" , "=", this.team).groupBy("source_team", "key")
        this.teamAvg = this.teamArray.reduce((partialSum, a) => partialSum + a, 0) / this.teamArray.length
    
    }
    async getAllTeamsAverage() {
        this.allTeamAvg = this.knex.avg().count().from("events").whereIn('action', this.action).where("source_team", this.sourceTeams).groupBy("source_team", "key")

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
            this.difference = this.teamAvg - this.allTeamAvg
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
export default class MainItem {baseAverage: any}
