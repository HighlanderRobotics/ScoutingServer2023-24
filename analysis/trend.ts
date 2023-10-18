const averageScore = require('./general/averageScore.js')


class trend extends BaseAnalysis {
    private team
    private result
    constructor(db, team) {
        super(db)
        this.team = team

        this.result = 0

    }
    async getTrend() {
        let a = this

        // let score = new AverageScore(a.db, a.team, 1)
        // await score.runAnalysis()
        // let scoreArr = score.array
        // let avgScore = score.average
        // if (score.array.length == 0) {
        //             a.result = null
        //             return
        //         }
        //         else {
        //             if(scoreArr.length < 3)
        //             {
        //                 a.result = 2
        //                 return
        //             }
        //             let num = (scoreArr[scoreArr.length - 2] - scoreArr[scoreArr.length - 3]) + (scoreArr[scoreArr.length - 1] - scoreArr[scoreArr.length - 2]) / 2
        //             if (math.abs(num) >= avgScore / 3) {
        //                 if (num < 0) {
        //                     a.result = 0
        //                 }
        //                 else {
        //                     a.result = 4
        //                 }
        //             }
        //             else if (math.abs(num) <= avgScore / 10) {


        //                 a.result = 2
        //             }
        //             else {

        //                 if (num < 0) {
        //                     a.result = 1
        //                 }
        //                 else {
        //                     a.result = 3
        //                 }
        //             }
        //         }

    


    }



    runAnalysis() {
        let a = this
        return new Promise(async (resolve, reject) => {
            await a.getTrend().catch((err) => {

            })
            resolve("done")
        })


    }

    finalizeResults() {
        return {
            "team": this.team,
            "result": this.result
        }
    }
}

module.exports = trend