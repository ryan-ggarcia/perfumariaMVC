const Database = require('../utils/database')
const fs = require('fs')
const path = require('path')
const banco = new Database()
class ProdutoModel{
    #pro_id
    #pro_nome
    #pro_marca
    #pro_quant
    #pro_preco
    #pro_image
    #pro_status
    #pro_desc

    constructor(pro_id, pro_nome, pro_marca, pro_quant, pro_preco, pro_image, pro_status, pro_desc){
        this.#pro_id = pro_id
        this.#pro_nome = pro_nome
        this.#pro_marca = pro_marca
        this.#pro_quant = pro_quant
        this.#pro_preco = pro_preco
        this.#pro_image = pro_image
        this.#pro_status = pro_status
        this.#pro_desc = pro_desc
    }
    get pro_id(){
        return this.#pro_id
    }
    set pro_id(value){
        this.#pro_id = value
    }
    get pro_nome(){
        return this.#pro_nome
    }
    set pro_nome(value){
        this.#pro_nome = value
    }
    get pro_marca(){
        return this.#pro_marca
    }
    set pro_marca(value){
        this.#pro_marca = value
    }
    get pro_quant(){
        return this.#pro_quant
    }
    set pro_quant(value){
        this.#pro_quant = value
    }
    get pro_preco(){
        return this.#pro_preco
    }
    set pro_preco(value){
        this.#pro_preco = value
    }
    get pro_image(){
        return this.#pro_image
    }
    set pro_image(value){
        this.#pro_image = value
    }
    get pro_status(){
        return this.#pro_status
    }
    set pro_status(value){
        this.#pro_status = value
    }
    get pro_desc(){
        return this.#pro_desc
    }
    set pro_desc(value){
        this.#pro_desc = value
    }

    async listar(){
        let sql = "select * from produto"
        let result = await banco.ExecutaComando(sql)
        let lista = []
        for(let i = 0; i < result.length;i++){
            let produto = new ProdutoModel(
                result[i]["pro_id"],
                result[i]["pro_nome"],
                result[i]["pro_marca"],
                result[i]["pro_quant"],
                result[i]["pro_preco"],
                result[i]["pro_image"],
                result[i]["pro_status"],
                result[i]["pro_desc"]
            )
            lista.push(produto)
        }
        return lista
    }
    async cadastrar(){
        
        let sql = "insert into produto (pro_nome,pro_marca,pro_quant,pro_preco,pro_image,pro_status,pro_desc) values (?,?,?,?,?,?,?)"
        let valores = [
            this.#pro_nome,
            this.#pro_marca,
            this.#pro_quant,
            this.#pro_preco,
            this.#pro_image,
            this.#pro_status,
            this.#pro_desc
        ]
        let result = await banco.ExecutaComandoNonQuery(sql,valores)
        return result
    }

    async atualizar(){
        let sql = `update produto set pro_nome = ?, pro_marca = ?, pro_quant = ?, pro_preco = ?, pro_image = ?, pro_status = ?, pro_desc = ? where pro_id = ?`
        let valores = [
            this.#pro_nome,
            this.#pro_marca,
            this.#pro_quant,
            this.#pro_preco,
            this.#pro_image,
            this.#pro_status,
            this.#pro_desc,
            this.#pro_id
        ]
        let result = banco.ExecutaComandoNonQuery(sql,valores)
        return result
    }

    async excluir(id){
        if(this.#pro_image){
            let imagePath = path.join(__dirname, '..', 'public', 'images', this.#pro_image)
            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath)
            }
        }
        let sql = "delete from produto where pro_id = ?"
        let valores = [id]
        let result = await banco.ExecutaComandoNonQuery(sql, valores)
         return result
    }

}

module.exports = ProdutoModel