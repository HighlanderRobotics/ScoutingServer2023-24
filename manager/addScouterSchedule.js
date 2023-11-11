import Manager from './Manager.js'
class addScouterSchedule extends Manager {
    static name = "addScouterScheldule"

    constructor() {
        super()
    }

    async runTask(sourceTeam, startMatch, endMatch, tournamentKey, team1, team2, team3, team4, team5, team6) {

        for (let i = 0; i < startMatch.length; i++) {


            const { data, error } = await this.supabase
                .from('scouterSchedule')
                .insert([
                    { 'sourceTeam': sourceTeam, 'startMatch': startMatch[i], 'endMatch': endMatch[i], 'tournamentKey': tournamentKey, 'team1': team1[i], 'team2': team2[i], 'team3': team3[i], 'team4': team4[i], 'team5': team5[i], 'team6': team6[i] },
                ])
            if (error) {
                console.log(error)
                return error
            }
        }
    }

}
export default addScouterSchedule