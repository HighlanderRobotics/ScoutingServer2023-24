import BaseAnalysis  from'./BaseAnalysis';
import totalPoints from './totalPoints'
class alliancePage extends BaseAnalysis {
    private teamOne : number
    private teamTwo : number
    private teamThree : number
    private totalPoints : number
    private result : any
    private tournamentScoutedSettings : string[]
    private teamScoutedSettings : number[]
    metircs : any;

    constructor(teamOne: number, teamTwo: number, teamThree: number, tournamentScoutedSettings : string[], teamScoutedSettings : number[]) {
        super()
        this.teamOne = teamOne
        this.teamTwo = teamTwo
        this.teamThree = teamThree
        this.totalPoints = 0
        this.tournamentScoutedSettings = tournamentScoutedSettings
        this.teamScoutedSettings = teamScoutedSettings
      
    }
    async getData() {

        let onePoints = new totalPoints(this.teamOne, this.teamScoutedSettings, this.tournamentScoutedSettings, false)        
        onePoints.runAnalysis()
        let twoPoints = new totalPoints(this.teamTwo, this.teamScoutedSettings, this.tournamentScoutedSettings, false)        
        twoPoints.runAnalysis()
        let threePoints = new totalPoints(this.teamThree, this.teamScoutedSettings, this.tournamentScoutedSettings, false)        
        threePoints.runAnalysis()
        this.totalPoints = onePoints.finalizeResults().teamAvg + twoPoints.finalizeResults().teamAvg + threePoints.finalizeResults().teamAvg 
    




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
                "totalPoints": this.totalPoints,
             
            }
        }

    }
export default alliancePage;

