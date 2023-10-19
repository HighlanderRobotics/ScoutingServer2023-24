// only difference to baseAverage is it will sum with points coloumn 
class basePointAverages extends BaseAnalysis {
    private teamAvg
    private teamArray
    private allTeamAvg
    private difference
   
    private team
    private teamsScoutedSettings
    private tournamentScoutedSettings

    constructor(db, team, teamsScoutedSettings, tournamentScoutedSettings) {
        super(db)
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