// const Manager = require('../manager/Manager.js')

class BaseAnalysis {
    public db
    constructor(db) {
        if (this.constructor == BaseAnalysis) {
            throw new Error(`Abstract classes can't be instantiated.`);
        }
        this.db = db
    }

    getData() {
        throw new Error(`Method 'getData()' must be implemented.`)
    }

    runAnalysis() {
        throw new Error(`Method 'runAnalysis()' must be implemented.`)
    }

    finalizeResults(result) {
        throw new Error(`Method 'finalizeResults()' must be implemented.`)
    }
}

