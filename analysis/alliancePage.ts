
class alliancePage extends BaseAnalysis {
    private teamOne
    private teamTwo
    private teamThree
    private totalPoints
    private result

    constructor(db, teamOne, teamTwo, teamThree) {
        super(db)
        this.teamOne = teamOne
        this.teamTwo = teamTwo
        this.teamThree = teamThree
        this.totalPoints = 0
      
    }
    async getData() {
        // let a = this

        // let metrics = {}
        // let avgOneAuto = new averageScore(Manager.db, a.teamOne, 0)
        // await avgOneAuto.runAnalysis()
        // let avgOneTele = new averageScore(Manager.db, a.teamOne, 1)
        // await avgOneTele.runAnalysis()

        // let avgTwoAuto = new averageScore(Manager.db, a.teamTwo, 0)
        // await avgTwoAuto.runAnalysis()
        // let avgTwoTele = new averageScore(Manager.db, a.teamTwo, 1)
        // await avgTwoTele.runAnalysis()

        // let avgThreeAuto = new averageScore(Manager.db, a.teamThree, 0)
        // await avgThreeAuto.runAnalysis()
        // let avgThreeTele = new averageScore(Manager.db, a.teamThree, 1)
        // await avgThreeTele.runAnalysis()

        // a.totalPoints = avgOneAuto.average + avgOneTele.average + avgTwoAuto.average + avgTwoTele.average + avgThreeAuto.average + avgThreeTele.average

        // let role1 = new role(Manager.db, a.teamOne)
        // await role1.runAnalysis()

        // let role2 = new role(Manager.db, a.teamTwo)
        // await role2.runAnalysis()

        // let role3 = new role(Manager.db, a.teamThree)
        // await role3.runAnalysis()

        // let autoPathOne = new autoPaths(Manager.db, a.teamOne)
        // await autoPathOne.runAnalysis()

        // let autoPathTwo = new autoPaths(Manager.db, a.teamTwo)
        // await autoPathTwo.runAnalysis()

        // let autoPathThree = new autoPaths(Manager.db, a.teamThree)
        // await autoPathThree.runAnalysis()

        // let pointsOne = new averageScore(a.db, a.teamOne, 1)
        // await pointsOne.runAnalysis()

        // let pointsTwo = new averageScore(a.db, a.teamTwo, 1)
        // await pointsTwo.runAnalysis()

        // let pointsThree = new averageScore(a.db, a.teamThree, 1)
        // await pointsThree.runAnalysis()

        // let cones = [0, 0, 0]
        // let cubes = [0, 0, 0]
        // let teamArr = [a.teamOne, a.teamTwo, a.teamThree]
        // for (let i = 0; i < teamArr.length; i++) {
        //     for (let j = 1; j < 4; j++) {
        //         let temp = new levelCargo(Manager.db, teamArr[i], 1, j)
        //         await temp.runAnalysis()
        //         cones[j - 1] += temp.average
        //         let temp2 = new levelCargo(Manager.db, teamArr[i], 0, j)
        //         await temp2.runAnalysis()
        //         cubes[j - 1] += temp2.average

        //     }
        // }
        // let levelArr = [{}, {}, {}]
        // for (let i = 0; i < 3; i++) {
        //     let temp = { "cones": cones[i], "cubes": cubes[i] }
        //     levelArr[i] = temp

        // }
        // let oneRole = role1.defense
        // let twoRole = role2.defense
        // let threeRole = role3.defense
        // let max = math.max(oneRole, twoRole, threeRole)
        // if (max > 2) {

        //     if (oneRole === max) {
        //         oneRole = 1
        //         twoRole = 0
        //         threeRole = 0
        //     }
        //     else if (twoRole === max)
        //     {
        //         twoRole = 1
        //         oneRole = 0
        //         threeRole = 0
        //     }
        //     else
        //     {
        //         threeRole = 1
        //         twoRole = 0
        //         oneRole = 0
        //     }
        // }
        // else
        // {
        //     oneRole = role1.mainRole
        //     twoRole = role2.mainRole
        //     threeRole = role3.mainRole
        // }

        //     a.teams = [{ "team": a.teamOne, "role": oneRole, "paths": autoPathOne.finalizeResults().paths, "averagePoints" : pointsOne.average},
        //     { "role": twoRole, "team": a.teamTwo, "paths": autoPathTwo.finalizeResults().paths, "averagePoints" : pointsTwo.average},
        //     { "role": threeRole, "team": a.teamThree, "paths": autoPathThree.finalizeResults().paths, "averagePoints" : pointsThree.average}]
        //     a.levels = levelArr

        //     let total = 0
        //     var oneLinks = new links(Manager.db, a.teamOne)
        //     await oneLinks.runAnalysis()
        //     total += oneLinks.average

        //     var twoLinks = new links(Manager.db, a.teamTwo)
        //     await twoLinks.runAnalysis()
        //     total += twoLinks.average

        //     var threeLinks = new links(Manager.db, a.teamThree)
        //     await threeLinks.runAnalysis()
        //     total += threeLinks.average

        //     a.links = total





    }
        

            runAnalysis() {
            let a = this
            return new Promise(async (resolve, reject) => {
                a.getData()
                    .then((data) => {
                        a.result = data;
                        resolve("done");
                    })
                    .catch((err) => {
                        if (err) {
                            reject(err);
                            return err;
                        }
                    });

            })


        }
        finalizeResults() {
            return {
                "totalPoints": this.totalPoints,
             
            }
        }

    }