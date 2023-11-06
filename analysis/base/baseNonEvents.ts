
import BaseAnalysis  from '.././BaseAnalysis.js';

class baseNonEvents extends BaseAnalysis {


   
    private team : number
    private sourceTeamSetting : number[]
    private tournamentScoutedSettings : String[]
    private arrayRatios = []
    private allTeamArrayRatios!: number[];
    private columnName : string

    constructor( team: number, sourceTeamSetting: number[], tournamentScoutedSettings: string[], columnName: string) {
        super()
        this.team = team
        this.tournamentScoutedSettings = tournamentScoutedSettings
        this.sourceTeamSetting = sourceTeamSetting
        this.columnName = columnName

    }
    async getRatios() {
        const { data: arr, error } = await this.supabase.from('scoutReport, match')
            .select(this.columnName)
            .in('tournamentKey', this.tournamentScoutedSettings)
            .in('sourceTeam', this.sourceTeamSetting)
        if (error) {
            console.log(error)
        }

        let groupedRatios = this.groupedRatios(arr)
        this.allTeamArrayRatios = groupedRatios

    }
    groupedRatios(arr: any) : number[]
    {
        return [1,2, 3]
    }

       




    runAnalysis() {
        let a = this
        return new Promise(async (resolve, reject) => {
            await a.getRatios().catch((err) => {
                reject(err)
            })
            
            resolve("done")
        })


    }

    finalizeResults() {
        return {
            "team": this.team,
            "ratios" : this.arrayRatios,
            "allTeamRatios" : this.allTeamArrayRatios
        }
    }
}

export default baseNonEvents