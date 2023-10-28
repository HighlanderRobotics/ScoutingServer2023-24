import Manager from './Manager.js'


import axios from "axios"


class AddAPITournaments extends Manager {
    static name = "addAPITournaments"


    constructor() {
        super()
    }


    async runTask(year) {
        var url = 'https://www.thebluealliance.com/api/v3'

        return new Promise((resolve, reject) => {
            axios.get(`${url}/events/2022/simple`, {
                headers: { 'X-TBA-Auth-Key': process.env.KEY }
            })
                .then(async (response) => {
                    for (var i = 0; i < response.data.length; i++) {
                        await insertTournament(response, i)
                            .catch((err) => {
                                if (err) {
                                    // console.log(`Error with inserting tournament: ${err}`)
                                    reject({
                                        "result": `Error with inserting tournament: ${err}`,
                                        "customCode": 500
                                    })
                                }
                            })
                    }
                    console.log(`Inserted Tournaments for ${year}`)
                    resolve()
                })
                .catch((err) => {
                    if (err) {
                        console.log(err)
                        reject({
                            "result": `Error with getting TBA data: ${err}`,
                            "customCode": 500
                        })
                    }
                })
        })


    }
    async insertTournament(response, i) {
        // Manager.db.run(sql, [response.data[i].name, response.data[i].city, response.data[i].start_date, response.data[i].key], (err) => {
        const { data, error } = await supabase
            .from('tournaments')
            .insert([
                { 'name': response.data[i].name, 'location': response.data[i].city, 'date': response.data[i].start_date, 'tournamentKey': response.data[i].key },
            ])
            .select()
        if (error) {
            console.log(error)
            return error
        }
    }
}


export default AddAPITournaments
