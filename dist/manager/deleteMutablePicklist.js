import Manager from './Manager.js';
class deleteMutablePicklist extends Manager {
    static name = "deleteMutablePicklist";
    constructor() {
        super();
    }
    async runTask(uuid) {
        //check uuid will be unique across teams
        const { data, error } = await this.supabase
            .from('mutablePicklist')
            .delete("*")
            .eq('uuid', uuid);
        if (error) {
            console.log(error);
            return error;
        }
    }
}
export default deleteMutablePicklist;
//# sourceMappingURL=deleteMutablePicklist.js.map