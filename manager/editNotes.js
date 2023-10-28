import Manager from './Manager.js'


class editNotes extends Manager {
    static name = "editNotes"

    constructor() {
        super()
    }

    async runTask(scouterUuid, newNote, tournamentKey, matchKey, teamNumber) {

        const { data, error } = await supabase
            .from('scoutReport')
            .update({ 'notes': newNote})
            .eq('scouterUuid', scouterUuid)
            .select()
        if(error){
            console.log(error)
            return error
        }
        else{
            return newNote
        }
    }
}

export default editNotes