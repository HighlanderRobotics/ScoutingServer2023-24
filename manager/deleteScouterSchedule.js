import Manager from './Manager.js'


class deletePicklist extends Manager {
    static name = "deletePicklist"

    constructor() {
        super()
    }

    async runTask(scourceTeam, tournamentKey) {
        const { data, error } = await this.supabase
            .from('scouterSchedule')
            .eq('scourceTeam', scourceTeam)
            .eq('tournamentKey', tournamentKey)

        if (error) {
            console.log(error)
            return error
        }
    }
}

export default deleteScouterSchedule