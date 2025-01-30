CREATE VIEW product_view AS
SELECT 
    id,
    name,
    description,
    price,
    discounted_price,
    article,
    photo_bytes,
    updated_at,
    created_at,
    LEAST(price, COALESCE(discounted_price, price)) AS min_price
FROM 
    product;