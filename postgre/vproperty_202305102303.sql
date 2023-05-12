create view vProperty as
select
	row_number() over (
	order by (
	select
		null)) as propertyHomeId,
	p.name as name,
	p.id as id,
	p.quantity as quantity,
	p.description as description,
	p.reserve_price as reservePrice,
	b.last_price as lastPrice,
	p.category as category,
	p.creation_date as createdAt,
	i."type" as imageType,
	io.id as imageAvatar,
	u.avatar as defaultAvatar,
	u.username as ownerName,
	u.user_id as ownerId,
	b.id as bidId,
	b.status as bidStatus,
	i.id as imageProperty
from
	property p
inner join bid b on
	b.property_id = p.id
inner join users u on
	p.owner_id = u.user_id
left join image i on
	p.id = i.property_id
	and i.type = 'PROPERTY'
left join image io on
	io.user_id = u.user_id
	and i.type = 'AVATAR'
where
	p.bid_type is not null

