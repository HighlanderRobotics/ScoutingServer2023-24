import Manager from './Manager.js'

class AddScouter extends Manager {
    static name = "addScouter"

    constructor() {
        super()
    }

    async runInsertScouters(scouterUuid, team, name) {
        const { data, error } = await supabase
            .from('scouters')
            .insert([
                { 'scouterUuis': scouterUuid, 'team': team, 'name': name },
            ])
            .select()
        if(error){
            console.log(error)
            return error
        }
    }
}

export default AddScouter