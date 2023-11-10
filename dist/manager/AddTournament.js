import Manager from './Manager.js';
// const updateEPA = require('../analysis/general/updateEPA.js');
class AddTournament extends Manager {
    static name = 'AddTournament';
    constructor() {
        super();
    }
    async runTask(tournamentKey, name, location, date) {
        const { data, error } = await this.supabase
            .from('tournaments')
            .insert([
            { 'tournamentKey': tournamentKey, 'name': name, 'location': location, 'date': date },
        ]);
        if (error) {
            console.log(error);
            return error;
        }
    }
}
export default AddTournament;
//# sourceMappingURL=AddTournament.js.map