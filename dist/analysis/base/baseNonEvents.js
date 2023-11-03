import BaseAnalysis from '.././BaseAnalysis.js';
class baseNonEvents extends BaseAnalysis {
    team;
    teamsScoutedSettings;
    tournamentScoutedSettings;
    arrayRatios = [];
    allTeamArrayRatios = [];
    columnName;
    constructor(team, teamsScoutedSettings, tournamentScoutedSettings, columnName) {
        super();
        this.team = team;
        this.tournamentScoutedSettings = tournamentScoutedSettings;
        this.teamsScoutedSettings = teamsScoutedSettings;
        this.columnName = columnName;
    }
    async getRatios() {
    }
    runAnalysis() {
        let a = this;
        return new Promise(async (resolve, reject) => {
            await a.getRatios().catch((err) => {
                reject(err);
            });
            resolve("done");
        });
    }
    finalizeResults() {
        return {
            "team": this.team,
            "ratios": this.arrayRatios,
            "allTeamRatios": this.allTeamArrayRatios
        };
    }
}
export default baseNonEvents;
//# sourceMappingURL=baseNonEvents.js.map