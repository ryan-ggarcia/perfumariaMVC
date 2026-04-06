const Database = require("../utils/database")



class UsuarioModel {
    #usu_id
    #usu_nome
    #usu_email
    #usu_senha
    #usu_perfil
    #usu_perfil_desc

    get usu_id() {
        return this.#usu_id
    }
    set usu_id(value) {
        this.#usu_id = value
    }
    get usu_nome() {
        return this.#usu_nome
    }
    set usu_nome(value) {
        this.#usu_nome = value
    }
    get usu_senha() {
        return this.#usu_senha
    }
    set usu_senha(value) {
        this.#usu_senha = value
    }
    get usu_perfil() {
        return this.#usu_perfil
    }
    set usu_perfil(value) {
        this.#usu_perfil = value
    }
    get usu_email() {
        return this.#usu_email
    }
    set usu_email(value) {
        this.#usu_email = value
    }
    get usu_perfil_desc() {
        return this.#usu_perfil_desc
    }
    set usu_perfil_desc(value) {
        this.#usu_perfil_desc = value
    }

    constructor(usu_id, usu_nome, usu_email, usu_senha, usu_perfil, usu_perfil_desc) {
        this.#usu_id = usu_id
        this.#usu_nome = usu_nome
        this.#usu_email = usu_email
        this.#usu_senha = usu_senha
        this.#usu_perfil = usu_perfil
        this.#usu_perfil_desc = usu_perfil_desc
    }

    async cadastrar() {
        let sql = "insert into usuario (usu_nome,usu_email,usu_senha,usu_perfil_id) value (?,?,?,?) "
        let valores = [this.#usu_nome, this.#usu_email, this.#usu_senha, this.#usu_perfil]
        let banco = new Database()
        let result = await banco.ExecutaComandoNonQuery(sql, valores)
        return result
    }

    async listar() {
        let sql = `
        select u.usu_id, u.usu_nome, u.usu_email,p.des_perfil from usuario u
        inner join perfil p on u.usu_perfil_id = p.id_perfil
       `
        let banco = new Database()
        let result = await banco.ExecutaComando(sql)
        let lista = []
        for (let i = 0; i < result.length; i++) {
            let usuario = new UsuarioModel(
                result[i]["usu_id"],
                result[i]["usu_nome"],
                result[i]["usu_email"],
                null,
                null,
                result[i]["des_perfil"]
            )
            lista.push(usuario)
        }
        return lista
    }

}

module.exports = UsuarioModel