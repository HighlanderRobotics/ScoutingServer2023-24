// Assuming you're using ES6 style imports
// import Manager from '../manager/Manager.js';

abstract class BaseAnalysis {
    public knex: any;

    constructor() {

        this.knex = require('knex')({
            client: 'sqlite3',
            connection: {
                filename: "./mydb.sqlite"
            }
            // update ^^
        });
    }


    abstract runAnalysis(): any;

    abstract finalizeResults(result: any): any;
}

export default BaseAnalysis
