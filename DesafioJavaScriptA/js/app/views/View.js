class View {
    constructor(elemento){
        this._elemento = elemento
    }

    update(model){
        this._elemento.innerHTML = this.template(model)
    }

    _template(model){
        throw new Error("Você deve Sobrescrever este método em seu template.")
    }
}