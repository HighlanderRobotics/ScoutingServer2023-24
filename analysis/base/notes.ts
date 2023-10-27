
import BaseAnalysis from '.././BaseAnalysis';

class notes extends BaseAnalysis {

    private team
    private teamsScoutedSettings
    private tournamentScoutedSettings
    private notes: any

    constructor(team: any, teamsScoutedSettings: any, tournamentScoutedSettings: any) {
        super()
        this.team = team
        this.tournamentScoutedSettings = tournamentScoutedSettings
        this.teamsScoutedSettings = teamsScoutedSettings
    }
    async getNotes() {

        let { data: scoutReport, error } = await this.supabase
            .from('scoutReport')
            .select('notes')
            .in


    }



    runAnalysis() {
        let a = this
        return new Promise(async (resolve, reject) => {
            await a.getNotes().catch((err) => {
                reject(err)
            })

            resolve("done")
        })


    }

    finalizeResults() {
        return {
            "team": this.team,
            "notes": this.notes
        }
    }
}
export default class MainItem { notes: any }
