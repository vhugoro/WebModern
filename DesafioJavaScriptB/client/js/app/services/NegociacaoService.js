class NegociacaoService {
    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoesSemana(cb){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/negociacoes/semana');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    console.log("Retorno Ok. " + xhr.responseText);
                    cb(null, 
                        JSON.parse(xhr.responseText)
                        .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    )

                } else {
                    cb("Deu Ruim!!! " + xhr.responseText, null)
                }
            }
        }
        xhr.send();

    }
    obterNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {
            this._http
                .get("http://localhost:3000/negociacoes/semana")
                .then(negociacoes => {
                    resolve(
                        negociacoes.map(
                            objeto =>
                                new Negociacao(
                                    new Date(objeto.data),
                                    objeto.quantidade,
                                    objeto.valor
                                )
                        )
                    );
                })
                .catch(erro => {
                    console.error(erro)
                    reject("Não foi possível obter as negociações da semana");
                });
        });
    }

    obterNegociacoesDaSemanaAnterior() {
        return new Promise((resolve, reject) => {
            this._http
                .get("http://localhost:3000/negociacoes/anterior")
                .then(negociacoes => {
                    resolve(
                        negociacoes.map(
                            objeto =>
                                new Negociacao(
                                    new Date(objeto.data),
                                    objeto.quantidade,
                                    objeto.valor
                                )
                        )
                    );
                })
                .catch(erro => {
                    console.error(erro)
                    reject("Não foi possível obter as negociações da semana anterior");
                });
        });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._http
                .get("http://localhost:3000/negociacoes/retrasada")
                .then(negociacoes => {
                    resolve(
                        negociacoes.map(
                            objeto =>
                                new Negociacao(
                                    new Date(objeto.data),
                                    objeto.quantidade,
                                    objeto.valor
                                )
                        )
                    );
                })
                .catch(erro => {
                    console.error(erro)
                    reject("Não foi possível obter as negociações da semana retrasada");
                });
        });
    }

    obterNegociacoes() {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ])
                .then(periodos => {
                    let negociacoes = periodos
                        .reduce((dados, periodo) => dados.concat(periodo), [])
                        .map(
                            dado =>
                                new Negociacao(new Date(dado.data), dado.quantidade, dado.valor)
                        );

                    resolve(negociacoes);
                })
                .catch(erro => reject(erro));
        });
    }
}
