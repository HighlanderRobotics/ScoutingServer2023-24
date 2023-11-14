import { supabase } from './supabaseClient.js';
export const addMutablePicklist = async (req: { query: { team: any; mutablePicklistUuid: any; }; body: { teams: any; username: any; name: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    let team = req.query.team;
    let teams = req.body.teams;
    let uuid = req.query.mutablePicklistUuid;
    let username = req.body.username;
    if (team == null) {
        return ("no team");
    }
    if (uuid != null) {
        const { data: rowPicklist, error } = await supabase.from('mutablePicklist')
            .update({'teams' : teams})
            .eq('mutablePicklistUuid', uuid);
        if (error) {
            res.status(400).send(error.message);
            return
        }
        
    }
    else
    {
        const { data, error } = await supabase.from('mutablePicklist')
            .insert([
            {'teams': teams, 'team': team, 'username': username, 'name': req.body.name },
        ]);
        if (error) {
            res.status(400).send(error.message);
            return
        }
        else
        {
            res.status(200).send("done adding mutable picklist");
        }
    }
};
//# sourceMappingURL=addMutablePicklist.js.map