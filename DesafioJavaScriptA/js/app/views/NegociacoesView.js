class NegociacoesView extends View {
    constructor(elemento) {
        super(elemento)
    }

    template(model) {
        return `
            <table class="table table-hover table-bordered">
            <thead>
            <tr>
            <td>DATA</td>
            <td>QUANTIDADE</td>
            <td>VALOR</td>
            <td>VOLUME</td>
            </tr>
            </thead>
            <tbody>
            ${model.negociacoes.map(m => `
                <tr>
                <td>${DateHelper.dataParaTexto(m.data)}</td>
                </tr>
            `)}
            </tbody>
            <tfoot>
            </tfoot>
            </table>
            `
    }
}
