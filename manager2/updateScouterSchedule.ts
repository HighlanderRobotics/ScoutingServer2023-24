import { deleteScouterSchedule } from './deleteScouterSchedule.js';
import { addScouterSchedule } from './addScouterSchedule.js';

import { supabase } from './supabaseClient.js';

export const updateScouterSchedule = async (req: any, res: any) => {

    deleteScouterSchedule(req, res)
    addScouterSchedule(req, res)

    res.status(200).send('done updating scouter schedule')
}









