-- public.message definition

-- Drop table

-- DROP TABLE public.message;

CREATE TABLE IF NOT EXISTS public.message (
	id bigserial NOT NULL,
	created_date timestamp(6) NULL,
	created_by varchar(255) NULL,
	increase_amount int8 NULL,
	last_modified_by varchar(255) NULL,
	last_modified_date timestamp(6) NULL,
	message varchar(255) NULL,
	nick_name varchar(255) NULL,
	receiver_name varchar(255) NULL,
	sender_name varchar(255) NULL,
	status varchar(255) NOT NULL,
	CONSTRAINT message_pkey PRIMARY KEY (id)
);


-- public."role" definition

-- Drop table

-- DROP TABLE public."role";

CREATE TABLE IF NOT EXISTS public."role" (
	id serial4 NOT NULL,
	"role" varchar(255) NOT NULL,
	CONSTRAINT role_pkey PRIMARY KEY (id),
	CONSTRAINT uk_bjxn5ii7v7ygwx39et0wawu0q UNIQUE (role)
);


-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE IF NOT EXISTS public.users (
	user_id bigserial NOT NULL,
	avatar varchar(255) NULL,
	creation_date timestamp(6) NULL,
	email varchar(255) NULL,
	email_verified bool NOT NULL DEFAULT false,
	enabled bool NOT NULL DEFAULT true,
	is_online bool NOT NULL DEFAULT false,
	last_modified_by varchar(255) NULL,
	last_modified_date timestamp(6) NULL,
	"password" varchar(64) NULL,
	provider varchar(255) NULL,
	provider_id varchar(255) NULL,
	username varchar(64) NULL,
	CONSTRAINT users_pkey PRIMARY KEY (user_id)
);


-- public.property definition

-- Drop table

-- DROP TABLE public.property;

CREATE TABLE IF NOT EXISTS public.property (
	id serial4 NOT NULL,
	auctioneer_price int8 NULL,
	bid_type varchar(255) NULL,
	category varchar(255) NULL,
	creation_date timestamp(6) NULL,
	description varchar(255) NULL,
	last_modified_by varchar(255) NULL,
	last_modified_date timestamp(6) NULL,
	"name" varchar(255) NULL,
	"permission" varchar(255) NULL,
	quantity int8 NULL,
	reserve_price int8 NULL,
	owner_id int8 NOT NULL,
	CONSTRAINT property_pkey PRIMARY KEY (id),
	CONSTRAINT fkqje3em0djsxgnxwy7klv6yju9 FOREIGN KEY (owner_id) REFERENCES public.users(user_id)
);
CREATE INDEX o_index ON public.property USING btree (owner_id);


-- public.refresh_token definition

-- Drop table

-- DROP TABLE public.refresh_token;

CREATE TABLE IF NOT EXISTS public.refresh_token (
	id serial4 NOT NULL,
	expiry_date timestamptz(6) NOT NULL,
	"token" varchar(255) NOT NULL,
	user_id int8 NULL,
	CONSTRAINT refresh_token_pkey PRIMARY KEY (id),
	CONSTRAINT uk_r4k4edos30bx9neoq81mdvwph UNIQUE (token),
	CONSTRAINT fkjtx87i0jvq2svedphegvdwcuy FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);


-- public.users_roles definition

-- Drop table

-- DROP TABLE public.users_roles;

CREATE TABLE IF NOT EXISTS public.users_roles (
	user_id int8 NOT NULL,
	role_id int4 NOT NULL,
	CONSTRAINT users_roles_pkey PRIMARY KEY (user_id, role_id),
	CONSTRAINT fk2o0jvgh89lemvvo17cbqvdxaa FOREIGN KEY (user_id) REFERENCES public.users(user_id),
	CONSTRAINT fkt4v0rrweyk393bdgt107vdx0x FOREIGN KEY (role_id) REFERENCES public."role"(id)
);


-- public.bid definition

-- Drop table

-- DROP TABLE public.bid;

CREATE TABLE IF NOT EXISTS public.bid (
	id bigserial NOT NULL,
	condition_report text NULL,
	created_at timestamp(6) NULL,
	created_by varchar(255) NULL,
	day_of_sale timestamp(6) NULL,
	finish_time timestamp(6) NULL,
	last_modified_by varchar(255) NULL,
	last_modified_date timestamp(6) NULL,
	last_price int8 NULL,
	price_step int8 NULL,
	reserve_price int8 NULL,
	status varchar(255) NULL DEFAULT 'DEACTIVE'::character varying,
	"type" varchar(255) NULL,
	update_price int8 NULL,
	auctioneer_id int8 NULL,
	property_id int4 NOT NULL,
	winning_bidder_id int8 NULL,
	CONSTRAINT bid_pkey PRIMARY KEY (id),
	CONSTRAINT uk_d63ofigseo1m55fa6c57a5svw UNIQUE (created_at),
	CONSTRAINT uk_n8k6qdoc9o4y3fam9v7j2sj5q UNIQUE (property_id),
	CONSTRAINT fk3eldey4pi30c2g20wuk8dx6l FOREIGN KEY (winning_bidder_id) REFERENCES public.users(user_id),
	CONSTRAINT fki5wtn6st8k8th9sq1w4lxn3vp FOREIGN KEY (property_id) REFERENCES public.property(id),
	CONSTRAINT fkij64aq6vo4p7px4gu50syuf4f FOREIGN KEY (auctioneer_id) REFERENCES public.users(user_id)
);


-- public.bid_participant definition

-- Drop table

-- DROP TABLE public.bid_participant;

CREATE TABLE IF NOT EXISTS public.bid_participant (
	id bigserial NOT NULL,
	nick_name varchar(255) NULL,
	bid_id int8 NULL,
	participant_id int8 NULL,
	CONSTRAINT bid_participant_pkey PRIMARY KEY (id),
	CONSTRAINT fkalu566xwl8ntgpqoueywkowxm FOREIGN KEY (bid_id) REFERENCES public.bid(id),
	CONSTRAINT fknyqxdxcbe7rqnccwsayxg3vy4 FOREIGN KEY (participant_id) REFERENCES public.users(user_id)
);


-- public.image definition

-- Drop table

-- DROP TABLE public.image;

CREATE TABLE IF NOT EXISTS public.image (
	id varchar(255) NOT NULL,
	content_type varchar(255) NULL,
	created_date timestamp(6) NULL,
	created_by varchar(255) NULL,
	"data" bytea NULL,
	last_modified_by varchar(255) NULL,
	last_modified_date timestamp(6) NULL,
	"name" varchar(255) NULL,
	"size" int8 NULL,
	"type" varchar(255) NULL,
	property_id int4 NULL,
	user_id int8 NULL,
	CONSTRAINT image_pkey PRIMARY KEY (id),
	CONSTRAINT fk6oqm8c6mg2dgedoppcbu8sm5q FOREIGN KEY (property_id) REFERENCES public.property(id),
	CONSTRAINT fkcvpnctgluno47ac6avana5sqf FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);


-- public.message_bid definition

-- Drop table

-- DROP TABLE public.message_bid;

CREATE TABLE IF NOT EXISTS public.message_bid (
	message_id int8 NOT NULL,
	bid_id int8 NOT NULL,
	CONSTRAINT message_bid_pkey PRIMARY KEY (message_id, bid_id),
	CONSTRAINT fkgfsqdcykbhtginlg8g9r4eoq3 FOREIGN KEY (bid_id) REFERENCES public.bid(id),
	CONSTRAINT fkjrgvd65nud01hf5pht7nnyquf FOREIGN KEY (message_id) REFERENCES public.message(id)
);


-- public.payment definition

-- Drop table

-- DROP TABLE public.payment;

CREATE TABLE IF NOT EXISTS public.payment (
	id serial4 NOT NULL,
	created_at timestamp(6) NULL,
	created_by varchar(255) NULL,
	last_modified_by varchar(255) NULL,
	last_modified_date timestamp(6) NULL,
	status varchar(255) NULL,
	bid_id int8 NOT NULL,
	CONSTRAINT payment_pkey PRIMARY KEY (id),
	CONSTRAINT uk_fxl3u00ue9kdoqelvslc1tj6h UNIQUE (created_at),
	CONSTRAINT fkqtcp2jq02k2e3rqkbdqcttepy FOREIGN KEY (bid_id) REFERENCES public.bid(id)
);
