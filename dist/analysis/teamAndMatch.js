//given a specific team and match this will give the following stats for that match only:
//auto path, auto points, auto charge, driver ability, role, notes, links, cones and cubes w level breakdown
import BaseAnalysis from './BaseAnalysis.js';
class teamAndMatch extends BaseAnalysis {
    team;
    matchKey;
    scouterUuid;
    result;
    constructor(team, matchKey, scouterUuid) {
        super();
        this.team = team;
        this.matchKey = matchKey;
        this.scouterUuid = scouterUuid;
        this.result = { "piecesScored": 0, "piecesDropped": 0, "cubesPickedUp": 0, "conesPickedUp": 0, "defensiveEvents": 0, "autoPath": [], "autoClimb": -1, "teleOpClimb": -1, "robotRole": -1 };
    }
    async getData() {
        this.addMetric("piecesScored", 2);
        this.addMetric("piecesDropped", 3);
        this.addMetric("cubesPickedUp", 0);
        this.addMetric("conesPickedUp", 1);
        this.addMetric("defensiveEvents", 5);
        this.addCategory("autoClimb", 'autoChallengeResult');
        this.addCategory("teleOpClimb", 'challengeResult');
        this.addCategory("robotRole", 'robotRole');
        //add auto path
    }
    async addCategory(metricName, columnName) {
        let { data: x, error } = await this.supabase
            .from('scoutReport')
            .select(columnName)
            .eq('scouterUuid', this.scouterUuid)
            .eq('team', this.team)
            .eq('match', this.matchKey);
        if (error) {
            console.log(error);
        }
        else {
            if (x != null) {
                this.result[metricName] = x[0];
            }
        }
    }
    async addMetric(metricName, action) {
        let { data: x, error } = await this.supabase
            .from('events')
            .select('*')
            .eq('action', action)
            .eq('scouterUuid', this.scouterUuid)
            .eq('team', this.team)
            .eq('match', this.matchKey);
        if (error) {
            console.log(error);
        }
        else {
            if (x != null) {
                this.result[metricName] = x.length;
            }
        }
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
            "team": this.team
        };
    }
}
export default teamAndMatch;
//# sourceMappingURL=teamAndMatch.js.map