
import BaseAnalysis  from '.././BaseAnalysis.js';

class baseNonEvents extends BaseAnalysis {


   
    private team : number
    private teamsScoutedSettings : number[]
    private tournamentScoutedSettings : String[]
    private arrayRatios = []
    private allTeamArrayRatios = []
    private columnName : String

    constructor( team: number, teamsScoutedSettings: number[], tournamentScoutedSettings: string[], columnName: string) {
        super()
        this.team = team
        this.tournamentScoutedSettings = tournamentScoutedSettings
        this.teamsScoutedSettings = teamsScoutedSettings
        this.columnName = columnName

    }
    async getRatios() {
       

    }

       
    



    runAnalysis() {
        let a = this
        return new Promise(async (resolve, reject) => {
            await a.getRatios().catch((err) => {
                reject(err)
            })
            
            resolve("done")
        })


    }

    finalizeResults() {
        return {
            "team": this.team,
            "ratios" : this.arrayRatios,
            "allTeamRatios" : this.allTeamArrayRatios
        }
    }
}

export default baseNonEvents