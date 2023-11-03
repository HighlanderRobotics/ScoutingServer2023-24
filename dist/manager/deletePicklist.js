import Manager from './Manager.js';
class deletePicklist extends Manager {
    static name = "deletePicklist";
    constructor() {
        super();
    }
    async runTask(scouterUuid) {
        const { data, error } = await this.supabase
            .from('sharedPicklist')
            .eq('scouterUuid', scouterUuid)
            .select();
        if (error) {
            console.log(error);
            return error;
        }
    }
}
export default deletePicklist;
//# sourceMappingURL=deletePicklist.js.map