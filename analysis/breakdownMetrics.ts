
const robotRole = require('./general/robotRole')




// const { i } = require('mathjs')


//2022cc_qm3_2	


class breakdownMetrics extends BaseAnalysis {

    constructor(db, team) {
        super(db)
        this.team = team
        this.teamKey = "ftc" + team
        
    }
    async getData() {
        let a = this

        return new Promise(async (resolve, reject) => {

            let metrics = {}
          
           
          
          

            resolve({ metrics})
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
        
                
        }
    }

}
module.exports = breakdownMetrics