const { re } = require('mathjs')
const Manager = require('./Manager.js')

const deleteData = require('./deleteData.js')
const addData = require('./AddScoutReport.js')
class editData extends Manager {
    static name = "editData"

      constructor() {
        super()
    }

    async runTask(scouter_uuid, match_number, tournament_key, team, data)  {
            new deleteData().runTask(scouter_uuid, match_number, tournament_key, team)
            new addData().runTask(team, tournament_key, data)

    }
}

module.exports = editData