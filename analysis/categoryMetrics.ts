
// import BaseAnalysis from './BaseAnalysis.js';
// import basePointAverages from './base/basePointAverage.js';
// import baseAverage from './base/baseAverage.js';
// import { totalPoints } from './totalPoints.js'
// import baseNonEvents from './base/baseNonEvents.js';
// export const categoryMetrics = async (req: any, res: any) => {
//         let team = req.team
//         let sourceSetting = req.sourceSetting
//         let tournamentSetting = req.tournamentSetting

//         let cones = new baseAverage( team,  sourceSetting,   tournamentSetting, 0, 0, 300)
//         cones.runAnalysis()
//         let cubes = new baseAverage( team,  sourceSetting,   tournamentSetting, 1, 0, 300)
//         cubes.runAnalysis()

//         let averageTotal =  totalPoints( req, res)

//         let averageClimb = new baseNonEvents( team,  sourceSetting,   tournamentSetting, "challengeResult")
//         averageClimb.runAnalysis()

//         let averageAutoClimb = new baseNonEvents( team,  sourceSetting,   tournamentSetting, "autoChallengeResult")
//         averageAutoClimb.runAnalysis()

//         let droppedAvg = new baseAverage( team,  sourceSetting,   tournamentSetting, 3, 300, 0)
//         await droppedAvg.runAnalysis()


//         return {
//             "result":  {"droppedAvg" : droppedAvg, },
//             "team":  team,
//         }


//     }
