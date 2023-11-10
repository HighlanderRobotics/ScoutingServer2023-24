import BaseAnalysis from './BaseAnalysis.js';
import basePointAverage from './base/basePointAverage.js';
class checkNewMatch extends BaseAnalysis {
    sourceTeam;
    scouterUuid;
    match;
    tournamentKey;
    tournamentSetting;
    sourceTeamSettings;
    constructor(sourceTeam, scouterUuid, match, tournamentKey, tournamentSetting, sourceTeamSettings) {
        super();
        this.sourceTeam = sourceTeam;
        this.scouterUuid = scouterUuid;
        this.match = match;
        this.tournamentKey = tournamentKey;
        this.tournamentSetting = tournamentSetting;
        this.sourceTeamSettings = sourceTeamSettings;
    }
    async getData() {
        const { data: points, error } = await this.supabase
            .from('events')
            .select('count(points), team')
            .eq('tournamentKey', this.tournamentKey)
            .eq('match', this.match)
            .eq('scouterUuid', this.scouterUuid)
            .eq('sourceTeam', this.sourceTeam);
        if (error) {
            console.log(error);
            return error;
        }
        let teamAvg = new basePointAverage(points[0].team, this.sourceTeamSettings, this.tournamentSetting, 2, 0, 300);
        await teamAvg.runAnalysis();
        const teamAvgPoints = teamAvg.finalizeResults().teamAvg;
        {
            const { data: scouterNames, error } = await this.supabase
                .from('flaggedMatches')
                .select("name")
                .eq('scouterUuid', this.scouterUuid);
            if (error) {
                console.error("Error fetching names:", error);
                return error;
            }
            //check return type
            let teamPoints = points[0].count[0].points;
            if (teamPoints > teamAvgPoints + teamAvgPoints * 0.5) {
                const { data, error } = await this.supabase
                    .from('flaggedMatches')
                    .insert([{ 'sourceTeam': this.sourceTeam, 'uuid': this.scouterUuid, 'match': this.match, "tournamentKey": this.tournamentKey, "note": "very high points recorded", "name": scouterNames[0].name }]);
                if (error) {
                    console.log(error);
                    return error;
                }
            }
            if (teamPoints == 0) {
                const { data, error } = await this.supabase
                    .from('flaggedMatches')
                    .insert([{ 'sourceTeam': this.sourceTeam, 'uuid': this.scouterUuid, 'match': this.match, "tournamentKey": this.tournamentKey, "note": "0 non-endgame points recorded", "name": scouterNames[0].name }]);
                if (error) {
                    console.log(error);
                    return error;
                }
            }
        }
    }
    runAnalysis() {
        return new Promise(async (resolve, reject) => {
            await this.getData().catch((err) => {
                console.log(err);
                reject(err);
            });
            resolve("done");
        });
    }
    finalizeResults() {
        return {};
    }
}
export default checkNewMatch;
//# sourceMappingURL=checkNewMatch.js.map