// import Manager from('./manager/Manager.js')
import AddScoutReport from './manager/AddScoutReport.js'
import GetTeams from'./manager/GetTeams.js'
import AddAPITeams from'./manager/AddAPITeams.js'
import AddAPITournaments from'./manager/AddAPITournaments.js'
import AddScouter from'./manager/AddScouter.js'
import AddTournamentMatches from'./manager/AddTournamentMatches.js'
import IsScouted from'./manager/IsScouted.js'
import GetMatches from'./manager/GetMatches.js'
import IsMatchesScouted from'./manager/IsMatchesScouted.js'
import MatchesCompleted from'./manager/MatchesCompleted.js'
import GetTeamsInTournament from'./manager/GetTeamsInTournament.js'
import GetTournaments from'./manager/GetTournaments.js'
import deletePicklist from'./manager/deletePicklist.js'
import getPicklists from'./manager/getPicklists.js'
import addPicklist from'./manager/addPicklist.js'
import addMutablePicklist from'./manager/addMutablePicklist.js'
import deleteMutablePicklist from'./manager/deleteMutablePicklist.js'
import getMutablePicklists from'./manager/getMutablePicklists.js'
import deleteData from'./manager/deleteData.js'
import editNotes from'./manager/editNotes.js'
import getScoutReport from'./manager/getScoutReport.js'
import getRankOfTeam from'./manager/getRankOfTeam.js'
import editData from'./manager/editData.js'
import addMatch from'./manager/addMatch.js'
import AddTournament from './manager/AddTournament.js'
import AddCustomMatch from './manager/AddCustomMatch.js'
import deleteCustomMatch from './manager/deleteCustomMatch.js'
import test from './manager/test.js'


class DatabaseManager {
    constructor() {
        
    }

    runTask(task, body) {
        // return new Promise(async (resolve, reject) => {
            switch (task) {
                case AddScoutReport.name:
                    // Different naming scheme is because of Jacob
                    return new AddScoutReport().runTask(body.sourceTeam, body.tournamentKey, body.data)
                case GetTeams.name:
                    return new GetTeams().runTask()
                // case InitServer.name:
                //     return new InitServer().runTask()
                // case ResetAndPopulate.name:
                //     return new ResetAndPopulate().runTask()
                case AddAPITeams.name:
                    return new AddAPITeams().runTask()
                case AddAPITournaments.name:
                    return new AddAPITournaments().runTask(body.year)
                case AddTournamentMatches.name:
                    return new AddTournamentMatches().runTask(body.tournamentKey)
                case IsScouted.name:
                    return new IsScouted().runTask(body.tournamentKey, body.matchKey, body.sourceTeam)
                // case GetScoutersSchedule.name:
                //     return new GetScoutersSchedule().runTask()
                // case UpdateScoutersSchedule.name:
                //     return new UpdateScoutersSchedule().runTask(body)
                case AddScouter.name:
                    return new AddScouter().runTask(body.scouterUuid, body.team, body.name)
                case GetMatches.name:
                    return new GetMatches().runTask(body.tournamentKey)
                case IsMatchesScouted.name:
                    return new IsMatchesScouted().runTask(body.tournamentKey, body.scouterName, body.matchKeys)
         
                case MatchesCompleted.name:
                    return new MatchesCompleted().runTask(body)
                case GetTeamsInTournament.name:
                    return new GetTeamsInTournament().runTask(body.tournamentKey)
                case GetTournaments.name:
                    return new GetTournaments().runTask()
                case deletePicklist.name:
                    return new deletePicklist().runTask(body.uuid)
                case getPicklists.name:
                    return new getPicklists().runTask(body.team)
                case addPicklist.name:
                    return new addPicklist().runTask(body.name, body.avgTotal, body.team, body.userName)
                case addMutablePicklist.name:
                    //works as edit or add
                    return new addMutablePicklist().runTask(body.uuid, body.name, body.teams, body.team, body.userName)
                case deleteMutablePicklist.name:
                    return new deleteMutablePicklist().runTask(body.uuid)
                case getMutablePicklists.name:
                    return new getMutablePicklists().runTask(body.team)
                case deleteData.name:
                    return new deleteData().runTask(body.scouterUuid, body.matchNumber, body.tournamentKey)
                case editNotes.name:
                    return new editNotes().runTask(body.uuid, body.newNote) 
                case getScoutReport.name:
                    return new getScoutReport().runTask(body.matchKey)
                case getRankOfTeam.name:
                    return new getRankOfTeam().runTask(body.teamKey, body.tournamentKey)
                case editData.name:
                    return new editData().runTask(body.uuid, body.matchKey, body.scouterName, body.startTime, body.scoutReport, body.notes)
                // case addMatch.name:
                //     return new addMatch().runTask(body)
       
                case AddTournament.name:
                    return new AddTournament().runTask(body.key, body.name, body.location, body.date)
                case AddCustomMatch.name:
                    return new AddCustomMatch().runTask(body.tournamentKey, body.matchNumber, body.matchType, body.teams)
                case deleteCustomMatch.name:
                    return new deleteCustomMatch().runTask(body.tournamentKey, body.matchNumber, body.matchType)
                // case test.name:
                //     return new test().runTask()
                

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

export default DatabaseManager
