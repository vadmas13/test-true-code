CREATE VIEW product_attributes AS
SELECT 
    (SELECT id FROM product LIMIT 1) AS product_id,  
    MIN(price) AS min_price,
    MAX(price) AS max_price
FROM 
    product;