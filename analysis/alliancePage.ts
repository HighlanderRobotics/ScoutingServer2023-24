import BaseAnalysis  from'./BaseAnalysis';
import basePointAverage from './base/basePointAverage'
import baseNonEvents from './base/baseNonEvents'

class alliancePage extends BaseAnalysis {
    private teamOne : number
    private teamTwo : number
    private teamThree : number
    private totalPoints : number
    private result : any
    private tournamentScoutedSettings : string[]
    private teamScoutedSettings : number[]
    metircs : any;

    constructor(teamOne: number, teamTwo: number, teamThree: number, tournamentScoutedSettings : string[], teamScoutedSettings : number[]) {
        super()
        this.teamOne = teamOne
        this.teamTwo = teamTwo
        this.teamThree = teamThree
        this.totalPoints = 0
        this.tournamentScoutedSettings = tournamentScoutedSettings
        this.teamScoutedSettings = teamScoutedSettings
      
    }
    async getData() {

        let oneNonClimbPoints = new basePointAverage(this.teamOne, this.teamScoutedSettings, this.tournamentScoutedSettings, 2)
        oneNonClimbPoints.runAnalysis()
        let twoNonClimbPoints = new basePointAverage(this.teamTwo, this.teamScoutedSettings, this.tournamentScoutedSettings, 2)
        twoNonClimbPoints.runAnalysis()
        let threeNonClimbPoints = new basePointAverage(this.teamThree, this.teamScoutedSettings, this.tournamentScoutedSettings, 2)
        threeNonClimbPoints.runAnalysis()

        let oneClimb = new baseNonEvents(this.teamOne, this.teamScoutedSettings, this.tournamentScoutedSettings, "challengeResult")
        oneClimb.runAnalysis()
        let twoClimb = new baseNonEvents(this.teamTwo, this.teamScoutedSettings, this.tournamentScoutedSettings, "challengeResult")
        twoClimb.runAnalysis()
        let threeClimb = new baseNonEvents(this.teamThree, this.teamScoutedSettings, this.tournamentScoutedSettings, "challengeResult")
        threeClimb.runAnalysis()

        let oneClimbArray = oneClimb.finalizeResults().ratios
        let twoClimbArray = twoClimb.finalizeResults().ratios
        let threeClimbArray = threeClimb.finalizeResults().ratios

        let oneClimbAuto = new baseNonEvents(this.teamOne, this.teamScoutedSettings, this.tournamentScoutedSettings, "autoChallengeResult")
        oneClimbAuto.runAnalysis()
        let twoClimbAuto = new baseNonEvents(this.teamTwo, this.teamScoutedSettings, this.tournamentScoutedSettings, "autoChallengeResult")
        twoClimbAuto.runAnalysis()
        let threeClimbAuto = new baseNonEvents(this.teamThree, this.teamScoutedSettings, this.tournamentScoutedSettings, "autoChallengeResult")
        threeClimbAuto.runAnalysis()

        let oneClimbArrayAuto = oneClimbAuto.finalizeResults().ratios
        let twoClimbArrayAuto = twoClimbAuto.finalizeResults().ratios
        let threeClimbArrayAuto = threeClimbAuto.finalizeResults().ratios

        
        let alliancePoints = oneNonClimbPoints.finalizeResults().teamAvg + twoNonClimbPoints.finalizeResults().teamAvg + threeNonClimbPoints.finalizeResults().teamAvg
        alliancePoints += oneClimbArray[1] * 10 + oneClimbArray[2] * 8 + twoClimbArray[1] * 10 + twoClimbArray[2] * 8 + threeClimbArray[1] * 10 + threeClimbArray[2] * 8
        alliancePoints += oneClimbArrayAuto[1] * 12 + oneClimbArrayAuto[2] * 10 + twoClimbArrayAuto[1] * 12 + twoClimbArrayAuto[2] * 10 + threeClimbArrayAuto[1] * 12 + threeClimbArrayAuto[2] * 8

        
        this.totalPoints = alliancePoints




    }
        

            runAnalysis() {
            let a = this
            return new Promise(async (resolve, reject) => {
                a.getData()
                    .then((data) => {
                        a.result = data;
                        resolve("done");
                    })
                    .catch((err) => {
                        if (err) {
                            reject(err);
                            return err;
                        }
                    });

            })


        }
        finalizeResults() {
            return {
                "totalPoints": this.totalPoints,
             
            }
        }

    }
export default alliancePage;

