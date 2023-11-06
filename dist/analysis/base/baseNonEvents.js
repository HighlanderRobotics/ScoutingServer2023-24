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
    async getRatiosTeam() {
        const { data: arr, error } = await this.supabase.select(this.columnName)
            .from('scoutReport, match')
            .in('tournamentKey', this.tournamentScoutedSettings)
            .in('sourceTeam', this.sourceTeamSetting)
            .eq('team', this.team)
        if (error) {
            console.log(error)
        }

        let groupedRatios = this.groupedRatios(arr)
        this.arrayRatios = groupedRatios


    }
    async getAllRatios() {

    }
    async groupIntoRatios(arr) {
        const { data: arr, error } = await this.supabase.select(this.columnName)
            .from('scoutReport, match')
            .in('tournamentKey', this.tournamentScoutedSettings)
            .in('sourceTeam', this.sourceTeamSetting)
        if (error) {
            console.log(error)
        }

        let groupedRatios = this.groupedRatios(arr)
        this.allTeamArrayRatios = groupedRatios
    }
    runAnalysis() {
        let a = this;
        return new Promise(async (resolve, reject) => {
            await a.getRatios().catch((err) => {
                reject(err);
            });
            await a.getAllRatios().catch((err) =>
                reject(err))
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