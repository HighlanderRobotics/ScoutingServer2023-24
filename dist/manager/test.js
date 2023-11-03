// test.js
import { resolve } from 'path';
import Manager from './Manager.js';
import fs from 'fs';
class test extends Manager {
    static name = 'test';
    constructor() {
        super();
    }
    async runTask() {
        let { data: scouters, error } = await this.supabase
            .from('scouters')
            .select('*');
        if (error) {
            console.log(error);
        }
        console.log(scouters);
        return scouters;
    }
}
export default test;
//# sourceMappingURL=test.js.map