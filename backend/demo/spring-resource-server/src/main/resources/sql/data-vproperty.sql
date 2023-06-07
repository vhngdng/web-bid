create
or replace view vproperty as
select row_number()       over (order by (select null)) as property_home_id, p.name as name,
       p.id            as id,
       p.quantity      as quantity,
       p.description   as description,
       p.reserve_price as reserve_price,
       b.last_price    as last_price,
       p.category      as category,
       p.creation_date as created_at,
       u.avatar        as default_avatar,
       u.username      as owner_name,
       u.user_id       as owner_id,
       b.id            as bid_id,
       b.status        as bid_status,
       i.id            as image_property,
       i.type          as image_type,
       io.id           as image_avatar,
       p.bid_type      as bid_type
from property p
         inner join bid b on b.property_id = p.id
         inner join users u on p.owner_id = u.user_id
         left join image i on p.id = i.property_id and i.type = 'PROPERTY'
         left join image io on io.user_id = u.user_id and i.type = 'AVATAR';
--
-- select 1 + 1;