
class baseAverage extends BaseAnalysis {
    private teamAvg : number
    private teamArray : Array<number>
    private allTeamAvg : number
    private difference : number

    private team : number
    private sourceTeams : number[]
    private tournamentScoutedSettings : String[]
    private action: number 

    constructor(db: any, team: number, sourceTeams: number[], tournamentScoutedSettings: String[], action: number) {
        super(db)
        this.team = team
        this.tournamentScoutedSettings = tournamentScoutedSettings
        this.sourceTeams = sourceTeams
        this.action = action
    }
    async getTeamAverage() {
        //string substitute teamsScoutedSettings and tournamentScoutedSettings
        let sql = `
            FROM event
            WHERE team = ? and ? and ?`
        return new Promise((resolve, reject) => {
         

            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    
                    this.knex.select("matchKey").from("events").whereIn('action', this.action).where("source_team", this.sourceTeams)

                }
            })

        })
    }
    async getAllTeamsAverage() {
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
            "allTeamAvg": this.allTeamAvg,
            "teamArray": this.teamArray,
            "difference": this.difference
        }
    }
}