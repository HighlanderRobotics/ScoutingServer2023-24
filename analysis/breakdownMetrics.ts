import BaseAnalysis from './BaseAnalysis';
import baseNonEvents from './base/baseNonEvents';

class breakdownMetrics extends BaseAnalysis {
    team : number;
    teamKey: string;
    result : any;

    tournamentScoutedSettings : string[];
    teamScoutedSetting : number[];
    metrics : any

    constructor(team : number, tournamentScoutedSettings: string[], teamScoutedSetting: number[]) {
        super();
        this.team = team;
        this.teamKey = "ftc" + team;
        this.teamScoutedSetting = teamScoutedSetting
        this.tournamentScoutedSettings =tournamentScoutedSettings
    }

    async getData() {
        let roles = new baseNonEvents(this.team, this.teamScoutedSetting, this.tournamentScoutedSettings, "robotRole")
        roles.runAnalysis()

        let climb = new baseNonEvents(this.team, this.teamScoutedSetting, this.tournamentScoutedSettings, "challengeResult")
        climb.runAnalysis()

        let autoClimb = new baseNonEvents(this.team, this.teamScoutedSetting, this.tournamentScoutedSettings, "autoChallengeResult")
        autoClimb.runAnalysis()

        let metrics = {"roles" : roles.finalizeResults().ratios, "climb" : climb.finalizeResults().ratios, "autoClimb" : autoClimb.finalizeResults().ratios}
        this.metrics = metrics

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
        return {
            "breakdowns" : this.metrics
        };
    }
}

export default breakdownMetrics;
