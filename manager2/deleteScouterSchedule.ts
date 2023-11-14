import { supabase } from './supabaseClient.js';
export const deleteScouterSchedule = async (req: any, res: any) => {

    const { data, error } = await supabase.from('scouterSchedule')
        .delete()
        .eq('scouterScheduleUuid', req.query.scouterScheduleUuid)


    if (error) {
        res.status(400).send(error)
    }

    res.status(200).send('done deleting scouter schedule')
}









