import Manager from './Manager.js';
import axios from "axios";
import { resolve, row } from 'mathjs';
import deleteData from './deleteData.js';
import addData from './AddScoutReport.js';
class editData extends Manager {
    static name = "editData";
    constructor() {
        super();
    }
    async runTask(scouter_uuid, match_number, tournament_key, team, data) {
        new deleteData().runTask(scouter_uuid, match_number, tournament_key, team);
        new addData().runTask(team, tournament_key, data);
    }
}
export default editData;
//# sourceMappingURL=editData.js.map