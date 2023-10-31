import { UUID } from 'crypto';
import BaseAnalysis from './BaseAnalysis';
import basePointAverage from './base/basePointAverage';
class checkNewMatch extends BaseAnalysis {

    private sourceTeam: number;
    private scouterUuid: UUID;
    private match: string;
    private tournamentKey: string;

    private tournamentSettings: string[];
    private sourceTeamSettings: number[];


    constructor(sourceTeam: number, scouterUuid: UUID, match: string, tournamentKey: string, tournamentSettings: string[], sourceTeamSettings: number[]) {
        super()
        this.sourceTeam = sourceTeam
        this.scouterUuid = scouterUuid
        this.match = match
        this.tournamentKey = tournamentKey
        this.tournamentSettings = tournamentSettings
        this.sourceTeamSettings = sourceTeamSettings
    }
    async getData() {
        const { data: points, error } = await this.supabase
            .from('events')
            .select('count(points)', 'team')
            .eq('tournamentKey', this.tournamentKey)
            .eq('match', this.match)
            .eq('scouterUuid', this.scouterUuid)
            .eq('sourceTeam', this.sourceTeam)
        if (error) {
            console.log(error)
            return error
        }
        let teamAvg = new basePointAverage(points[0].team, this.sourceTeamSettings, this.tournamentSettings, 2, 300)
        await teamAvg.runAnalysis()
        const teamAvgPoints = teamAvg.finalizeResults().teamAvg

        const { data :scouterName, error2 } = await this.supabase
            .from('flaggedMatches')
            .select("name")
            .eq('scouterUuid', this.scouterUuid)
        if (error2) {
            console.log(error)
            return error
        }


        //check return type
        if (points > teamAvgPoints + teamAvgPoints * 0.5) {
            const { data, error } = await this.supabase
                .from('flaggedMatches')
                .insert([{ 'sourceTeam': this.sourceTeam, 'uuid': this.scouterUuid, 'match': this.match, "tournamentKey": this.tournamentKey, "note": "very high points recorded", "name" : scouterName[0].name }])
            if (error) {
                console.log(error)
                return error
            }
        }
        if (points == 0) {
            const { data, error } = await this.supabase
                .from('flaggedMatches')
                .insert([{ 'sourceTeam': this.sourceTeam, 'uuid': this.scouterUuid, 'match': this.match, "tournamentKey": this.tournamentKey, "note": "0 non-endgame points recorded", "name" : scouterName[0].name}])
            if (error) {
                console.log(error)
                return error
            }

        }
        

    }



    runAnalysis() {
        return new Promise(async (resolve, reject) => {
            await this.getData().catch((err) => {
                console.log(err)
                reject(err)
            })
            resolve("done")
        })


    }

    finalizeResults() {
        return {

        }
    }
}

export default checkNewMatch;