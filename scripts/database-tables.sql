CREATE TABLE public.customer_order (
    id integer NOT NULL,
    amount numeric(10,2),
    status character varying,
    created_at date,
    employee_id integer
);

ALTER TABLE public.customer_order OWNER TO postgres;

CREATE TABLE public.customer_order_product (
    id integer NOT NULL,
    product_id integer NOT NULL,
    customer_order_id integer NOT NULL,
    quantity integer NOT NULL
);

ALTER TABLE public.customer_order_product OWNER TO postgres;

CREATE TABLE public.employee (
    id integer NOT NULL,
    name character varying(70) NOT NULL
);


ALTER TABLE public.employee OWNER TO postgres;

CREATE SEQUENCE public.employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.employee_id_seq OWNER TO postgres;

ALTER SEQUENCE public.employee_id_seq OWNED BY public.employee.id;

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_id_seq OWNER TO postgres;

ALTER SEQUENCE public.order_id_seq OWNED BY public.customer_order.id;

CREATE SEQUENCE public.order_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.order_product_id_seq OWNER TO postgres;

ALTER SEQUENCE public.order_product_id_seq OWNED BY public.customer_order_product.id;

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(100),
    description character varying,
    stock integer,
    price numeric(10,2),
    image_url character varying,
    sku character varying
);

ALTER TABLE public.product OWNER TO postgres;

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO postgres;

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;

ALTER TABLE ONLY public.customer_order ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);

ALTER TABLE ONLY public.customer_order_product ALTER COLUMN id SET DEFAULT nextval('public.order_product_id_seq'::regclass);

ALTER TABLE ONLY public.employee ALTER COLUMN id SET DEFAULT nextval('public.employee_id_seq'::regclass);

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);

ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.customer_order
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.customer_order_product
    ADD CONSTRAINT order_product_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.customer_order_product
    ADD CONSTRAINT customer_order_id FOREIGN KEY (customer_order_id) REFERENCES public.customer_order(id);

ALTER TABLE ONLY public.customer_order
    ADD CONSTRAINT employee_id FOREIGN KEY (employee_id) REFERENCES public.employee(id) NOT VALID;

ALTER TABLE ONLY public.customer_order_product
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.product(id);

INSERT INTO public.employee (name) VALUES ('Marc Viger');
INSERT INTO public.employee (name) VALUES ('Jim Partin');
INSERT INTO public.employee (name) VALUES ('Juan Valdez');
INSERT INTO public.employee (name) VALUES ('Tyler Otoya');
INSERT INTO public.employee (name) VALUES ('Jaime Soliz');

INSERT INTO public.product (name, description, stock, price, image_url, sku) VALUES ('iPhone 13', 'The display has rounded corners that follow a beautiful curved design, and these corners are within a standard rectangle. When measured as a standard rectangular shape, the screen is 5.42 inches (iPhone 13 mini), 6.06 inches (iPhone 13, iPhone 14), 6.12 inches (iPhone 14 Pro), 6.68 inches (iPhone 14 Plus), or 6.69 inches (iPhone 14 Pro Max) diagonally. Actual viewable area is less.', 15, 850, 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-green-witb-202203?wid=182&hei=392&fmt=jpeg&qlt=95&.v=1644964732567', 'iphone13');
INSERT INTO public.product (name, description, stock, price, image_url, sku) VALUES ('iPhone 14', 'Available space is less and varies due to many factors. A standard configuration uses approximately 12GB to 17GB of space, including iOS 16 with its latest features and Apple apps that can be deleted. Apple apps that can be deleted use about 4.5GB of space, and you can download them back from the App Store. Storage capacity subject to change based on software version, settings, and iPhone model.', 22, 1100, 'https://www.apple.com/v/iphone-14/f/images/key-features/features/size/size_yellow__dnv9794q7loy_large.jpg', 'iphone14');
INSERT INTO public.product (name, description, stock, price, image_url, sku) VALUES ('Mac Mini', 'Mac mini with M2 packs the speed you need to get more done faster. And M2 Pro takes it to a whole new level — bringing a pro chip to Mac mini for the first time. Add to that a versatile array of ports and you’ve got a desktop ready to flex in any setup, no matter which chip you choose. The next generation of Apple silicon makes this the hardest‑working Mac mini we’ve ever built. From rich presentations to immersive gaming, M2 flies through work and play. And M2 Pro crushes compute‑intensive tasks like editing massive images and 8K ProRes video.', 10, 2500, 'https://www.apple.com/v/mac-mini/s/images/shared/router_trade_in_mac_mini__c71g4whq0z2a_large.jpg', 'macmini');
INSERT INTO public.product (name, description, stock, price, image_url, sku) VALUES ('iPad Pro', 'Astonishing performance. Incredibly advanced displays. Superfast wireless connectivity. Next-level Apple Pencil capabilities. Powerful new features in iPadOS 16. The ultimate iPad experience. A complete movie studio in your hands. The high‑performance media engine on M2 accelerates ProRes encode and decode. So you can convert video projects to ProRes up to 3x faster than before.', 28, 750, 'https://www.apple.com/v/ipad/home/cd/images/overview/compare_ipad_pro__erf9x8mw04sy_large.png', 'ipadpro');
INSERT INTO public.product (name, description, stock, price, image_url, sku) VALUES ('Apple Watch Ultra', 'Meet the most rugged and capable Apple Watch ever. With a robust titanium case, precision dual-frequency GPS, up to 36 hours of battery life,1 the freedom of cellular,2 and three specialized bands made for athletes and adventurers of all kinds. To build the ultimate sports watch, we crafted every element with painstaking attention to detail for unparalleled performance. Titanium strikes the perfect balance between weight, ruggedness, and corrosion resistance. The case rises up to surround the flat sapphire crystal and protect it from edge impacts. The Digital Crown is larger and the side button is raised from the case, making them easier to use while you’re wearing gloves.', 50, 350, 'https://www.apple.com/v/apple-watch-ultra/e/images/overview/even-more/everything_hero__cz04gex5b3u6_large.jpg', 'watchultra');
INSERT INTO public.product (name, description, stock, price, image_url, sku) VALUES ('AirPods (3rd generation)', 'Music on a more personal note. Adaptive EQ automatically tunes music to your ears. Inward-facing microphones detect what you’re hearing, then adjust low and midrange frequencies to deliver the rich details in every song, customized for you in real time. An Apple-designed dynamic driver, powered by a custom amplifier, renders music in exceptionally detailed sound quality — so you revel in every tone, from deep, rich bass to crisp, clean highs.', 120, 150, 'https://www.apple.com/v/airpods-3rd-generation/d/images/overview/routers/ar_iphone__dlhrnt1i2egm_large.jpg', 'airpods3g');
INSERT INTO public.product (name, description, stock, price, image_url, sku) VALUES ('MacBook Air', 'MacBook Air with M1 is an incredibly portable laptop — it’s nimble and quick, with a silent, fanless design and a beautiful Retina display. Thanks to its slim profile and all‑day battery life, this Air moves at the speed of lightness. A 16-core Neural Engine capable of 11 trillion operations per second. Process that. Apps on MacBook Air can use machine learning (ML) to automatically retouch photos like a pro, make smart tools such as magic wands and audio filters more accurate at auto‑detection, and so much more. That’s not just brainpower — that’s the power of a full stack of ML technologies.', 16, 3500, 'https://www.apple.com/v/macbook-air-m1/d/images/overview/machine_learning__d8u6dxf5xawm_large_2x.png', 'macbookair');
INSERT INTO public.product (name, description, stock, price, image_url, sku) VALUES ('Apple TV 4K', 'Apple TV 4K is all you need to stream live TV from the world’s biggest and best networks, broadcasters, and pay TV providers. Watch sports from ESPN and MLB. Catch up with news from ABC, CNN, and Bloomberg. And kick back with shows on Hulu, YouTube TV, and Sling TV.  iCloud Shared Photo Library makes it easier than ever for the whole family to enjoy each other’s photos, and you can see them all right on your TV. Simply create a shared library on your iPhone or iPad, then invite others to add, edit, or delete photos and videos.', 12, 5200, 'https://www.apple.com/v/apple-tv-4k/ag/images/overview/better-together/calibration_apple_tv__bw6f32t8opma_large.jpg', 'appletv4k');