const Database = require("../utils/database")



class UsuarioModel{
    #userId
    #userNome
    #userEmail
    #userSenha
    #userAtivo
    #perfilId

    get userId(){
        return this.#userId
    }
    set userId(value){
        this.#userId = value
    }
    get userNome(){
        return this.#userNome
    }
    set userNome(value){
        this.#userNome = value
    }
    get userSenha(){
        return this.#userSenha
    }
    set userSenha(value){
        this.#userSenha = value
    }
    get userAtivo(){
        return this.#userAtivo
    }
    set userAtivo(value){
        this.#userAtivo = value
    }
    get userEmail(){
        return this.#userEmail
    }
    set userEmail(value){
        this.#userEmail = value
    }
    get perfilId(){
        return this.#perfilId
    }
    set perfilId(value){
        this.#perfilId = value
    }

    constructor(userId,userNome,userEmail,userSenha,userAtivo,perfilId){
        this.#userId = userId
        this.#userNome = userNome
        this.#userEmail = userEmail
        this.#userSenha = userSenha
        this.#userAtivo = userAtivo
        this.#perfilId = perfilId
    }

    async cadastrar(){
        let sql = "insert into usuario (user_email,user_senha,user_id,user_nome,user_status,perf_id) value (?,?,?,?,?,?) "
        let valores = [this.#userEmail,this.#userSenha,this.#userId,this.#userNome,this.#userAtivo,this.perfilId]
        let banco = new Database()
        let result = await banco.ExecutaComandoNonQuery(sql,valores)
        return result
    }

    async listar(){
        let sql = "select * from cliente"
        let banco = new Database()
        let result = await banco.ExecutaComando(sql)
        let lista = []
        for(let i =0; i< result.length; i++){
            let usuario = new UsuarioModel(result[i]["user_id"],result[i]["user_nome"],result[i]["user_email"],result[i]["user_senha"],result[i]["user_status"],result[i]["perf_id"])
            lista.push(usuario)
        }
    }

}

module.exports = UsuarioModel