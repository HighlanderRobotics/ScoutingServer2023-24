import Manager from './Manager.js';
class addPicklist extends Manager {
    static name = "addPicklist";
    constructor() {
        super();
    }
    async runTask(uuid, name, cubeOneScore, cubeTwoScore, cubeThreeScore, coneOneScore, coneTwoScore, coneThreeScore, autoCargo, teleopScore, defenseScore, autoClimb, feedCone, feedCube, avgTotal, teleopClimb, driverAbility, team, userName) {
        if (team == null) {
            return ("no team");
        }
        let { data: sharedPicklist, error } = await this.supabase;
        // .from('sharedPicklist')
        // .select("*")
        // // Filters
        // .eq('column', 'Equal to')
        // .gt('column', 'Greater than')
        // .lt('column', 'Less than')
        // .gte('column', 'Greater than or equal to')
        // .lte('column', 'Less than or equal to')
        // .like('column', '%CaseSensitive%')
        // .ilike('column', '%CaseInsensitive%')
        // .is('column', null)
        // .in('column', ['Array', 'Values'])
        // .neq('column', 'Not equal to')
        // // Arrays
        // .cs('array_column', ['array', 'contains'])
        // .cd('array_column', ['contained', 'by'])
        if (error) {
            console.log(error);
            reject(error);
        }
        if (rows.length == 1) {
            if (error) {
                console.log(error);
            }
        }
        [uuid, name, cubeOneScore, cubeTwoScore, cubeThreeScore, coneOneScore, coneTwoScore, coneThreeScore, autoCargo, teleopScore, defenseScore, autoClimb, feedCone, feedCube, avgTotal, teleopClimb, driverAbility, team, userName];
        if (error) {
            console.log(error);
            reject(error);
        }
        resolve("done");
    }
}
export default addPicklist;
//# sourceMappingURL=addPicklist.js.map