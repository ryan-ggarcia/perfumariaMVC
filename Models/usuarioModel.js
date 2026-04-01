const Database = require("../utils/database")



class UsuarioModel {
    #usu_id
    #usu_nome
    #usu_email
    #usu_senha
    #usu_perfil

    get usu_id(){
        return this.#usu_id
    }
    set usu_id(value){
        this.#usu_id = value
    }
    get usu_nome(){
        return this.#usu_nome
    }
    set usu_nome(value){
        this.#usu_nome = value
    }
    get usu_senha(){
        return this.#usu_senha
    }
    set usu_senha(value){
        this.#usu_senha = value
    }
    get usu_status(){
        return this.#usu_perfil
    }
    set usu_status(value){
        this.#usu_perfil = value
    }
    get usu_email(){
        return this.#usu_email
    }
    set usu_email(value){
        this.#usu_email = value
    }

    constructor(usu_id,usu_nome,usu_email,usu_senha,usu_perfil){
        this.#usu_id = usu_id
        this.#usu_nome = usu_nome
        this.#usu_email = usu_email
        this.#usu_senha = usu_senha
        this.#usu_perfil = usu_perfil
    }

    async cadastrar(){
        let sql = "insert into usuario (usu_id,usu_nome,usu_email,usu_perfil_id) value (?,?,?,?) "
        let valores = [this.#usu_nome,this.#usu_email,this.#usu_senha,this.#usu_perfil]
        let banco = new Database()
        let result = await banco.ExecutaComandoNonQuery(sql,valores)
        return result
    }

    async listar(){
        let sql = "select * from usuario"
        let banco = new Database()
        let result = await banco.ExecutaComando(sql)
        let lista = []
        for(let i =0; i< result.length; i++){
            let usuario = new UsuarioModel(result[i]["usu_id"],result[i]["usu_nome"],result[i]["usu_email"],result[i]["usu_senha"],result[i]["usu_perfil_id"])
            lista.push(usuario)
        }
        return lista
    }

}

module.exports = UsuarioModel