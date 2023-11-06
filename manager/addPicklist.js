import Manager from './Manager.js'

class addPicklist extends Manager {
    static name = "addPicklist"

      constructor() {
        super()
    }

    async runTask(name,  avgTotal,  team, userName) {
        if(team == null)
        {
            return("no team")
        }

        let { data: sharedPicklist, error } = await this.supabase
        .from('sharedPicklist')
        .insert([{'name' : name, 'team' : team, 'username' : userName, 'avgTotal' : avgTotal}])
      
                if (error) {
                    console.log(error)
                }
               

    }
}

export default addPicklist