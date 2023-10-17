const { re } = require('mathjs')
const Manager = require('./Manager.js')
//adds or updates

class AddCustomMatch extends Manager {
    static name = "AddCustomMatch"

    constructor() {
        super()
    }

    async runTask(tournamentKey, matchNumber, matchType, teams) {
        teams = JSON.parse(teams)
        for (let i = 0; i < teams.length; i++) {
            console.log(teams[i])
            let currKey = tournamentKey + '_'+matchType+matchNumber+'_'+i
            let currTeamKey = "frc" + teams[i]
            this.runInsert(currKey, tournamentKey, matchNumber, currTeamKey, matchType)
        }

    }


    async runInsert(key, tournamentKey, matchNumber, teamKey, matchType) {
        var sql = `INSERT INTO matches (key, tournamentKey, matchNumber, teamKey, matchType) VALUES (?, ?, ?, ?, ?)`
        var getRows = `SELECT * FROM matches WHERE matchNumber = ? and tournamentKey = ? and matchType = ?`
        var deleteRows = `DELETE FROM matches
        WHERE matchNumber = ? and tournamentKey = ? and matchType = ?`
        await new Promise(async (resolve, reject) => {
            Manager.db.all(getRows, [matchNumber, tournamentKey, matchType], (err, rows) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                if (rows.length > 0)
                {
                    Manager.db.all(deleteRows, [matchNumber, tournamentKey, matchType], (err, rows) =>{
                        if (err)
                        {
                            console.log(err)
                            reject(err)
                        }
                    })
                }
                return new Promise(async (resolve, reject) => {
                    Manager.db.all(sql, [key, tournamentKey, matchNumber, teamKey, matchType], (err, rows) => {
                
                        if (err) {
                            reject(err)
                        }
                        else
                        {
                            resolve("done")
                        }
                    })
                })

            })
        })
        
            

    
        


    }
}

module.exports = AddCustomMatch