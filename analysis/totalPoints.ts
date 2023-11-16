// only difference to baseAverage is it will sum with points coloumn 
import BaseAnalysis from './BaseAnalysis.js';
import basePointAverage from './base/basePointAverage.js'
import baseNonEvents from './base/baseNonEvents.js'

import { supabase } from "./supabaseClient"

export const totalPoints = async (req: any, res: any) => {
    let team = req.query.team
    let sourceTeamSetting = req.query.sourceTeamSetting
    let tournamentSetting = req.query.tournamentSetting



    let nonClimbPoints = new basePointAverage(team, sourceTeamSetting, tournamentSetting, 2, 300, 0)
    nonClimbPoints.runAnalysis()


    let climb = new baseNonEvents(team, sourceTeamSetting, tournamentSetting, "challengeResult")
    climb.runAnalysis()

    let climbArray = climb.finalizeResults().ratios


    let climbAuto = new baseNonEvents(team, sourceTeamSetting, tournamentSetting, "autoChallengeResult")
    climbAuto.runAnalysis()


    let climbAutoArray = climbAuto.finalizeResults().ratios


    let teamAvg = nonClimbPoints.finalizeResults().teamAvg + climbArray[1] * 10 + climbArray[2] * 8 + climbAutoArray[1] * 12 + climbAutoArray[2] * 10
    let allTeamAvg = nonClimbPoints.finalizeResults().allTeamAvg + climb.finalizeResults().allTeamRatios[1] * 10 + climb.finalizeResults().allTeamRatios[2] * 8 + climbAuto.finalizeResults().allTeamRatios[1] * 12 + climbAuto.finalizeResults().allTeamRatios[2] * 10


    let difference = teamAvg - allTeamAvg
    res.status(200).send({
        "team": team,
        "teamAvg": teamAvg,
        "allTeamAvg": allTeamAvg,
        // "teamArray":  teamArray,
        "difference": difference
    })

}

