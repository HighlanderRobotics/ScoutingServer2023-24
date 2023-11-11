import Manager from './Manager.js'


class deleteRegisteredTeam extends Manager {
    static name = "deleteRegisteredTeam"

    constructor() {
        super()
    }

    async runTask(team) {

        const { error } = await this.supabase
            .from('teamsRegistered')
            .delete('*')
            .eq('team', team)
        if (error){
            console.log(error)
            return error
        }
    }
}

export default deleteRegisteredTeam