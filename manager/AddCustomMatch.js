import Manager from './Manager.js'

//adds or updates

class AddCustomMatch extends Manager {
    static name = "AddCustomMatch"

    constructor() {
        super()
    }

    async runTask(tournamentKey, matchNumber, matchType, teams) {
        teams = JSON.parse(teams)
        for (let i = 0; i < teams.length; i++) {
            console.log(teams[i])
            let currKey = tournamentKey + '_' + matchType + matchNumber + '_' + i
            let currTeamKey = "frc" + teams[i]
            this.runInsert(currKey, tournamentKey, matchNumber, currTeamKey, matchType)
        }
    }
    async runInsert(key, tournamentKey, matchNumber, teamKey, matchType) {
        let { data: match, error } = await supabase
            .from('match')
            .select('*')
            .eq('matchNumber', matchNumber)
            .eq('tournamentKey', tournamentKey)
            .eq('matchType', matchType)
        if (error) {
            console.log(error)
            return error
        }
        if (rows.length > 0) {
            const { error } = await supabase
                .from('match')
                .delete()
                .eq('matchNumber', matchNumber)
                .eq('tournamentKey', tournamentKey)
                .eq('matchType', matchType)
            if (error) {
                console.log(error)
                return error
            }
        }
        const { data, error1 } = await supabase
            .from('match')
            .insert([
                {'key':key, 'tournamentKey':tournamentKey, 'matchNumber':matchNumber, 'teamKey':teamKey, 'matchType':matchType },
            ])
            .select()
        if (error1) {
            console.log(error1)
            return error1
        }
    }
}

export default AddCustomMatch