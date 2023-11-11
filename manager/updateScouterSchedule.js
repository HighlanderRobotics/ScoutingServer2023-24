import Manager from "./Manager.js";
import addScouterSchedule from "./addScouterSchedule.js";
import deleteScouterSchedule from "./deleteScouterSchedule.js";
class updateScouterSchedule extends Manager {
  static name = "updateScouterSchedule"

  constructor() {
    super()
  }

  async runTask(sourceTeam, startMatch, endMatch, tournamentKey, team1, team2, team3, team4, team5, team6) {
    new deleteScouterSchedule().runTask(scourceTeam, tournamentKey)
    new addScouterSchedule().runTask(sourceTeam, startMatch, endMatch, tournamentKey, team1, team2, team3, team4, team5, team6)

  }
}

export default updateScouterSchedule