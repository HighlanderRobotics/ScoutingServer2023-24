import Manager from './Manager.js'
import axios from "axios"
import { resolve, row } from 'mathjs'

class getMutablePicklists extends Manager {
    static name = "getMutablePicklists"

    constructor() {
        super()
    }

    async runTask(team){
        if(team == null)
        {
            return("no team")
        }
        var sql = `SELECT *
        FROM mutablePicklists
        WHERE team = ?`
        return new Promise(async (resolve, reject) => {
            Manager.db.all(sql, [team], (err, rows) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
                resolve(rows.map((row) => ({
                    ...row,
                    teams: JSON.parse(row.teams).map(team => parseInt(team)),
                })))

            })
        })

    }
}

export default getMutablePicklists