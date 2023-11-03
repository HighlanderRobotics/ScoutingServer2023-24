import Manager from './Manager.js';
class IsScouted extends Manager {
    static name = `isScouted`;
    constructor() {
        super();
        this.result = [];
    }
    async runTask(tournamentKey, match, sourceTeam) {
        let { data: scoutReport, error } = await this.supabase
            .from('scoutReport')
            .select(['scouterUuid', 'scouterName'])
            .eq('sourceTeam', sourceTeam)
            .eq('tournamentKey', tournamentKey)
            .eq('match', match);
        if (error) {
            console.log(error);
            return error;
        }
        else {
            return scoutReport;
        }
    }
}
export default IsScouted;
//# sourceMappingURL=IsScouted.js.map