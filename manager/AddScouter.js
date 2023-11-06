import Manager from './Manager.js'

class AddScouter extends Manager {
    static name = "addScouter"

    constructor() {
        super()
    }

    async runTask(scouterUuid, team, name) {
        const { data, error } = await this.supabase
            .from('scouters')
            .insert([
                { 'scouterUuid': scouterUuid, 'team': team, 'name': name },
            ])
            .select()
        if(error){
            console.log(error)
            return error
        }
    }
}

export default AddScouter