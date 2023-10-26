import Manager from './Manager.js'


class addEPA extends Manager {
    static name = "addEPA"

    constructor() {
        super()
    }

    async runTask() {
        try {
            const csv = require('csvtojson')
            csv()
                .fromFile('2023EPA.csv')
                .then(async (jsonObj) => {
                    for(let i = 0; i < jsonObj.length; i ++)
                    {
                        await this.addEPA(parseInt(jsonObj[i].num), parseInt(jsonObj[i].total_epa))
                    }

                })
        }
        //    await this.addEpa(team, epa)

        catch (err) {
            console.log(err)
        }
        resolve("done")

    }
    async addEPA(teamNumber, epa) {
        var sql = `INSERT INTO epaTable (team, epa) VALUES (?, ?)`
        return new Promise(async (resolve, reject) => {
            Manager.db.all(sql, [teamNumber, epa], async (err, rows) => {
                if (err) {
                    // console.log(err)
                    reject(err)
                }
                else {
                    resolve("done")
                }
            })
        })
    }
}

export default addEPA