import { LargeNumberLike } from 'crypto';
import BaseAnalysis from './BaseAnalysis.js';
import baseAverage  from'./base/baseAverage.js';
import totalPoints from './totalPoints.js'
import { timeStamp } from 'console';

class picklist extends BaseAnalysis {
    getData() {
        throw new Error('Method not implemented.');
    }
    private weightedArray: any[];
    private unWeightedArray: any[];
    private team : number;
    private sum : number;
    private sourceTeamSettings : number[];
    private tournamentSetting : string[];
    private cargoPlaced : number

    constructor( team: any, cargoPlaced : number, sourceTeamSetttings : number[], tournamentSetting : string[] ) {
        super()
        this.team = team
        this.weightedArray = []
        this.unWeightedArray = []
        this.sum = 0
        this.sourceTeamSettings = sourceTeamSetttings
        this.tournamentSetting = tournamentSetting
        this.cargoPlaced = cargoPlaced

        // this.feedingCone = feedCone
        // this.feedingCube = feedCube
        // this.avgTotal = avgTotal
        // this.teleopClimb = teleopClimb
        // this.driverAbility = driverAbility
        // this.allAndArray = allAndArray

        // this.unadjustedZScores = []

    }
   

    async runAnalysis() {
                let arr = []
                let unAdj = []

                var cargoPlace = new baseAverage(this.team, this.sourceTeamSettings, this.tournamentSetting, 2, 300, 0)
                await cargoPlace.runAnalysis()
                let z1 = cargoPlace.finalizeResults().zScore
                this.sum += z1
                arr.push({"result" : z1 * this.cargoPlaced, "type" : "cargoScores"})
                unAdj.push({"result" : z1, "type" : "cargoScores"})

            this.unWeightedArray = unAdj
            this.weightedArray = arr
            this.sum = arr.reduce((partialSum, a) => partialSum + a.result, 0)



    }
    finalizeResults() {
        return {
            "unWeightedArray" : this.unWeightedArray,
            "team" : this.team,
            "weightedArray" : this.weightedArray,
            "sum" : this.sum
        }
    }

}
export default picklist;
