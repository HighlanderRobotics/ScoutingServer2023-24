"use strict";

// Importing the necessary modules using ES6 syntax
import knex from 'knex';

class BaseAnalysis {
    constructor() {
        this.knex = knex({
            client: 'sqlite3',
            connection: {
                filename: "./mydb.sqlite"
            }
        });
    }
}

export default BaseAnalysis;
