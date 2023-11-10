import Manager from './Manager.js';
//adds or updates
class deleteCustomMatch extends Manager {
    static name = "deleteCustomMatch";
    constructor() {
        super();
    }
    async runTask(tournamentKey, matchNumber, matchType) {
        const { data, error } = await this.supabase
            .from('matches')
            .delete('*')
            .eq('matchType', matchType)
            .eq('matchNumber', matchNumber)
            .eq('tournamentKey', tournamentKey);
        if (error) {
            console.log(error);
            return error;
        }
    }
}
export default deleteCustomMatch;
//# sourceMappingURL=deleteCustomMatch.js.map