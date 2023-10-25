//given a specific team and match this will give the following stats for that match only:
//auto path, auto points, auto charge, driver ability, role, notes, links, cones and cubes w level breakdown
	

import BaseAnalysis  from'./BaseAnalysis';

class teamAndMatch extends BaseAnalysis {
    private team : number
    private teamKey : string
    private matchKey : string
    private teamsThatScouted : number[]
    private result: any
    constructor(team: number, matchKey: string, teamsThatScouted: number[]) {
        super()
        this.team = team
        this.teamKey = "ftc" + team
        this.matchKey = matchKey
        this.teamsThatScouted = teamsThatScouted
    }
    async getData() {
        let a = this

        // return new Promise(async (resolve, reject) => {

        //     let metrics = {}
        //     let i = -1;
        //     var autoScore = new averageScore(a.db, a.team, 0)
        //     await autoScore.runAnalysis()
        //     let autoScoreArr = autoScore.finalizeResults().array
        //     if(autoScoreArr.length == 0)
        //     {
        //         resolve(null)
        //         return
        //     }
        //     for(let j = 0; j < autoScore.finalizeResults().array.length; j ++)
        //     {
        //         // console.log(autoScoreArr[j])
        //         if(autoScoreArr[j].match == a.matchKey)
        //         {
        //             i = j;
        //             break
        //         }
        //     }
        //     if(i == -1)
        //     {
        //         resolve(null)
        //         return
        //     }
        //     metrics.autoScore = autoScoreArr[i]



        //     var autoPath = new autoPaths(a.db, a.team)
        //     await autoPath.runAnalysis()
        //     let paths = autoPath.finalizeResults().paths
        //     metrics.autoPath = null
        //     for(const key in autoPath.finalizeResults().paths)
        //     {
        //         // if(value.match)
        //         // {
                    
        //         // }
        //         if(paths[key].matches.includes(a.matchKey))
        //         {
        //             metrics.autoPath = paths[key]
        //         }
        //     }

        //     var driverAbility = new driverAbilityTeam(a.db, a.team)
        //     await driverAbility.runAnalysis()
        //     metrics.driverAbility = driverAbility.array[i]

        //     var role = new roles(a.db, a.team)
        //     await role.runAnalysis()
        //     metrics.role = role.finalizeResults().array[i].value

        //     var note = new notes(a.db, a.team)
        //     await note.runAnalysis()
        //    let tempNotes = note.finalizeResults().result
        //     // metrics.notes = note.finalizeResults().result[i].notes
        //     metrics.notes = []
        //     for(let i = 0; i < tempNotes.length; i ++)
        //     {
        //         if(tempNotes[i].matchKey == a.matchKey && tempNotes[i].notes != "")
        //         {
        //             metrics.notes.push(tempNotes[i])
        //         }
        //     }
        //     // console.log(note.finalizeResults().result)

        //     var teleScore = new averageScore(a.db, a.team, 1)
        //     await teleScore.runAnalysis()
        //     metrics.teleScore = teleScore.finalizeResults().array[i].value

        //     var levelOneCone = new levels(a.db, a.team, 1, 1)
        //     await levelOneCone.runAnalysis()
        //     metrics.levelOneCone = levelOneCone.finalizeResults().array[i].value

        //     var levelTwoCone = new levels(a.db, a.team, 1, 2)
        //     await levelTwoCone.runAnalysis()
        //     metrics.levelTwoCone = levelTwoCone.finalizeResults().array[i].value

        //     var levelThreeCone = new levels(a.db, a.team, 1, 3)
        //     await levelThreeCone.runAnalysis()
        //     metrics.levelThreeCone = levelThreeCone.finalizeResults().array[i].value

        //     var levelOneCube = new levels(a.db, a.team, 0, 1)
        //     await levelOneCube.runAnalysis()
        //     metrics.levelOneCube = levelOneCube.finalizeResults().array[i].value

        //     var levelTwoCube = new levels(a.db, a.team, 0, 2)
        //     await levelTwoCube.runAnalysis()
        //     metrics.levelTwoCube = levelTwoCube.finalizeResults().array[i].value

        //     var levelThreeCube = new levels(a.db, a.team, 0, 3)
        //     await levelThreeCube.runAnalysis()
        //     metrics.levelThreeCube = levelThreeCube.finalizeResults().array[i].value
          
        //     resolve({metrics})
        // })
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
            "result": this.result,
            "team": this.team
        }
    }

}
export = teamAndMatch;

