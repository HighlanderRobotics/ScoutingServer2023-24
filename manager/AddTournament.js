import Manager from './Manager.js'

// const updateEPA = require('../analysis/general/updateEPA.js');

class AddTournament extends Manager {
    static name = 'AddTournament'

    constructor() {
        super()
    }

    async runTask(tournamentKey, name, location, date) {

        const { data, error } = await supabase
            .from('tournaments')
            .insert([
                { 'tournamentKey': tournamentKey, 'name': name, 'location': location, 'date': date },
            ])
            .select()
        if (error) {
            console.log(error)
            return error
        }
    }
// console.log(gameDependent)
}


export default AddTournament