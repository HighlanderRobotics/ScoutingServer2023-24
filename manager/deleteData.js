import Manager from './Manager.js'


class deleteData extends Manager {
    static name = "deleteData"

    constructor() {
        super()
    }

    async runTask(scouterUuid, matchNumber, tournamentKey, team) {
        const { data, error } = await supabase
            .from('scoutReport')
            .eq('scouterUuid', scouterUuid)
            .eq('matchNumber', matchNumber)
            .eq('tournamentKey', tournamentKey)
            .eq('team', team)
            .select()

        if (error) {
            console.log(error)
            return error
        }
        var sql2 = `DELETE FROM events
        WHERE scouter_uuid, match_number, tournament_key, team = ?, ?, ?, ?`
        const { data1, error1 } = await supabase
            .from('events')
            .eq('scouterUuid', scouterUuid)
            .eq('matchNumber', matchNumber)
            .eq('tournamentKey', tournamentKey)
            .eq('team', team)
            .select()
        if (error1){
            console.log(error1)
            return error1
        }
    }
}

export default deleteData