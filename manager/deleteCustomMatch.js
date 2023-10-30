import Manager from './Manager.js'

//adds or updates

class deleteCustomMatch extends Manager {
    static name = "deleteCustomMatch"

    constructor() {
        super()
    }

    async runTask(tournamentKey, matchNumber, matchType) {
        const { data, error } = await this.supabase
            .from('match')
            .eq('matchType', matchType)
            .eq('matchNumber', matchNumber)
            .eq('tournamentKey', tournamentKey)
            .select()
        if(error){
            console.log(error)
            return error
        }
    }
}

export default deleteCustomMatch