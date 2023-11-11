import Manager from './Manager.js'
import fs from 'fs'

class getScouterSchedule extends Manager {
    static name = 'getScouterSchedule'

    constructor() {
        super()
    }
    async runTask(sourceTeam, tournamentKey) {

        let { data: scouterSchedule, error } = await this.supabase
            .from('scouterSchedule')
            .select('*')
            .eq('sourceTeam',sourceTeam)
            .eq('tournamentKey',tournamentKey)
        if(error){
            console.log(error)
            return error
        }
        else {
            return scouterSchedule
        }
    }
}

export default getScouterSchedule