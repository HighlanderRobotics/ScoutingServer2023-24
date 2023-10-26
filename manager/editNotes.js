import Manager from './Manager.js'


class editNotes extends Manager {
    static name = "editNotes"

      constructor() {
        super()
    }

    async runTask(scouter_uuid, newNote, tournament_key, match_key, team_number) {

        var sql = `UPDATE data
        SET notes = ?
        WHERE scouter_uuid = ?`
        

        return new Promise(async (resolve, reject) => {
            Manager.db.all(sql, [newNote, scouter_uuid, tournament_key, match_key, team_number], (err, rows) => {
                if(err)
                {
                    console.log(err)
                    reject(err)
                }
                resolve("done")
               
            })
           
        })

    }
}

export default editNotes