import Manager from './Manager.js';
class GetTeams extends Manager {
    static name = 'getTeams';
    constructor() {
        super();
    }
    async runTask() {
        let { data: teams, error } = await this.supabase
            .from('teams')
            .select('*');
        if (error) {
            console.log(error);
            return error;
        }
        else {
            return teams;
        }
    }
}
export default GetTeams;
//# sourceMappingURL=GetTeams.js.map