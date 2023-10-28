import { re } from 'mathjs'
import Manager from './Manager.js'
class getScoutReport extends Manager {
    static name = "getScoutReport"

    constructor() {
        super()
    }

    async runTask(matchKey) {

        const { data, error } = await supabase
            .from('data')
            .select('*')
            .eq('matchKey', matchKey);
        if(error){
            console.log(error)
            return error
        }
    }
}

export default getScoutReport