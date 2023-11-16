import dotenv from 'dotenv';
dotenv.config();



//this will allow us to pull params from .env fil
// HTTPS
const port = process.env.PORT 


import express from 'express';

const app = express();

import bodyParser from 'body-parser';
import { addAPITeams } from './dist/manager2/addAPITeams.js';
import { addAPITournaments } from './dist/manager2/addAPITournaments.js';
import { addScouterSchedule } from './dist/manager2/addScouterSchedule.js';
import { editData } from './dist/manager2/editData.js';
import { deleteData } from './dist/manager2/deleteData.js';
import { addData } from './dist/manager2/addData.js';
import { getTeams } from './dist/manager2/getTeams.js';
import { deleteScouterSchedule } from './dist/manager2/deleteScouterSchedule.js';
import {getScouterSchedule} from './dist/manager2/getScouterSchedule.js';
import { updateScouterSchedule } from './dist/manager2/updateScouterSchedule.js';
import { addScouter } from './dist/manager2/addScouter.js';
import { addPicklist } from './dist/manager2/addPicklist.js';
import { deletePicklist } from './dist/manager2/deletePicklist.js';
import { getPicklists } from './dist/manager2/getPicklist.js';
import { addMutablePicklist } from './dist/manager2/addMutablePicklist.js';
import { getMutablePicklists } from './dist/manager2/getMutablePicklists.js';
import { deleteMutablePicklist } from './dist/manager2/deleteMutablePicklist.js';
import { addRegisteredTeam } from './dist/manager2/addRegisteredTeam.js';
import { addTournament } from './dist/manager2/addTournament.js';
import { getTeamsInTournament } from './dist/manager2/getTeamsInTournament.js';
import { getMatches } from './dist/manager2/getMatches.js';
import { newUser } from './dist/manager2/newUser.js';
import { isCodeCorrect } from './dist/manager2/isCodeCorrect.js';
import { deleteRegisteredTeam } from './dist/manager2/deleteRegisteredTeam.js';


app.use(bodyParser.json());



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});




app.get('/', async (req, res) => {
    res.status(200).send(`All good my dude`)
})
app.post('/API/manager/addAPITeams',  addAPITeams)
app.post('/API/manager/addAPITournaments', addAPITournaments)
app.post('/API/manager/addScouterSchedule', addScouterSchedule)
app.post('/API/manager/editData', editData)
app.delete('/API/manager/deleteData', deleteData)
app.post('/API/manager/addData', addData)
app.get('/API/manager/getTeams', getTeams)
app.delete('/API/manager/deleteScouterSchedule', deleteScouterSchedule)
app.get('/API/manager/getScouterSchedule', getScouterSchedule)
app.post('/API/manager/updateScouterSchedule', updateScouterSchedule)
app.post('/API/manager/addScouter', addScouter)
app.post('/API/manager/addPicklist', addPicklist)
app.delete('/API/manager/deletePicklist', deletePicklist)
app.get('/API/manager/getPicklists', getPicklists)
app.post('/API/manager/addMutablePicklist', addMutablePicklist)
app.get('/API/manager/getMutablePicklists', getMutablePicklists)
app.delete('/API/manager/deleteMutablePicklist', deleteMutablePicklist)
app.post('/API/manager/addRegisteredTeam', addRegisteredTeam)
app.delete('/API/manager/deleteRegisteredTeam', deleteRegisteredTeam)
app.post('/API/manager/addTournament', addTournament)
app.get('/API/manager/newUser', newUser)
app.get('/API/manager/getTeamsInTournament', getTeamsInTournament)
app.get('/API/manager/getMatches', getMatches)
app.get('/API/manager/isCodeCorrect', isCodeCorrect)
app.get('/API/manager/newUser', newUser)





