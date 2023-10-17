




const BaseAnalysis = require('./BaseAnalysis.js')

class categoryMetrics extends BaseAnalysis {

    constructor(db, team) {
        super(db)
        this.team = team

    }
    async getData() {
        let a = this

        return new Promise(async (resolve, reject) => {

            let metrics = {}
        
          
            resolve({metrics})
        })
    }

    runAnalysis() {
        let a = this
        return new Promise(async (resolve, reject) => {
            a.getData()
                .then((data) => {
                    a.result = data;
                    resolve("done");
                })
                .catch((err) => {
                    if (err) {
                        reject(err);
                        return err;
                    }
                });
        
        })


    }
    finalizeResults() {
        return {
            "result": this.result,
            "team": this.team,
        }
    }

}
module.exports = categoryMetrics