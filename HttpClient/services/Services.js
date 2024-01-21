class Services {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async get(endpoint, queryParams = {}) {
        try {
            const url = new URL(`${this.baseURL}/${endpoint}`);
            Object.keys(queryParams)
                .forEach(
                    key => url.searchParams.append(key, queryParams[key])
                );

            const response = await fetch(url.toString());

            if(!response.ok) 
                throw new UIError(response.status, response.statusText);
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao chamar a API: ', error);
            throw error;
        }
    }

    async post(endpoint, data) {
        try {
            const url = new URL(`${this.baseURL}/${endpoint}`);
            const response = await fetch(url.toString(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if(!response.ok) 
                throw new UIError(response.status, response.statusText);

            return await response.json();
        } catch(error) {
            console.error('Erro ao chamar a API: ', error);
            throw error;
        }
    }

    async put(endpoint, data) {
        try {
            const url = new URL(`${this.baseURL}/${endpoint}`);
            const response = await fetch(url.toString(), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if(!response.ok) 
                throw new UIError(response.status, response.statusText);

            return await response.json();

        } catch(error) {
            console.error('Erro ao chamar a API: ', error);
            throw error;
        }
    }

    async delete(endpoint, queryParams) {
        try {
            const url = new URL(`${this.baseURL}/${endpoint}`);
            Object.keys(queryParams)
                .forEach(
                    key => url.searchParams.append(key, queryParams[key])
                );

            const response = await fetch(url.toString(), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(!response.ok) 
                throw new UIError(response.status, response.statusText);

            return null;

        } catch(error) {
            console.error('Erro ao chamar a API: ', error);
            throw error;
        }
    }
}

const PORT = 'localhost:7054'
const service = new Services(`https://${PORT}`);
  