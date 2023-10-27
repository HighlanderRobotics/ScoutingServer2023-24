
import BaseAnalysis  from'./BaseAnalysis';
import basePointAverages from './base/basePointAverage';
import baseAverage from './base/baseAverage';

class categoryMetrics extends BaseAnalysis {
    private result: unknown
    private team
    tournamentScoutedSettings : string[]
    teamScoutedSettings : number[]
    constructor( team: any, tournamentScoutedSettings : string[], teamScoutedSettings : number[]) {
        super()
        this.team = team
        this.tournamentScoutedSettings = tournamentScoutedSettings
        this.teamScoutedSettings = teamScoutedSettings

    }
    async getData() {
        let a = this

        return new Promise(async (resolve, reject) => {

            // let cones = new baseAverage(this.tournamentScoutedSettings)

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