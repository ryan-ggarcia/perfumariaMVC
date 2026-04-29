const Database = require("../utils/database")

class PerfilModel{
    #per_id
    #per_desc

    get per_id(){
        return this.#per_id
    }
    set per_id(value){
        this.#per_id = value
    }
    get per_desc(){
        return this.#per_desc
    }
    set per_desc(value){
        this.#per_desc = value
    }

    constructor(per_id,per_desc){
        this.#per_id = per_id
        this.#per_desc = per_desc
    }

    async listar(){
        let banco = new Database
        let sql = 'select * from perfil'
        let row = await banco.ExecutaComando(sql)
        let lista =[]
        for(let i = 0; i < row.length;i++){
            let usuario = new PerfilModel(row[i]['per_id'],row[i]['per_desc'])
            lista.push(usuario)
        }
        return lista
    }
}

module.exports = PerfilModel