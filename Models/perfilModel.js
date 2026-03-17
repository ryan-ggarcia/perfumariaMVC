const Database = require("../utils/database")

class PerfilModel{
    #per_id
    #per_nome
    #per_descricao

    get per_id(){
        return this.#per_id
    }
    set per_id(value){
        this.#per_id = value
    }
    get per_nome(){
        return this.#per_nome
    }
    set per_nome(value){
        this.#per_nome = value
    }
    get per_descricao(){
        return this.#per_descricao
    }
    set per_descricao(value){
        this.#per_descricao = value
    }

    constructor(per_id,per_nome,per_descricao){
        this.#per_id = per_id
        this.#per_nome = per_nome
        this.#per_descricao = per_descricao
    }

    async listar(){
        let banco = new Database
        let sql = 'select * from perfil'
        let row = await banco.ExecutaComando(sql)
        let lista =[]
        for(let i = 0; i < row.length;i++){
            let usuario = new PerfilModel(row[i]['per_id'],row[i]['per_nome'],row[i]['per_descricao'])
            lista.push(usuario)
        }
        return lista
    }
}

module.exports = PerfilModel