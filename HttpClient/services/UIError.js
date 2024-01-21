class UIError extends Error {
    constructor(status, statusText){
        super(`Erro na chamada da API: ${status} - ${statusText}`);
        this.name = 'UIError';
        this.status = status;
        this.statusText = statusText;
    }
}