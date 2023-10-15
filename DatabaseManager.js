//const addEPA = require('./manager/addEPA.js')


class DatabaseManager {
    constructor() {
        
    }

    runTask(task, body) {
        // return new Promise(async (resolve, reject) => {
            switch (task) {
                //case addEPA.name:
                    //return new addEPA().runTask()
                
                

                    default:
                    return new Promise((resolve, reject) => {
                        reject({
                            "task": task,
                            "result": `${task} is not a task`,
                            "customCode": 400
                        })
                    })
            // }
    
        }
    }
}

module.exports = DatabaseManager