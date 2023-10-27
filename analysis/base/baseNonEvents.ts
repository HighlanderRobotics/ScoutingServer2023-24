
import BaseAnalysis  from '.././BaseAnalysis';

class baseNonEvents extends BaseAnalysis {


   
    private team : number
    private teamsScoutedSettings : number[]
    private tournamentScoutedSettings : String[]
    private arrayRatios = []
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
            "ratios" : this.arrayRatios
        }
    }
}

export default baseNonEvents