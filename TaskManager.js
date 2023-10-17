const Manager = require('./manager/dbmanager.js')
// const AverageForMetric = require('./analysis/AverageForMetric.js')
// const AverageForMetric = require('./analysis/AverageForMetric.js')
//const Overview = require('./overview.js')

const breakdownMetrics = require('./analysis/breakdownMetrics.ts')
const categoryMetrics = require('./analysis/categoryMetrics.ts')
const notes = require('./analysis/general/notes')
const picklistShell = require('./analysis/picklistShell.ts')
const autoPathsTeams = require('./analysis/auto/cargo/autoPathsTeams.ts')
const alliancePage = require('./analysis/alliancePage')
const predictWinning = require('./analysis/predictWinning.ts')
const flag = require('./analysis/flag.ts')


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
        let a = this;
        let returnAnalysis = []

        tasks.forEach((task) => {

            switch (task.name) {
            
                case (categoryMetrics.name):
                    returnAnalysis.push(new categoryMetrics(Manager.db, task.team))
                    break
                case (breakdownMetrics.name):
                    returnAnalysis.push(new breakdownMetrics(Manager.db, task.team))
                    break
                
                case (notes.name):
                    returnAnalysis.push(new notes(Manager.db, task.team))
                    break
                case ("picklist"):
                    returnAnalysis.push(new picklistShell(Manager.db, task.tournamentKey, task.coneOneScore, task.coneTwoScore, task.coneThreeScore, task.cubeOneScore, task.cubeTwoScore, task.cubeThreeScore,task.autoCargo, task.teleopScore, task.defenseScore, task.autoClimb, task.feedCone, task.feedCube, task.avgTotal, task.teleopClimb, task.driverAbility, JSON.parse(task.flags)))
                    break
                case("allianceAutoPaths"):
                    returnAnalysis.push(new autoPathsTeams(Manager.db, task.teamOne, task.teamTwo, task.teamThree))
                    break
                case("alliancePage"):
                    returnAnalysis.push(new alliancePage(Manager.db, task.teamOne, task.teamTwo, task.teamThree))
                    break
                case("predictMatch"):
                    returnAnalysis.push(new predictWinning(Manager.db, task.red1, task.red2, task.red3, task.blue1, task.blue2, task.blue3))
                    break
               
                case("flag"):
                    returnAnalysis.push(new flag(Manager.db, task.team,JSON.parse(task.types), task.tournamentKey))
                    break
                default:
                    console.log(`${task.name} is not a valid task`)
            }
        })

        return returnAnalysis
    }
}

module.exports = TaskManager