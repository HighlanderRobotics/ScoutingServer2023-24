import Manager from './Manager.js'

//adds or updates

class deleteCustomMatch extends Manager {
    static name = "deleteCustomMatch"

    constructor() {
        super()
    }

    async runTask(tournamentKey, matchNumber, matchType) {
        
        var deleteRows = `DELETE FROM matches 
        WHERE matchNumber = ? and tournamentKey = ? and matchType = ?`

        return new Promise(async (resolve, reject) => {
            Manager.db.all(deleteRows, [matchNumber, tournamentKey, matchType], (err, rows) => {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve("done")
                }
            })

        })

    }
}

export default deleteCustomMatch