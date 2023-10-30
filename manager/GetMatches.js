import Manager from './Manager.js'

class GetMatches extends Manager {
    static name = 'getMatches'

    constructor() {
        super()
    }

    async runTask(body) {
        const { data, error } = await this.supabase
            .from('match')
            .select('*')
            .eq('tournamentKey', body.tournamentKey)
            .order('matchNumber');
        if (error) {
            console.log(error)
            return error
        }
        else if (matches.length == 0) {
            // No matches found
            console.log(`No matches found for ${body.tournamentKey}`)
            reject({
                "result": `No matches found for ${body.tournamentKey}`,
                "customCode": 406
            })
        } else {
            let largestQm = matches[0].matchNumber
            matches.forEach((match) => {
                if (match.matchType === 'qm') {
                    // Remove tournamentKey from the matchKey as requested
                    match.matchKey = match.key.substring(body.tournamentKey.length + 1)
                    if (match.matchNumber > largestQm) {
                        largestQm = match.matchNumber
                    }
                }
            })


            matches.forEach((match) => {
                // console.log(match)
                let temp = { key: match.key, team: match.teamKey }

                if (match.matchType !== 'qm') {

                    temp.ordinalNumber = match.matchNumber + largestQm
                }
                else {
                    temp.ordinalNumber = match.matchNumber
                }
                modifiedMatches.push(temp)

            })

            resolve(modifiedMatches)
        }
    }
}
export default GetMatches