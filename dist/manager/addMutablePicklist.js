import Manager from './Manager.js';
//adds or updates
class addMutablePicklist extends Manager {
    static name = "addMutablePicklist";
    constructor() {
        super();
    }
    async runTask(uuid, teams, name, team, username) {
        if (team == null) {
            return ("no team");
        }
        let teamsStringed = JSON.stringify(teams);
        const { data: rowPicklist, error } = await this.supabase
            .from('mutablePicklist')
            .select('*')
            .eq('uuid', uuid);
        if (error) {
            console.log(error);
            return error;
        }
        if (rowPicklist != undefined) {
            if (rowPicklist.length === 1) {
                const { error1 } = await this.supabase
                    .from('mutablePicklist')
                    .delete()
                    .eq('uuid', uuid);
                if (error1) {
                    console.log(error1);
                    return error;
                }
            }
        }
        const { data2, error2 } = await this.supabase
            .from('mutablePicklist')
            .insert([
            { 'uuid': uuid, 'teams': teams, 'team': team, 'username': username },
        ]);
        if (error2) {
            console.log(error2);
            return error2;
        }
    }
}
export default addMutablePicklist;
//# sourceMappingURL=addMutablePicklist.js.map