import BaseAnalysis from './BaseAnalysis.js';
import totalPoints from './totalPoints.js'
class alliancePage extends BaseAnalysis {
    private teamOne: number
    private teamTwo: number
    private teamThree: number
    private totalPoints: number
    private tournamentSetting: string[]
    private sourceTeamSetting: number[]
    private metrics: any;

    constructor(teamOne: number, teamTwo: number, teamThree: number, tournamentSetting: string[], sourceTeamSetting: number[]) {
        super()
        this.teamOne = teamOne
        this.teamTwo = teamTwo
        this.teamThree = teamThree
        this.totalPoints = 0
        this.tournamentSetting = tournamentSetting
        this.sourceTeamSetting = sourceTeamSetting

    }
    async getData() {

        let onePoints = new totalPoints(this.teamOne, this.sourceTeamSetting, this.tournamentSetting, false)
        onePoints.runAnalysis()
        let twoPoints = new totalPoints(this.teamTwo, this.sourceTeamSetting, this.tournamentSetting, false)
        twoPoints.runAnalysis()
        let threePoints = new totalPoints(this.teamThree, this.sourceTeamSetting, this.tournamentSetting, false)
        threePoints.runAnalysis()
        let alliancePoints = onePoints.finalizeResults().teamAvg + twoPoints.finalizeResults().teamAvg + threePoints.finalizeResults().teamAvg


        //add more later, just for testing
        this.metrics = {"totalPoints" : alliancePoints}




    }


    runAnalysis() {
        let a = this
        return new Promise(async (resolve, reject) => {
            a.getData()
                .then((data) => {
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
            "teamOne" : this.teamOne,
            "teamTwo" : this.teamTwo,
            "teamThree" : this.teamThree,
            "result" : this.metrics

        }
    }

}
export default alliancePage;

