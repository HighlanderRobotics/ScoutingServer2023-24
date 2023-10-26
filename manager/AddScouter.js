import Manager from './Manager.js'

class AddScouter extends Manager {
    static name = "addScouter"

    constructor() {
        super()
    }

    async runTask() {
        let a = this 

        return new Promise(async(resolve, reject) => {
            await a.runInsertScouters()
            .then((results) => {
                resolve(results)
            })
            .catch((err) => {
                if (err) {
                    reject({
                        "results": err,
                        "customCode": 500
                    })
                }
            })
        })        
    }
    
   

    async insertScouter(sql, scout, i) {
        return new Promise((resolve, reject) => {
            Manager.db.run(sql, [scout.name, scout.number, scout.email], (err) => {
                if (err) {
                    console.error(`Error inserting scouters: ${err}`)
                    reject(`Error inserting scouters: ${err}`)
                } else {
                    resolve(`Success`)
                }
            })
        })
    }

    async runInsertScouters() {

        let sql = `INSERT INTO scouters (uuid, team, name) VALUES (?,?,?)`

            // console.log(scouters[i])
            await this.insertScouter(sql, scouters[i], i)
            .catch((err) => {
                if (err) {
                    console.log(`Error with inserting scouter: ${err}`)
                    reject(err)
                }
            })
        
    }
}

export default AddScouter