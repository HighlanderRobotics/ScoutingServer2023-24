import Manager from './Manager.js'




class GetAllNotes extends Manager {
    static name = 'getAllNotes'


    constructor() {
        super()
    }


    async runTask(teamKey, tournamentScoutedSettings, teamScoutedSettings) {


        let { data: scoutReport, error } = await this.supabase
            .from('scoutReport')
            .select('notes')
            .in('tournamentKey', [tournamentScoutedSetting])
            .in('sourceTeam', [teamScoutedSettings])


        if (error) {
            console.log(error)
            return error
        }
        else {
            return scoutReport
        }
    }


}


export default GetAllNotes
