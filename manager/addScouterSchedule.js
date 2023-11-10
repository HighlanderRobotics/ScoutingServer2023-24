import Manager from './Manager.js'
class addScouterSchedule extends Manager {
    static name = "addScouterScheldule"

    constructor() {
        super()
    }

    async runTask(sourceTeam, startMatch, endMatch, tournamentKey, team1, team2, team3, team4, team5, team6) {
        const { data, error } = await this.supabase
            .from('scouterSchedule')
            .insert([
                { 'sourceTeam': sourceTeam, 'startMatch': startMatch, 'endMatch': endMatch, 'tournamentKey': tournamentKey, 'team1':team1, 'team2':team2, 'team3': team3, 'team4':team4, 'team5':team5, 'team6':team6 },
            ])
        if(error){
            console.log(error)
            return error
        }
    }
}
export default addScouterSchedule