import Manager from './Manager.js';
import axios from "axios";
import { resolve, row } from 'mathjs';
class getMutablePicklists extends Manager {
    static name = "getMutablePicklists";
    constructor() {
        super();
    }
    async runTask(team) {
        if (team == null) {
            return ("no team");
        }
        let { data: sharedPicklist, error } = await this.supabase
            .from('sharedPicklist')
            .select('*');
        if (error) {
            console.log(error);
            return error;
        }
        else {
            resolve(sharedPicklist.map((row) => ({
                ...row,
                teams: JSON.parse(row.teams).map(team => parseInt(team)),
            })));
        }
    }
}
export default getMutablePicklists;
//# sourceMappingURL=getMutablePicklists.js.map