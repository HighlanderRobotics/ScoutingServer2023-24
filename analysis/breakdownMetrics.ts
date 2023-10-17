

class breakdownMetrics extends BaseAnalysis {
    private team
    private teamKey
    private result
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
        return new Promise(async (resolve, reject) => {
            this.getData()
                .then((data) => {
                    this.result = data;
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
