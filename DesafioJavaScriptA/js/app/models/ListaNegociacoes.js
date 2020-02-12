class ListaNegociacoes {
    adiciona() {
        this._negociacoes = [];
    }

    getter(negociacao) {
        this._negociacoes.push(negociacao)
    }

    get negociacoes() {
        return [].concat(this._negociacoes)
    }
}