import { supabase } from './supabaseClient.js';
import axios from "axios";
import { addData } from './addData.js';
import {deleteData} from './deleteData.js';
export const editData = async (req: any, res: any) => {


    deleteData(req, res)
    addData(req, res)

    res.status(200).send('done editing data')
}









