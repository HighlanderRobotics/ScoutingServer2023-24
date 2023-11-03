import BaseAnalysis from './BaseAnalysis.js';
import baseAverage from './base/baseAverage.js';
import totalPoints from './totalPoints.js';
import baseNonEvents from './base/baseNonEvents.js';
class categoryMetrics extends BaseAnalysis {
    result;
    team;
    tournamentScoutedSettings;
    teamScoutedSettings;
    constructor(team, tournamentScoutedSettings, teamScoutedSettings) {
        super();
        this.team = team;
        this.tournamentScoutedSettings = tournamentScoutedSettings;
        this.teamScoutedSettings = teamScoutedSettings;
    }
    async getData() {
        let a = this;
        return new Promise(async (resolve, reject) => {
            let cones = new baseAverage(this.team, this.teamScoutedSettings, this.tournamentScoutedSettings, 0, 0, 300);
            cones.runAnalysis();
            let cubes = new baseAverage(this.team, this.teamScoutedSettings, this.tournamentScoutedSettings, 1, 0, 300);
            cubes.runAnalysis();
            let averageTotal = new totalPoints(this.team, this.teamScoutedSettings, this.tournamentScoutedSettings, false);
            averageTotal.runAnalysis();
            let averageClimb = new baseNonEvents(this.team, this.teamScoutedSettings, this.tournamentScoutedSettings, "challengeResult");
            averageClimb.runAnalysis();
            let averageAutoClimb = new baseNonEvents(this.team, this.teamScoutedSettings, this.tournamentScoutedSettings, "autoChallengeResult");
            averageAutoClimb.runAnalysis();
            let droppedAvg = new baseAverage(this.team, this.teamScoutedSettings, this.tournamentScoutedSettings, 3, 300, 0);
            await droppedAvg.runAnalysis();
            // let driverAbility = new 
            let metrics = {};
            resolve({ metrics });
        });
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
            "result": this.result,
            "team": this.team,
        };
    }
}
export default categoryMetrics;
//# sourceMappingURL=categoryMetrics.js.map