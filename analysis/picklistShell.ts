
import BaseAnalysis  from'./BaseAnalysis.js';

class picklistShell extends BaseAnalysis {

    constructor(tourmentKey: any, coneOneScore: any, coneTwoScore: any, coneThreeScore: any, cubeOneScore: any, cubeTwoScore: any, cubeThreeScore: any, autoCargo: any, teleOp: any, defense: any, autoClimb: any, feedCone: any, feedCube: any, avgTotal: any, teleppClimb: any, driverAbility: any, flags: any) {
        super()
        // this.tourmentKey = tourmentKey
        // this.cubeOneScore = cubeOneScore
        // this.cubeTwoScore = cubeTwoScore
        // this.cubeThreeScore = cubeThreeScore
        // this.autoCargo = autoCargo
        // this.teleOp = teleOp
        // this.result = []
        // this.coneOneScore = coneOneScore
        // this.coneTwoScore = coneTwoScore
        // this.coneThreeScore = coneThreeScore
        // this.defense = defense
        // this.autoClimb = autoClimb
        // this.feedingCone = feedCone
        // this.feedingCube = feedCube
        // this.avgTotal = avgTotal
        // this.teleppClimb = teleppClimb
        // this.driverAbility = driverAbility
        // this.flag = flags
    }


    async getPicklist() {
        let a = this
        // return new Promise(async function (resolve, reject) {
        //     let arr = []
        //     var sql = `SELECT teams.teamNumber
        //             FROM teams
        //             JOIN matches on matches.teamKey = teams.key
        //             WHERE matches.tournamentKey = ?
        //             GROUP BY teams.teamNumber `;
        //     a.db.all(sql, [a.tourmentKey], async (err, rows) => {
        //         if (err) {
        //             console.log(err)
        //         }
        //         try {


        //             let allAndAllArray = {}
        //             var avgScore = new averageScorePicklist(a.db, 1)
        //             await avgScore.runAnalysis()

        //             allAndAllArray.avgScore = { "allAvg": avgScore.average, "arraySTD": math.std(avgScore.array) }
        //             var coneOne = new levelCargo(a.db, 1, 1)
        //             await coneOne.runAnalysis()
        //             allAndAllArray.coneOne = { "allAvg": coneOne.average, "arraySTD": math.std(coneOne.array) }


        //             var coneTwo = new levelCargo(a.db, 1, 2)
        //             await coneTwo.runAnalysis()
        //             allAndAllArray.coneTwo = { "allAvg": coneTwo.average, "arraySTD": math.std(coneTwo.array) }


        //             var coneThree = new levelCargo(a.db, 1, 3)
        //             await coneThree.runAnalysis()
        //             allAndAllArray.coneThree = { "allAvg": coneThree.average, "arraySTD": math.std(coneThree.array) }


        //             var cubeOne = new levelCargo(a.db, 0, 1)
        //             await cubeOne.runAnalysis()
        //             allAndAllArray.cubeOne = { "allAvg": cubeOne.average, "arraySTD": math.std(cubeOne.array) }


        //             var cubeTwo = new levelCargo(a.db, 0, 2)
        //             await cubeTwo.runAnalysis()
        //             allAndAllArray.cubeTwo = { "allAvg": cubeTwo.average, "arraySTD": math.std(cubeTwo.array) }


        //             var cubeThree = new levelCargo(a.db, 0, 3)
        //             await cubeThree.runAnalysis()
        //             allAndAllArray.cubeThree = { "allAvg": cubeThree.average, "arraySTD": math.std(cubeThree.array) }


        //             var defense = new defense1(a.db)
        //             await defense.runAnalysis()
        //             allAndAllArray.defense = { "allAvg": defense.result, "arraySTD": math.std(defense.array) }


        //             var climberAuto = new autoClimb(a.db)
        //             await climberAuto.runAnalysis()
        //             allAndAllArray.climberAuto = { "allAvg": ((climberAuto.level + 1) / (climberAuto.totalAttempted + 3) * 12) + ((climberAuto.tipped + 1) / (climberAuto.totalAttempted + 3) * 8), "arraySTD": math.std(climberAuto.array) }


        //             var autoCargo1 = new avgAutoCargo(a.db, 0)
        //             autoCargo1.cargo = 1
        //             await autoCargo1.runAnalysis()
        //             allAndAllArray.autoCargo1 = { "allAvg": autoCargo1.average, "arraySTD": math.std(autoCargo1.array) }


        //             var feedCone = new cargoOverview(a.db, 1, 4)
        //             await feedCone.runAnalysis()
        //             allAndAllArray.feedCone = { "allAvg": feedCone.average, "arraySTD": math.std(feedCone.array) }


        //             var feedCube = new cargoOverview(a.db, 0, 4)
        //             await feedCube.runAnalysis()
        //             allAndAllArray.feedCube = { "allAvg": feedCube.average, "arraySTD": math.std(feedCube.array) }


        //             var score = new teamAvgTotal(a.db)
        //             await score.runAnalysis()
        //             allAndAllArray.score = { "allAvg": score.average, "arraySTD": math.std(score.array) }


        //             var teleClimb = new climberSucsessPicklist(a.db)
        //             await teleClimb.runAnalysis()
        //             allAndAllArray.teleClimb = { "allAvg": ((teleClimb.level + 1) / (teleClimb.totalAttempted + 3) * 10) + ((teleClimb.tipped + 1) / (teleClimb.totalAttempted + 3) * 6), "arraySTD": math.std(teleClimb.array) }


        //             var driveAbility = new driverAbility(a.db)
        //             await driveAbility.runAnalysis()
        //             allAndAllArray.driveAbility = { "allAvg": driveAbility.average, "arraySTD": math.std(driveAbility.array) }

        //             if (rows != undefined) {

        //                 for (let row in rows) {
        //                     let curr = new picklist(a.db, rows[row].teamNumber, a.coneOneScore, a.coneTwoScore, a.coneThreeScore, a.cubeOneScore, a.cubeTwoScore, a.cubeThreeScore, a.autoCargo, a.teleOp, a.defense, a.autoClimb, a.feedingCone, a.feedingCube, a.avgTotal, a.teleppClimb, a.driverAbility, allAndAllArray)
        //                     await curr.runAnalysis()
        //                     let flag = new flags(a.db, rows[row].teamNumber, a.flag, a.tourmentKey)
        //                     await flag.runAnalysis()

        //                     if (!isNaN(curr.result)) {
        //                         let temp = { "team": rows[row].teamNumber, "result": curr.result, "breakdown": curr.array, "unweighted": curr.unadjustedZScores, "flags" : flag.finalizeResults().result}
        //                         arr.push(temp)
        //                     }
        //                 }


        //             }
        //             a.result = arr.sort((a, b) => b.result - a.result)
        //             resolve("done")
        //         }
        //         catch {
        //             reject("No Data/Error")
        //         }

        //     })


        // })

    }

    runAnalysis() {
        return new Promise(async (resolve, reject) => {
            let a = this
            let temp = await a.getPicklist().catch((err) => {
                if (err) {
                    return err
                }
            })
            resolve(temp)

        })

    }
    finalizeResults() {
        return {

        }
    }

}

export default picklistShell;