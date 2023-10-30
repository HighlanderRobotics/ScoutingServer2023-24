
import Manager from './Manager.js'

class deleteMutablePicklist extends Manager {
    static name = "deleteMutablePicklist"

    constructor() {
        super()
    }

    async runTask(scouterUuid) {
        //check uuid will be unique across teams
        const { data, error } = await this.supabase
            .from('mutablePicklist')
            .eq('scouterUuid', scouterUuid)
            .select()

        if (error) {
            console.log(error)
            return error
        }
    }
}


export default deleteMutablePicklist