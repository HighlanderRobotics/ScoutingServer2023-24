import Manager from './Manager.js'

class GetTournaments extends Manager {
    static name = 'getTournaments'

    constructor() {
        super()
    }


    async runTask() {
        // console.log(sql)




        let { data: tournaments, error } = await this.supabase
            .from('tournaments')
            .select('*')
        if (error) {
            console.log(error)
            return error
        }
        else {
            return tournaments
        }
    }
}


export default GetTournaments
