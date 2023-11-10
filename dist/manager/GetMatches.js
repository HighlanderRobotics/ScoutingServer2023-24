import { modifierNames } from 'chalk';
import Manager from './Manager.js';
class GetMatches extends Manager {
    static name = 'getMatches';
    constructor() {
        super();
    }
    async runTask(tournamentKey) {
        let modifiedMatches = [];
        const { data: matches, error } = await this.supabase
            .from('matches')
            .select('*')
            .eq('tournamentKey', tournamentKey)
            .order('matchNumber');
        if (error) {
            console.log(error);
            return error;
        }
        else if (matches.length == 0) {
            // No matches found
            console.log(`No matches found for ${tournamentKey}`);
            reject({
                "result": `No matches found for ${tournamentKey}`,
                "customCode": 406
            });
        }
        else {
            let largestQm = matches[0].matchNumber;
            matches.forEach((match) => {
                if (match.matchType === 'qm') {
                    // Remove tournamentKey from the matchKey as requested
                    match.matchKey = match.key.substring(tournamentKey.length + 1);
                    if (match.matchNumber > largestQm) {
                        largestQm = match.matchNumber;
                    }
                }
            });
            matches.forEach((match) => {
                // console.log(match)
                let temp = { key: match.key, team: match.teamKey };
                if (match.matchType !== 'qm') {
                    temp.ordinalNumber = match.matchNumber + largestQm;
                }
                else {
                    temp.ordinalNumber = match.matchNumber;
                }
                modifiedMatches.push(temp);
            });
            return modifiedMatches;
            let { data: matches2, error } = await this.supabase
                .from('matches')
                .select('*')
                .eq('tournamentKey', tournamentKey);
            if (matches2.length === 0) {
                this.AddTournamentMatches;
            }
            if (matches.length > 0) {
                return matches;
            }
            else {
                return "Could not find matches";
            }
        }
    }
}
export default GetMatches;
//# sourceMappingURL=GetMatches.js.map