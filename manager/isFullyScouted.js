import { re, row } from 'mathjs'
import Manager from './Manager.js'
// import updateEPA = require('../analysis/general/updateEPA.js')

class isFullyScouted extends Manager {
    static name = "isFullyScouted"

    constructor() {
        super()
    }

    async runTask(matchNumber) {
        var sql = `SELECT *
           FROM data 
           JOIN matches ON matches.key = data.matchKey
           WHERE matches.matchNumber = ? AND matches.matchType = "qm" `

        return new Promise(async (resolve, reject) => {
        
            Manager.db.all(sql, [matchNumber], async (err, rows) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                else if(rows === undefined)
                {
                    console.log("no data for that match")
                }
                // if (rows.length >= 6) {
                //     let temp = new updateEPA(Manager.db, matchNumber)
                //     await temp.runAnalysis()
                // }
                resolve("done")
            })
        })



    }
}

export default isFullyScouted