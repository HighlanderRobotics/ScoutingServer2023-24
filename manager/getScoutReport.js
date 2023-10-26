import { re } from 'mathjs'
import Manager from './Manager.js'
class getScoutReport extends Manager {
    static name = "getScoutReport"

    constructor() {
        super()
    }

    async runTask(matchKey) {

        var sql = `SELECT *
        FROM data 
        WHERE matchKey = ?`
        return new Promise(async (resolve, reject) => {
            Manager.db.all(sql, [matchKey], (err, rows) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                resolve(rows)
            })
        })

    }
}

export default getScoutReport