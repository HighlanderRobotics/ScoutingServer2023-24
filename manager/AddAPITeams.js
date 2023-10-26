import Manager from './Manager.js'
import axios from "axios";

class AddAPITeams extends Manager {
    static name = "addAPITeams"

    constructor() {
        super()
    }

    async runTask() {
        var url = 'https://www.thebluealliance.com/api/v3'
        
        return new Promise(async (resolve, reject) => {
            for (var j = 0; j < 18; j++) {
                console.log(`Inserting teams ${Math.round((j / 18) * 100)}%`)
                await axios.get(`${url}/teams/${j}/simple`, {
                    headers: { 'X-TBA-Auth-Key': process.env.KEY }
                })
                    .then(async (response) => {
                        for (var i = 0; i < response.data.length; i++) {
                            await this.insertTeam( response, i)
                                .catch((err) => {
                                    reject({
                                        "result": `Error inserting team into database: ${err}`,
                                        "customCode": 500
                                    })
                                })
                        }
                    }).catch(err => {
                        if (err) {
                            console.error(`Error with getting teams from TBA API: ${err}`)
                            reject({
                                "result": `Error with getting teams from TBA API: ${err}`,
                                "customCode": 500
                            })
                        }
                    }).then(() => {
                        if (j === 17) {
                            console.log(`Finished inserting API teams`)
                        }
                    })
            }
            resolve()
        })
    }
    async  insertTeam(response, i) {

        let { data, error } = await this.supabase.from('teams')
            .insert([
                { key: response.data[i].key, teamNumber: response.data[i].team_number, teamName: response.data[i].nickname },
            ])
            .select()
            if(error)
            {
                console.log(error)
            }


    }
}

export default AddAPITeams