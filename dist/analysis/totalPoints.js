// only difference to baseAverage is it will sum with points coloumn 
import BaseAnalysis from './BaseAnalysis.js';
import basePointAverage from './base/basePointAverage.js';
import baseNonEvents from './base/baseNonEvents.js';
class basePointAverages extends BaseAnalysis {
    teamAvg = 0;
    teamArray = [];
    allTeamAvg = 0;
    difference = 0;
    team;
    teamsScoutedSettings;
    tournamentScoutedSettings;
    picklist;
    constructor(team, teamsScoutedSettings, tournamentScoutedSettings, picklist) {
        super();
        this.team = team;
        this.tournamentScoutedSettings = tournamentScoutedSettings;
        this.teamsScoutedSettings = teamsScoutedSettings;
        this.picklist = picklist;
    }
    async getData() {
        let nonClimbPoints = new basePointAverage(this.team, this.teamsScoutedSettings, this.tournamentScoutedSettings, 2, 300, 0);
        nonClimbPoints.runAnalysis();
        let climb = new baseNonEvents(this.team, this.teamsScoutedSettings, this.tournamentScoutedSettings, "challengeResult");
        climb.runAnalysis();
        let climbArray = climb.finalizeResults().ratios;
        let climbAuto = new baseNonEvents(this.team, this.teamsScoutedSettings, this.tournamentScoutedSettings, "autoChallengeResult");
        climbAuto.runAnalysis();
        let climbAutoArray = climbAuto.finalizeResults().ratios;
        this.teamAvg = nonClimbPoints.finalizeResults().teamAvg + climbArray[1] * 10 + climbArray[2] * 8 + climbAutoArray[1] * 12 + climbAutoArray[2] * 10;
        this.allTeamAvg = nonClimbPoints.finalizeResults().allTeamAvg + climb.finalizeResults().allTeamRatios[1] * 10 + climb.finalizeResults().allTeamRatios[2] * 8 + climbAuto.finalizeResults().allTeamRatios[1] * 12 + climbAuto.finalizeResults().allTeamRatios[2] * 10;
        this.difference = this.teamAvg - this.allTeamAvg;
        if (this.picklist) {
        }
    }
    runAnalysis() {
        let a = this;
        return new Promise(async (resolve, reject) => {
            await a.getData().catch((err) => {
                reject(err);
            });
            resolve("done");
        });
    }
    finalizeResults() {
        return {
            "team": this.team,
            "teamAvg": this.teamAvg,
            "allTeamAvg": this.allTeamAvg,
            "teamArray": this.teamArray,
            "difference": this.difference
        };
    }
}
export default basePointAverages;
//# sourceMappingURL=totalPoints.js.map