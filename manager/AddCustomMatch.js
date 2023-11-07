import Manager from './Manager.js'

//adds or updates

class AddCustomMatch extends Manager {
    static name = "AddCustomMatch"

    constructor() {
        super()
    }

    async runTask(tournamentKey, matchNumber, matchType, teams) {
        for (let i = 0; i < teams.length; i++) {
            let currKey = tournamentKey + '_' + matchType + matchNumber + '_' + i
            let currTeamKey = "frc" + teams[i]
            this.runInsert(currKey, tournamentKey, matchNumber, currTeamKey, matchType)
        }
    }
    async runInsert(key, tournamentKey, matchNumber, teamKey, matchType) {
        let { data: match, error } = await this.supabase
            .from('matches')
            .select('*')
            .eq('matchNumber', matchNumber)
            .eq('tournamentKey', tournamentKey)
            .eq('matchType', matchType)
        if (error) {
            console.log(error)
            return error
        }

        if (match.length > 0) {
            const { error } = await this.supabase
                .from('matches')
                .delete('*')
                .eq('matchNumber', matchNumber)
                .eq('tournamentKey', tournamentKey)
                .eq('matchType', matchType)
            if (error) {
                console.log(error)
                return error
            }
        }
        const { data, error1 } = await this.supabase
            .from('matches')
            .insert([
                {'key':key, 'tournamentKey':tournamentKey, 'matchNumber':matchNumber, 'teamKey':teamKey, 'matchType':matchType }
            ])
        if (error1) {
            console.log(error1)
            return error1
        }
    }
}

export default AddCustomMatch