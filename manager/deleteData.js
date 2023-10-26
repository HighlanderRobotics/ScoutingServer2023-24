import Manager from './Manager.js'


class deleteData extends Manager {
    static name = "deleteData"

    constructor() {
        super()
    }

    async runTask(scouter_uuid, match_number, tournament_key, team) {

        var sql = `DELETE FROM scout_report
        WHERE scouter_uuid, match_number, tournament_key, team = ?, ?, ?, ?`
        var sql2 = `DELETE FROM events
        WHERE scouter_uuid, match_number, tournament_key, team = ?, ?, ?, ?`
        return new Promise(async (resolve, reject) => {
            Manager.db.all(sql, [scouter_uuid, match_number, tournament_key, team], (err, rows) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
            })
            Manager.db.all(sql2, [scouter_uuid, match_number, tournament_key, team], (err, rows) => {
                if (err) {
                    console.log(err)
                    reject(err)
                }
            })
            resolve("done")
        })

    }
}

export default deleteData