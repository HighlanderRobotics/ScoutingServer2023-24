import { supabase } from './supabaseClient.js';
import axios from "axios";
export const addAPITeams = async (req: any, res: any) => {
    var url = 'https://www.thebluealliance.com/api/v3'

    try {
        return await new Promise(async (resolve, reject) => {
            for (var j = 0; j < 18; j++) {
                console.log(`Inserting teams ${Math.round((j / 18) * 100)}%`);
                await axios.get(`${url}/teams/${j}/simple`, {
                    headers: { 'X-TBA-Auth-Key': process.env.KEY }
                })
                    .then(async (response) => {
                        for (var i = 0; i < response.data.length; i++) {



                            let { data, error } = await supabase
                                .from('teams')
                                .insert([
                                    { key: response.data[i].key, teamNumber: response.data[i].team_number, teamName: response.data[i].nickname },
                                ])
                                .select();
                            if (error) {
                                res.status(400).send(error);
                            }

                        }
                    });
            }
        });
    } catch (err) {
        if (err) {
            res.status(400).send(err);
        }
    }
    res.status(400).send("done inserting API teams");

}







