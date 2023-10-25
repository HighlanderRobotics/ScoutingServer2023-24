// only difference to baseAverage is it will sum with points coloumn 
import BaseAnalysis  from '.././BaseAnalysis';

class basePointAverages extends BaseAnalysis {
    private teamAvg = 0
    private teamArray = []
    private allTeamAvg = 0
    private difference = 0
   
    private team
    private teamsScoutedSettings
    private tournamentScoutedSettings

    constructor( team: any, teamsScoutedSettings: any, tournamentScoutedSettings: any) {
        super()
        this.team = team
        this.tournamentScoutedSettings = tournamentScoutedSettings
        this.teamsScoutedSettings = teamsScoutedSettings
    }
    async getTeamAverage() {

       
    }
    async getAllTeamsAverage()
    {
        let sql = ``
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
            "allTeamAvg" : this.allTeamAvg,
            "teamArray" : this.teamArray,
            "difference" : this.difference
        }
    }
}
export default class MainItem {basePointAverage: any}
