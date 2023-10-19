
class notes extends BaseAnalysis {
   
    private team
    private teamsScoutedSettings
    private tournamentScoutedSettings
    private notes

    constructor(db, team, teamsScoutedSettings, tournamentScoutedSettings) {
        super(db)
        this.team = team
        this.tournamentScoutedSettings = tournamentScoutedSettings
        this.teamsScoutedSettings = teamsScoutedSettings
    }
    async getNotes() {
        let sql = `
            FROM scoutReport
            WHERE team = ? and ? and ?`
        return new Promise((resolve, reject) => {
          
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    this.notes = rows

                }
            })

        })


       
    }



    runAnalysis() {
        let a = this
        return new Promise(async (resolve, reject) => {
            await a.getNotes().catch((err) => {
                reject(err)
            })
            
            resolve("done")
        })


    }

    finalizeResults() {
        return {
            "team": this.team,
            "notes" : this.notes
        }
    }
}