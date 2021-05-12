const URL = 'https://api.github.com/';

export class API {
    async loadAccounts(value) {
        return await fetch(`${URL}search/repositories?q=${value}in:name&per_page=5&sort=stars`).then(res => res)
    }

}