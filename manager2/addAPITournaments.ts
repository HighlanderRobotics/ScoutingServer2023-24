import { supabase } from './supabaseClient.js';
import axios from "axios";
export const addAPITournaments = async (req: any, res: any) => {
    var url = 'https://www.thebluealliance.com/api/v3'

    return new Promise((resolve, reject) => {
        axios.get(`${url}/events/2022/simple`, {
            headers: { 'X-TBA-Auth-Key': process.env.KEY }
        })
            .then(async (response) => {
                for (var i = 0; i < response.data.length; i++) {
                    const { data, error } = await supabase
                        .from('tournaments')
                        .insert([
                            { 'name': response.data[i].name, 'location': response.data[i].city, 'date': response.data[i].start_date, 'tournamentKey': response.data[i].key },
                        ])
                        .select()
                    if (error) {
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
                console.log(`Inserted Tournaments for ${res.query.year}`)
                res.status(400).send("done inserting API teams");
            })
            .catch((err) => {
                if (err) {
                    res.status(400).send(err);
                }
            })
        res.status(200).send("addAPITournaments done");

    })
}







