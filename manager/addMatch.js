import Manager from './Manager.js'


class addMatch extends Manager {
    static name = 'addMatch'

    constructor() {
        super()
    }

    async runTask(body) {
        if (body.matchType != 'qm') {
            let num = 0
            var sql = `SELECT MAX(matchNumber) AS answer FROM matches WHERE matchType = "em"`;
            num = await this.getLargest(sql)
            num = num + 1


            let insertFinal = ``
            for (let i = 0; i < 6; i++) {
                const data = `('${body.tournamentKey}_em${num}_${i}', '${body.tournamentKey}', ${num}, 'frc${body.teams[i]}', 'em'), `
                insertFinal += data
                if (i == 5) {
                    insertFinal = insertFinal.substring(0, insertFinal.length - 2)
                }

            }
            const { data, error } = await supabase
                .from('match')
                .insert([
                    { 'key': key, 'tournamentKey': tournamentKey, 'matchNumber': matchNumber, 'teamKey': teamKey, 'matchType': matchType },
                ])
                .select()
            if (error) {
                console.log(error)
                return error
            }
        }
        else {
            //always qm?

        }
    }
    async getLargest(sql) {
        return new Promise((resolve, reject) => {
            Manager.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(`error getting max`)
                }
                else {
                    if (rows.length == 0) {
                        return 0
                    }
                    resolve(rows[0].answer)
                }
            })

        })
    }
}

export default addMatch