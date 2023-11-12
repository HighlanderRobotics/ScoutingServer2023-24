import Manager from './Manager.js'

class isTeamRegistered extends Manager {
    static name = `isTeamRegistered`

    constructor() {
        super()
    }

    async runTask(team) {
        let { data: teamsRegistered, error } = await supabase
            .from('teamsRegistered')
            .select('*')
            .eq('team', team)

        if (error) {
            console.log(error)
            return error
        }
        else {
            return teamsRegistered
        }
    }

}

export default isTeamRegistered