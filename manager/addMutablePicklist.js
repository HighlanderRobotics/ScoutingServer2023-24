import Manager from './Manager.js'

//adds or updates

class addMutablePicklist extends Manager {
    static name = "addMutablePicklist"

    constructor() {
        super()
    }

    async runTask(scouterUuid, teams, team, username) {
        if (team == null) {
            return ("no team")
        }
        let teamsStringed = JSON.stringify(teams)

        const { data, error } = await supabase
            .from('mutablePicklist')
            .insert([
                { 'scouterUuid': scouterUuid, 'teams': teams, 'team': team, 'username': username },
            ])
            .eq('scouterUuid', scouterUuid)
            .select()
        if (error) {
            console.log(error)
            return error
        }
        if (rows != undefined) {


            if (rows.length === 1) {
                const { error1 } = await supabase
                    .from('mutablePicklist')
                    .delete()
                    .eq('scouterUuid', scouterUuid)
                if (error1) {
                    console.log(error1)
                    return error
                }
            }
        }
        const { data2, error2 } = await supabase
            .from('mutablePicklist')
            .insert([
                { 'scouterUuid': scouterUuid, 'teams': teams, 'team': team, 'username': username },
            ])
            .eq('scouterUuid', scouterUuid)
            .select()
        if (error2) {
            console.log(error2)
            return error2
        }
        if (rows != undefined) {


            if (rows.length === 1) {
                const { error1 } = await supabase
                    .from('mutablePicklist')
                    .delete()
                    .eq('scouterUuid', scouterUuid)
                if (error1) {
                    console.log(error1)
                    return error
                }
            }
        }
    }
}

export default addMutablePicklist