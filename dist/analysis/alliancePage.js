import BaseAnalysis from './BaseAnalysis.js';
import totalPoints from './totalPoints.js';
class alliancePage extends BaseAnalysis {
    teamOne;
    teamTwo;
    teamThree;
    totalPoints;
    tournamentScoutedSettings;
    teamScoutedSettings;
    metrics;
    constructor(teamOne, teamTwo, teamThree, tournamentScoutedSettings, teamScoutedSettings) {
        super();
        this.teamOne = teamOne;
        this.teamTwo = teamTwo;
        this.teamThree = teamThree;
        this.totalPoints = 0;
        this.tournamentScoutedSettings = tournamentScoutedSettings;
        this.teamScoutedSettings = teamScoutedSettings;
    }
    async getData() {
        let onePoints = new totalPoints(this.teamOne, this.teamScoutedSettings, this.tournamentScoutedSettings, false);
        onePoints.runAnalysis();
        let twoPoints = new totalPoints(this.teamTwo, this.teamScoutedSettings, this.tournamentScoutedSettings, false);
        twoPoints.runAnalysis();
        let threePoints = new totalPoints(this.teamThree, this.teamScoutedSettings, this.tournamentScoutedSettings, false);
        threePoints.runAnalysis();
        let alliancePoints = onePoints.finalizeResults().teamAvg + twoPoints.finalizeResults().teamAvg + threePoints.finalizeResults().teamAvg;
        //add more later, just for testing
        this.metrics = { "totalPoints": alliancePoints };
    }
    runAnalysis() {
        let a = this;
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
        });
    }
    finalizeResults() {
        return {
            "teamOne": this.teamOne,
            "teamTwo": this.teamTwo,
            "teamThree": this.teamThree,
            "result": this.metrics
        };
    }
}
export default alliancePage;
//# sourceMappingURL=alliancePage.js.map