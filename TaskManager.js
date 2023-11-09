// import Manager from './manager/dbmanager.js'
// import AverageForMetric = from('./analysis/AverageForMetric.js')
// import AverageForMetric = from('./analysis/AverageForMetric.js')
//import Overview = from('./overview.js')

// import breakdownMetrics from './analysis/breakdownMetrics.js'
// import categoryMetrics from './analysis/categoryMetrics.js'
import notes from './dist/analysis/base/notes.js'
// import picklistShell from './analysis/picklistShell.js'
// import alliancePage from './analysis/alliancePage.js'
// import predictWinning from './analysis/predictWinning.js'
// import flag from './analysis/flag.js'
// import BaseAnalysis from './analysis/BaseAnalysis.js'
import baseAverage from './dist/analysis/base/baseAverage.js'
import { BADFAMILY } from 'dns'
import teamAndMatch from './analysis/teamAndMatch.js'


class TaskManager {

    runTasks(tasks) {

        if (tasks.length <= 0) {
            console.log(`No tasks provided`)
            return `No tasks provided`
        }
        let a = this

        return new Promise(async (resolve, reject) => {
            let analysis
            let results = []

            // Add tasks
            analysis = a.addTasks(tasks)
            for (var i = 0; i < analysis.length; i++) {
                // Run tasks
                await analysis[i].runAnalysis()
            }

            for (var i = 0; i < analysis.length; i++) {
                // Resolve results when they've all finished
                results.push(analysis[i].finalizeResults())
            }
            resolve(results)
        })
            .catch((err) => {
                if (err) {
                    return err
                }
            })
            .then((results) => {
                return results
            })
            .catch((err) => {
                if (err) {
                    return err
                }
            })
            .then((results) => {
                return results
            })
    }

    addTasks(tasks) {
        let returnAnalysis = []

        tasks.forEach(async (task) => {

            switch (task.name) {

                // case (categoryMetrics.name):
                //     returnAnalysis.push(new categoryMetrics( task.team))
                //     break
                // case (breakdownMetrics.name):
                //     returnAnalysis.push(new breakdownMetrics(task.team))
                //     break
                case ("baseAverage"):
                    returnAnalysis.push(new baseAverage(
                        Number(task.team),
                        task.sourceTeamSetting,
                        task.tournamentsSetting,
                        Number(task.action),
                        Number(task.timeMax),
                        Number(task.timeMin)
                    ))


                    break
                case ("notes"):
                    returnAnalysis.push(new notes(task.team, task.sourceTeamSetting, task.tournamentsSetting))
                    break
                case('teamAndMatch'):
                    returnAnalysis.push(new teamAndMatch(task.team, task.match, task.scouterUuid))
                    break
                // case ("picklist"):
                //     returnAnalysis.push(new picklistShell(task.tournamentKey, task.coneOneScore, task.coneTwoScore, task.coneThreeScore, task.cubeOneScore, task.cubeTwoScore, task.cubeThreeScore,task.autoCargo, task.teleopScore, task.defenseScore, task.autoClimb, task.feedCone, task.feedCube, task.avgTotal, task.teleopClimb, task.driverAbility, JSON.parse(task.flags)))
                //     break

                // case("alliancePage"):
                //     returnAnalysis.push(new alliancePage( task.teamOne, task.teamTwo, task.teamThree))
                //     break
                // case("predictMatch"):
                //     returnAnalysis.push(new predictWinning(Manager.db, task.red1, task.red2, task.red3, task.blue1, task.blue2, task.blue3))
                //     break

                // case("flag"):
                //     returnAnalysis.push( new flag(Manager.db, task.team,JSON.parse(task.types), task.tournamentKey))
                //     break
                default:
                    console.log(`${task.name} is not a valid task`)
            }
        })
        return returnAnalysis
    }
}

export default TaskManager



