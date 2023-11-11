import Manager from './Manager.js'
class registerTeam extends Manager {
    static name = "registerTeam"

    constructor() {
        super()
    }

    async runTask(team, teamCode) {
        const { data, error } = await this.supabase
            .from('teamsRegistered')
            .insert([
                { 'team': team, 'teamCode': teamCode}
            ])
        if(error){
            console.log(error)
            return error
        }
    }
}
export default registerTeam