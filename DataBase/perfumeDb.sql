CREATE TABLE usuario (
    usu_id INT PRIMARY KEY AUTO_INCREMENT,    -- ID do usuário
    usu_nome VARCHAR(100) NOT NULL,           -- Nome completo
    usu_email VARCHAR(100) UNIQUE NOT NULL,   -- Email
    usu_senha VARCHAR(255) NOT NULL,          -- Senha (hash)
    usu_perfil_id INT NOT NULL,               -- ID do perfil (chave estrangeira)
    FOREIGN KEY (usu_perfil_id) REFERENCES perfil(per_id)
);
CREATE TABLE perfil(
	per_id INT PRIMARY KEY AUTO_INCREMENT,
    per_desc VARCHAR(170) NOT NULL
);

CREATE TABLE produto(
	pro_id INT PRIMARY KEY AUTO_INCREMENT,
    pro_nome VARCHAR(80) NOT NULL,
    pro_marca VARCHAR(80) NOT NULL,
    pro_quant DECIMAL NOT NULL,
    pro_preco DECIMAL NOT NULL,
    pro_image VARCHAR(255) NOT NULL,
    pro_status BOOLEAN NOT NULL,
    pro_desc VARCHAR(180) NOT NULL
);