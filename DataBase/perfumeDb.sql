CREATE TABLE usuario (
    usu_id INT PRIMARY KEY AUTO_INCREMENT,    -- ID do usuário
    usu_nome VARCHAR(100) NOT NULL,           -- Nome completo
    usu_email VARCHAR(100) UNIQUE NOT NULL,   -- Email
    usu_senha VARCHAR(255) NOT NULL,          -- Senha (hash)
    usu_perfil_id INT NOT NULL,               -- ID do perfil (chave estrangeira)
    FOREIGN KEY (usu_perfil_id) REFERENCES perfil(per_id)
);
