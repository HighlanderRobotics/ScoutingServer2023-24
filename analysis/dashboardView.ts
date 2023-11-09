import { LargeNumberLike } from 'crypto';
import BaseAnalysis from './BaseAnalysis.js';
import baseAverage from './base/baseAverage.js';
import totalPoints from './totalPoints.js'
import { timeStamp } from 'console';

class picklist extends BaseAnalysis {

    private team: number
    private flaggedMatches: any[]
    private scouterReliabilityRatings: any[]

    constructor(team: any) {
        super()
        this.team = team
        this.flaggedMatches = []
        this.scouterReliabilityRatings = []

    }


    async runAnalysis() {


    {
        let { data: scouters, error } = await this.supabase
            .from('scouters')
            .select('*')
            .eq('team', this.team)
        if(error)
        {
            console.log(error)
            return error
        }
        if(scouters != null)
        {
            this.scouterReliabilityRatings = scouters
        }
    }

        let { data: flaggedMatches, error } = await this.supabase
        .from('flaggedMatches')
        .select('*')
        .eq('sourceTeam', this.team) 
        if(error)
        {
            console.log(error)
            return error
        }
        if(flaggedMatches != null)
        {
            this.flaggedMatches = flaggedMatches
        }

        

    }
    finalizeResults() {
        return {
            "flaggedMatches": this.flaggedMatches,
            "scouterReliabilityRatings": this.scouterReliabilityRatings,
            "team": this.team
        }
    }

}
export default picklist;
