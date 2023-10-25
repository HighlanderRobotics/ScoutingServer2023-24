
import BaseAnalysis  from'./BaseAnalysis';

class categoryMetrics extends BaseAnalysis {
    private result: unknown
    private team
    constructor( team: any) {
        super()
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
export = categoryMetrics;