import BaseAnalysis from '.././BaseAnalysis.js';
class notes extends BaseAnalysis {
    team;
    teamsScoutedSettings;
    tournamentScoutedSettings;
    notes;
    constructor(team, teamsScoutedSettings, tournamentScoutedSettings) {
        super();
        this.team = team;
        this.tournamentScoutedSettings = tournamentScoutedSettings;
        this.teamsScoutedSettings = teamsScoutedSettings;
    }
    async getNotes() {
        const { data: scoutReport, error } = await this.supabase
            .from('scoutReport')
            .select('notes')
            .eq('tournamentKey', this.tournamentScoutedSettings)
            .eq('team', this.team)
            .eq('sourceTeam', this.teamsScoutedSettings);
        this.notes = scoutReport;
    }
    runAnalysis() {
        let a = this;
        return new Promise(async (resolve, reject) => {
            await a.getNotes().catch((err) => {
                reject(err);
            });
            resolve("done");
        });
    }
    finalizeResults() {
        return {
            "team": this.team,
            "notes": this.notes
        };
    }
}
export default notes;
//# sourceMappingURL=notes.js.map