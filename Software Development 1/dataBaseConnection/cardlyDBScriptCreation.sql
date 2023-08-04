CREATE TABLE users (

    user_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) PRIMARY KEY NOT NULL,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(40) NOT NULL UNIQUE,
    CONSTRAINT min_password CHECK ( char_length(password) >= 8),
    CONSTRAINT min_username CHECK (char_length(username) > 5)
);

CREATE TABLE products (

    product_id INT PRIMARY KEY NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    product_image VARCHAR(255) NOT NULL, /* guarda o caminho da imagem */
    file_type VARCHAR(20)
)
PARTITION BY RANGE (product_id) (

    PARTITION xbox VALUES LESS THAN (11),
    PARTITION playstation VALUES LESS THAN (21),
    PARTITION ifood VALUES LESS THAN (31),
    PARTITION garena VALUES LESS THAN (41),
    PARTITION leagueOfLegends VALUES LESS THAN (51),
    PARTITION valorant VALUES LESS THAN (61),
    PARTITION steam VALUES LESS THAN (71),
    PARTITION minecraft VALUES LESS THAN (81),
    PARTITION spotify VALUES LESS THAN (91),
    PARTITION roblox VALUES LESS THAN (101),
    PARTITION airbnb VALUES LESS THAN (111),
    PARTITION crunchyroll VALUES LESS THAN (121)
);

