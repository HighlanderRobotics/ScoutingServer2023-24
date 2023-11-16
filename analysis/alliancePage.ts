// import { supabase } from "./supabaseClient"
// import { totalPoints } from "./totalPoints"

// export const alliancePage = async (req: any, res: any) => {
//     let teamOne = req.query.teamOne
//     let teamTwo = req.query.teamTwo
//     let teamThree = req.query.teamThree
//     let sourceTeamSetting = req.query.sourceTeamSetting
//     let tournamentSetting = req.query.tournamentSetting

//         req.team = teamOne
    
//         let onePoints =  await totalPoints(req, res)
//         req.team = teamTwo
//         let twoPoints =  await totalPoints(req, res)
//         req.team = teamThree
//         let threePoints = await totalPoints(req, res)
//         let alliancePoints = onePoints.teamAvg + twoPoints.teamAvg + threePoints.teamAvg


//         //add more later, just for testing
//         let metrics = {"totalPoints" : alliancePoints}
//         res.status(200).send({
//             "teamOne" : teamOne,
//             "teamTwo" : teamTwo,
//             "teamThree" : teamThree,
//             "result" : metrics

//         })

//     }
