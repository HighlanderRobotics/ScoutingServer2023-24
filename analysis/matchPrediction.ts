
import BaseAnalysis  from'./BaseAnalysis.js';
import scores from './totalPoints.js'
import * as simpleStats from 'simple-statistics';
import alliancePage from './alliancePage.js'

class matchPrediction extends BaseAnalysis {
    private red1 : number
    private red2 : number
    private red3 : number
    private blue1 : number
    private blue2 : number
    private blue3 : number
    private winningAlliance
    private blueAlliance
    private redAlliance
    private redWinning
    private blueWinning: any
    private tournamentSetting : string[]
    private teamScoutedSettings : number[]
    constructor( red1: number, red2 : number, red3: number, blue1: number, blue2: number, blue3: number, tournamentSetting : string[], teamScoutedSettings : number[]) {
        super()

        this.red1 = red1
        this.red2 = red2
        this.red3 = red3
        this.blue1 = blue1
        this.blue2 = blue2
        this.blue3 = blue3
        this.winningAlliance = 2
        this.redWinning = 0
        this.blueWinning
        //red = 0
        //blue = 1
        this.blueAlliance = {}
        this.redAlliance = {}
        this.tournamentSetting = tournamentSetting
        this.teamScoutedSettings = teamScoutedSettings
    }
    async getWinner() {
        return new Promise(async  (resolve, reject) => {
            // if(err)
            // {
            //     reject(err);
            // }


            var score1 = new scores(this.red1, this.teamScoutedSettings, this.tournamentSetting, false)
            await score1.runAnalysis()
            let redArr1 = score1.finalizeResults().teamArray

            var score2 = new scores(this.red2, this.teamScoutedSettings, this.tournamentSetting, false)
            await score2.runAnalysis()
            let redArr2 = score2.finalizeResults().teamArray
            

            var score3 = new scores(this.red3, this.teamScoutedSettings, this.tournamentSetting, false)
            await score3.runAnalysis()
            let redArr3 = score3.finalizeResults().teamArray


            if (redArr1.length <=1 || redArr2.length <= 1 || redArr3.length <= 1) {
                this.redAlliance = 0
                this.blueAlliance = 0
                resolve("not enough data")
                return
            }
            let red1SDV = simpleStats.standardDeviation(redArr1)
            let red2SDV = simpleStats.standardDeviation(redArr2)
            let red3SDV = simpleStats.standardDeviation(redArr3)

            let redAllianceSDV = Math.sqrt(Math.pow(red1SDV, 2) + Math.pow(red2SDV, 2) + Math.pow(red3SDV, 2))
            let redAllianceMean = this.getMean(redArr1) +  this.getMean(redArr2) +  this.getMean(redArr3)

            var score4 = new scores(this.blue1, this.teamScoutedSettings, this.tournamentSetting, false)
            await score4.runAnalysis()
            let blueArr1 = score4.finalizeResults().teamArray

            var score5 = new scores(this.blue2, this.teamScoutedSettings, this.tournamentSetting, false)
            await score5.runAnalysis()
            let blueArr2 = score5.finalizeResults().teamArray

            var score6 = new scores(this.blue3, this.teamScoutedSettings, this.tournamentSetting, false)
            await score6.runAnalysis()
            let blueArr3 = score6.finalizeResults().teamArray

            if (blueArr1.length <= 1 || blueArr2.length <= 1|| blueArr3.length <= 1) {
                this.redAlliance = 0
                this.blueAlliance = 0
                resolve("not enough data")
                return
            }
            let blue1SDV = simpleStats.standardDeviation(blueArr1)
            let blue2SDV = simpleStats.standardDeviation(blueArr2)
            let blue3SDV = simpleStats.standardDeviation(blueArr3)



            let blueAllianceSDV = Math.sqrt(Math.pow(blue1SDV, 2) + Math.pow(blue2SDV, 2) + Math.pow(blue3SDV, 2))
            let blueAllianceMean = this.getMean(blueArr1) + this.getMean(blueArr2) + this.getMean(blueArr3)

            let differentialSDV = Math.sqrt(Math.pow(redAllianceSDV, 2) + Math.pow(blueAllianceSDV, 2))
            let differentialMean = redAllianceMean - blueAllianceMean

            let redLoosing =  this.GetZPercent((0 - differentialMean) / differentialSDV) 

            this.redWinning = 1 - redLoosing
            this.blueWinning = redLoosing

            if (Math.max(this.redWinning, this.blueWinning) == this.redWinning)
            {
                this.winningAlliance = 0
            }
            else
            {
                this.winningAlliance = 1
            }
            let blue = new alliancePage(this.blue1, this.blue2, this.blue3, this.tournamentSetting, this.teamScoutedSettings)
            await blue.runAnalysis()
            this.blueAlliance = blue.finalizeResults()

            let red = new alliancePage(this.red1, this.red2, this.red3, this.tournamentSetting, this.teamScoutedSettings)
            await red.runAnalysis()
            this.redAlliance = red.finalizeResults()

            resolve("done")


        })


    }
     GetZPercent(z: number) : number {
            // if(err)
            // {
            //     reject(err);
            // }
            if (z < -6.5)
                return 0.0;
            if (z > 6.5)
                return 1.0;

            var factK = 1;
            var sum = 0;
            var term = 1;
            var k = 0;
            var loopStop = Math.exp(-23);
            while (Math.abs(term) > loopStop) {
                term = .3989422804 * Math.pow(-1, k) * Math.pow(z, k) / (2 * k + 1) / Math.pow(2, k) * Math.pow(z, k + 1) / factK;
                sum += term;
                k++;
                factK *= k;

            }
            sum += 0.5;

            return sum;
    
        //z == number of standard deviations from the mean

        //if z is greater than 6.5 standard deviations from the mean
        //the number of significant digits will be outside of a reasonable 
        //range

    }
    getMean(teamArray : number[]) : number{
            var total = 0;
            for (var i = 0; i < teamArray.length; i++) {
                total += teamArray[i];
            }
            return total / teamArray.length;
    


    }
   
    runAnalysis() {
        let a = this
        return new Promise(async (resolve, reject) => {
            await a.getWinner().catch((err) => {

            })
            // a.result = temp   
            resolve("done")
        })


    }
    
    finalizeResults() {
        return {
            "red1": this.red1,
            "red2": this.red2,
            "red3": this.red3,
            "blue1": this.blue1,
            "blue2": this.blue2,
            "blue3": this.blue3,
            "redWinning": this.redWinning,
            "blueWinning": this.blueWinning,
            "winningAlliance" : this.winningAlliance,
            "redAlliance" : this.redAlliance,
            "blueAlliance" : this.blueAlliance

        }
    }
}
export default matchPrediction;
    
