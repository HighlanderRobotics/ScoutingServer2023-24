import BaseAnalysis from './BaseAnalysis';

class breakdownMetrics extends BaseAnalysis {
    team : number;
    teamKey: string;
    result : any;

    constructor(team : number) {
        super();
        this.team = team;
        this.teamKey = "ftc" + team;
    }

    async getData() {
        return new Promise(async (resolve, reject) => {
            let metrics = {};
            resolve({ metrics });
        });
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
        });
    }

    finalizeResults() {
        return {};
    }
}

export default breakdownMetrics;
