//const Manager = require('./manager/dbmanager.js')
// const AverageForMetric = require('./analysis/AverageForMetric.js')
// const AverageForMetric = require('./analysis/AverageForMetric.js')
//const Overview = require('./overview.js')

//const flag = require('./analysis/flag.js')


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
                //case("flag"):
                    //returnAnalysis.push(new flag(Manager.db, task.team,JSON.parse(task.types), task.tournamentKey))
                    //break
                default:
                    console.log(`${task.name} is not a valid task`)
            }
        })

        return returnAnalysis
    }
}

module.exports = TaskManager