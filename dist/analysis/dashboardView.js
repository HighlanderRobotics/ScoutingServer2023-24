import BaseAnalysis from './BaseAnalysis.js';
class picklist extends BaseAnalysis {
    team;
    flaggedMatches;
    scouterReliabilityRatings;
    constructor(team) {
        super();
        this.team = team;
        this.flaggedMatches = [];
        this.scouterReliabilityRatings = [];
    }
    async runAnalysis() {
        {
            let { data: scouters, error } = await this.supabase
                .from('scouters')
                .select('*')
                .eq('team', this.team);
            if (error) {
                console.log(error);
                return error;
            }
            if (scouters != null) {
                this.scouterReliabilityRatings = scouters;
            }
        }
        let { data: flaggedMatches, error } = await this.supabase
            .from('flaggedMatches')
            .select('*')
            .eq('sourceTeam', this.team);
        if (error) {
            console.log(error);
            return error;
        }
        if (flaggedMatches != null) {
            this.flaggedMatches = flaggedMatches;
        }
    }
    finalizeResults() {
        return {
            "flaggedMatches": this.flaggedMatches,
            "scouterReliabilityRatings": this.scouterReliabilityRatings,
            "team": this.team
        };
    }
}
export default picklist;
//# sourceMappingURL=dashboardView.js.map