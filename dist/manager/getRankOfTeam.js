import Manager from './Manager.js';
import { resolve } from 'mathjs';
import axios from 'axios';
class getRankOfTeam extends Manager {
    static name = "getRankOfTeam";
    constructor() {
        super();
    }
    async runTask(teamKey, eventKey) {
        var url = 'https://www.thebluealliance.com/api/v3';
        if (eventKey === undefined) {
            resolve("-");
        }
        return new Promise((resolve, reject) => {
            axios.get(`${url}/event/${eventKey}/rankings`, {
                headers: { 'X-TBA-Auth-Key': process.env.KEY }
            })
                .then(async (response) => {
                for (let i = 0; i < response.data.rankings.length; i++) {
                    if (response.data.rankings[i].team_key === teamKey) {
                        let x = response.data.rankings[i].rank;
                        resolve(x.toString());
                    }
                }
                resolve("-");
            })
                .catch(err => {
                resolve("-");
            });
        });
    }
}
export default getRankOfTeam;
//# sourceMappingURL=getRankOfTeam.js.map