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
    
    async buscarPorEmailSenha(email, senha){
        let sql = "select usu_id, usu_nome, usu_email, usu_senha, usu_perfil_id from usuario where usu_email = ? and usu_senha = ?"
        let valores = [email,senha]
        let banco = new Database()
        let result = await banco.ExecutaComando(sql,valores)
        if(result.length > 0){
            let valida = new UsuarioModel(
                result[0]["usu_id"],
                result[0]["usu_nome"],
                result[0]["usu_email"],
                result[0]["usu_senha"],
                result[0]["usu_perfil_id"]
            )
            return valida
        }
    }
    async cadastrar() {
        let sql = "insert into usuario (usu_nome,usu_email,usu_senha,usu_perfil_id) values (?,?,?,?) "
        let valores = [this.#usu_nome, this.#usu_email, this.#usu_senha, this.#usu_perfil]
        let banco = new Database()
        let result = await banco.ExecutaComandoNonQuery(sql, valores)
        return result
    }
    async obter(id){
        let sql = `select usu_id, usu_nome, usu_email, usu_senha, usu_perfil_id from usuario where usu_id = ?`
        let valor = [id]
        let banco = new Database()
        let rows = await banco.ExecutaComando(sql,valor)
        if(rows && rows.length > 0){
            let usuario = new UsuarioModel(
                rows[0]["usu_id"],
                rows[0]["usu_nome"],
                rows[0]["usu_email"],
                rows[0]["usu_senha"],
                rows[0]["usu_perfil_id"]
            )
            return usuario
        }
        return null
    }
    async atualizar(){
        let sql = "update usuario set usu_nome = ?, usu_email = ?, usu_perfil_id = ? where usu_id = ?"
        let valores = [
            this.#usu_nome,
            this.#usu_email,
            this.#usu_perfil,
            this.#usu_id
        ]
        let banco = new Database()
        let result = await banco.ExecutaComandoNonQuery(sql,valores)
        return result
    }
    async listar() {
        let sql = `
        select u.usu_id, u.usu_nome, u.usu_email, u.usu_senha,u.usu_perfil_id, p.per_desc
        from usuario u
        inner join perfil p on p.per_id = u.usu_perfil_id
       `
        let banco = new Database()
        let result = await banco.ExecutaComando(sql)
        let lista = []
        for (let i = 0; i < result.length; i++) {
            let usuario = new UsuarioModel(
                result[i]["usu_id"],
                result[i]["usu_nome"],
                result[i]["usu_email"],
                result[i]["usu_senha"],
                result[i]["usu_perfil_id"],
                result[i]["per_desc"]
            )
            lista.push(usuario)
        }
        return lista
    }
    async excluir(id){
        let sql = "delete from usuario where usu_id = ?"
        let valor = [id]
        let banco = new Database()
        let result = await banco.ExecutaComandoNonQuery(sql,valor)
        return result
    }
    async obter(id){
        let sql = `
            select * from usuario where usu_id = ?
        `
        let valor = [id]
        let banco = new Database()
        let result = await banco.ExecutaComando(sql,valor)
        if(result.length > 0){
            let usuario = new UsuarioModel(
                result[0]["usu_id"],
                result[0]["usu_nome"],
                result[0]["usu_email"],
                result[0]["usu_senha"],
                result[0]["usu_perfil_id"]
            )
            return usuario
        }
    }
}

module.exports = UsuarioModel