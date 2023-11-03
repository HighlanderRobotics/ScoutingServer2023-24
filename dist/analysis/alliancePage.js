import BaseAnalysis from './BaseAnalysis.js';
import totalPoints from './totalPoints.js';
class alliancePage extends BaseAnalysis {
    teamOne;
    teamTwo;
    teamThree;
    totalPoints;
    result;
    tournamentScoutedSettings;
    teamScoutedSettings;
    metircs;
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
        this.totalPoints = onePoints.finalizeResults().teamAvg + twoPoints.finalizeResults().teamAvg + threePoints.finalizeResults().teamAvg;
    }
    runAnalysis() {
        let a = this;
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
        });
    }
    finalizeResults() {
        return {
            "totalPoints": this.totalPoints,
        };
    }
}
export default alliancePage;
//# sourceMappingURL=alliancePage.js.map