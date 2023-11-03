import Manager from './Manager.js';
import axios from "axios";
import { resolve, row } from 'mathjs';
class getPicklists extends Manager {
    static name = "getPicklists";
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
            return sharedPicklist;
        }
    }
}
export default getPicklists;
//# sourceMappingURL=getPicklists.js.map