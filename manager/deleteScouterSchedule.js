import Manager from './Manager.js'


class deleteScouterSchedule extends Manager {
    static name = "deleteScouterSchedule"

    constructor() {
        super()
    }

    async runTask(scouterScheduleUuid, scourceTeam, tournamentKey) {
        const { data, error } = await this.supabase
            .from('scouterSchedule')
            .delete('*')
            .eq('scouterSchedule', scouterScheduleUuid)
            .eq('sourceTeam', scourceTeam)
            .eq('tournamentKey', tournamentKey)

        if (error) {
            console.log(error)
            return error
        }
    }
}

export default deleteScouterSchedule