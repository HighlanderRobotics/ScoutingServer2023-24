import Manager from './Manager.js'

class GetTeamsInTournament extends Manager {
    static name = 'getTeamsInTournament'

    constructor() {
        super()
    }

    async runTask(tournamentKey) {
        var sql = `SELECT teams.key, teamNumber, teamName FROM matches 
        INNER JOIN teams ON matches.teamKey = teams.key
        WHERE matches.tournamentKey = '${tournamentKey}'
        ORDER BY teamnumber
    `
        // Assuming you have initialized Supabase client as `supabase`

        const { data : teams, error } = await this.supabase
            .from('matches')
            .select('teamKey')
            .eq('tournamentKey', tournamentKey)
            .order('teamKey', { ascending: true })
        if(error)
        {
            console.log(error)
            return error
        }
        else
        {
            return teams
        }

    }
}
export default GetTeamsInTournament