import dotenv from 'dotenv';
dotenv.config();



//this will allow us to pull params from .env fil
// HTTPS
const port = process.env.PORT 

// Task Managers
import TaskManager from './TaskManager.js'
import DatabaseManager from './DatabaseManager.js'

// const app = express()
// app.use(express.json())

// Terminal QR Code
import qrcode from'qrcode-terminal'

//socket io



import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();


import bodyParser from 'body-parser';
app.use(bodyParser.json());


import cors from 'cors';


// Use this to allow all CORS requests




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});




app.get('/', async (req, res) => {
    res.status(200).send(`All good my dude`)
})

// Manager


app.post('/API/manager/:task', async (req, res) => {
    const task = req.params.task || req.body.task;
    if (!task) {
        return res.status(404).send('Missing Task Name');
    }

    try {
        const result = await new DatabaseManager().runTask(task, req.body);
        res.status(200).send(result);
    } catch (err) {
        console.error('Detected error:', err);
        const statusCode = err.customCode || 400;
        res.status(statusCode).send(err);
    }
});

// Analysis
app.post('/API/analysis', async (req, res) => {
    
    // Run analysis engine
    if (req.body.uuid) {
        if (req.body.tasks) {
            let taskNumber = uuidToTask.size
            uuidToTask.set(req.body.uuid, taskNumber)
            tasks.set(taskNumber, new TaskManager().runTasks(req.body.tasks))

            res.status(200).send(`Task Number: ${taskNumber}`)
        } else {
            res.status(400).send(`Missing tasks`)
        }
    } else {
        res.status(400).send(`Missing uuid`)
    }
})

app.get('/API/analysis/:task', async (req, res) => {
    // Run analysis engine
    if (req.query) {
        singleTask = [
            {
                'name': req.params.task,
            }
        ]
        Object.keys(req.query).forEach((key) => {
            singleTask[0][`${key}`] = req.query[key]
        })

        let results = await new TaskManager().runTasks(singleTask)
        

        // console.log(`Results: ${JSON.stringify(results)}`)
        res.status(200).send(results)
    } else {
        res.status(400).send(`Missing tasks`)
    }
})

// Reset DB (testing only)
app.post('/resetDB', async (req,res) => {
    if (req.body.uuid) {
        let taskNumber = uuidToTask.size
        uuidToTask.set(req.body.uuid, taskNumber)
        tasks.set(taskNumber, Manager.resetAndPopulateDB())
        res.status(200).send(`${JSON.stringify({'taskNumber': taskNumber})}`)
    } else {
        res.status(400).send(`Missing uuid`)
    }
})

// Old system
const promiseWithTimeout = ((promise) => {
    // Times out after 1 ms, assumes promise is still pending (usually takes ~0ms)
    var timeOutTime = 1

    const timeoutPromise = new Promise(async (resolve, reject) => {
        setTimeout(resolve, timeOutTime, `Requested task is unfinished, come back later`)
    })

    return Promise.race([promise, timeoutPromise])
})

app.get('/getTaskData', async (req,res) => {
    // Get cached/Rerun analysis engine and send it

    if (req.body.taskNumber != undefined && req.body.taskNumber < tasks.size) {
        console.log(`Task Number: ${req.body.taskNumber}`)

        promiseWithTimeout(tasks.get(req.body.taskNumber))
        .then((response) => {
            // console.log(response)
            res.status(200).send(`${JSON.stringify(response)}`)
        })
    } else if (req.body.uuid != undefined && Array.from(uuidToTask.values()).includes(req.body.uuid)) {
        console.log(`UUID: ${req.body.uuid}`)

        promiseWithTimeout(tasks.get(uuidToTask.get(req.body.uuid)))
        .then((response) => {
                res.status(200).send(`${JSON.stringify(response)}`)
        })
    } else {
        res.status(400).send(`Missing task number or uuid or task number/uuid doesn't have a task`)
        return
    }
})