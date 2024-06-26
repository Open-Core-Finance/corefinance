-- Liquibase formatted SQL
-- ChangeSet Trung.Doan:3 labels:main-table runOnChange:true

CREATE SEQUENCE IF NOT EXISTS customer_id_seq INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;
CREATE SEQUENCE IF NOT EXISTS tenant_0f522100_7d8c_4b67_9a7f_779e1b179eff.customer_id_seq INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE IF NOT EXISTS individual_customer
(
    id bigint NOT NULL DEFAULT nextval('customer_id_seq'::regclass) PRIMARY KEY,
    created_date timestamp with time zone,
    last_modified_date timestamp with time zone,
    created_by jsonb,
    last_modified_by jsonb,
    contact_phone character varying(255),
    contact_email character varying(255),
    contact_company_phone character varying(255),
    mailing_street_address_line_1 character varying(255),
    mailing_street_address_line_2 character varying(255),
    mailing_district character varying(255),
    mailing_city character varying(255),
    mailing_state character varying(255),
    mailing_city_id int,
    mailing_state_id int,
    mailing_zip_postal_code character varying(255),
    malling_country character varying(255),
    malling_country_id int,
    malling_same_with_address boolean NOT NULL DEFAULT true,
    street_address_line_1 character varying(255),
    street_address_line_2 character varying(255),
    district character varying(255),
    city character varying(255),
    state character varying(255),
    city_id int,
    state_id int,
    zip_postal_code character varying(255),
    country character varying(255),
    country_id int,
    consent_marketing boolean NOT NULL,
    consent_non_marketing boolean NOT NULL,
    consent_abroad boolean NOT NULL,
    consent_transfer_to_3rd boolean NOT NULL,
    contact_home_phone character varying(255),
    title character varying(255),
    first_name character varying(255),
    middle_name character varying(255),
    last_name character varying(255),
    gender character varying(255),
    cis_number character varying(255),
    place_of_birth character varying(255),
    dob date,
    nationality jsonb,
    single_nationality boolean NOT NULL DEFAULT true,
    second_nationality jsonb,
    marital_status character varying(255),
    CONSTRAINT individual_customer_marital_status_check CHECK (marital_status::text = ANY (ARRAY['SINGLE'::character varying, 'MARRIED'::character varying, 'WINDOWED'::character varying, 'DIVORCED'::character varying, 'SEPARATED'::character varying, 'UNKNOWN'::character varying]::text[]))
 );

CREATE TABLE IF NOT EXISTS tenant_0f522100_7d8c_4b67_9a7f_779e1b179eff.individual_customer
(
    id bigint NOT NULL DEFAULT nextval('tenant_0f522100_7d8c_4b67_9a7f_779e1b179eff.customer_id_seq'::regclass) PRIMARY KEY,
    created_date timestamp with time zone,
    last_modified_date timestamp with time zone,
    created_by jsonb,
    last_modified_by jsonb,
    contact_phone character varying(255),
    contact_email character varying(255),
    contact_company_phone character varying(255),
    mailing_street_address_line_1 character varying(255),
    mailing_street_address_line_2 character varying(255),
    mailing_district character varying(255),
    mailing_city character varying(255),
    mailing_state character varying(255),
    mailing_city_id int,
    mailing_state_id int,
    mailing_zip_postal_code character varying(255),
    malling_country character varying(255),
    malling_country_id int,
    malling_same_with_address boolean NOT NULL DEFAULT true,
    street_address_line_1 character varying(255),
    street_address_line_2 character varying(255),
    district character varying(255),
    city character varying(255),
    state character varying(255),
    city_id int,
    state_id int,
    zip_postal_code character varying(255),
    country character varying(255),
    country_id int,
    consent_marketing boolean NOT NULL,
    consent_non_marketing boolean NOT NULL,
    consent_abroad boolean NOT NULL,
    consent_transfer_to_3rd boolean NOT NULL,
    contact_home_phone character varying(255),
    title character varying(255),
    first_name character varying(255),
    middle_name character varying(255),
    last_name character varying(255),
    gender character varying(255),
    cis_number character varying(255),
    place_of_birth character varying(255),
    dob date,
    nationality jsonb,
    single_nationality boolean NOT NULL DEFAULT true,
    second_nationality jsonb,
    marital_status character varying(255),
    CONSTRAINT individual_customer_marital_status_check CHECK (marital_status::text = ANY (ARRAY['SINGLE'::character varying, 'MARRIED'::character varying, 'WINDOWED'::character varying, 'DIVORCED'::character varying, 'SEPARATED'::character varying, 'UNKNOWN'::character varying]::text[]))
);

 CREATE TABLE IF NOT EXISTS corporate_customer
 (
     id bigint NOT NULL DEFAULT nextval('customer_id_seq'::regclass) PRIMARY KEY,
     created_date timestamp with time zone,
     last_modified_date timestamp with time zone,
     created_by jsonb,
     last_modified_by jsonb,
     contact_name character varying(255),
     contact_phone character varying(255),
     contact_email character varying(255),
     contact_company_phone character varying(255),
     mailing_street_address_line_1 character varying(255),
     mailing_street_address_line_2 character varying(255),
     mailing_district character varying(255),
     mailing_city character varying(255),
     mailing_state character varying(255),
     mailing_city_id int,
     mailing_state_id int,
     mailing_zip_postal_code character varying(255),
     malling_country character varying(255),
     malling_country_id int,
     malling_same_with_address boolean NOT NULL DEFAULT true,
     street_address_line_1 character varying(255),
     street_address_line_2 character varying(255),
     district character varying(255),
     city character varying(255),
     state character varying(255),
     city_id int,
     state_id int,
     zip_postal_code character varying(255),
     country character varying(255),
     country_id int,
     consent_marketing boolean NOT NULL,
     consent_non_marketing boolean NOT NULL,
     consent_abroad boolean NOT NULL,
     consent_transfer_to_3rd boolean NOT NULL,
     name character varying(255) NOT NULL,
     tax_number character varying(255),
     start_date date
);

CREATE TABLE IF NOT EXISTS tenant_0f522100_7d8c_4b67_9a7f_779e1b179eff.corporate_customer
(
    id bigint NOT NULL DEFAULT nextval('tenant_0f522100_7d8c_4b67_9a7f_779e1b179eff.customer_id_seq'::regclass) PRIMARY KEY,
    created_date timestamp with time zone,
    last_modified_date timestamp with time zone,
    created_by jsonb,
    last_modified_by jsonb,
    contact_name character varying(255),
    contact_phone character varying(255),
    contact_email character varying(255),
    contact_company_phone character varying(255),
    mailing_street_address_line_1 character varying(255),
    mailing_street_address_line_2 character varying(255),
    mailing_district character varying(255),
    mailing_city character varying(255),
    mailing_state character varying(255),
    mailing_city_id int,
    mailing_state_id int,
    mailing_zip_postal_code character varying(255),
    malling_country character varying(255),
    malling_country_id int,
    malling_same_with_address boolean NOT NULL DEFAULT true,
    street_address_line_1 character varying(255),
    street_address_line_2 character varying(255),
    district character varying(255),
    city character varying(255),
    state character varying(255),
    city_id int,
    state_id int,
    zip_postal_code character varying(255),
    country character varying(255),
    country_id int,
    consent_marketing boolean NOT NULL,
    consent_non_marketing boolean NOT NULL,
    consent_abroad boolean NOT NULL,
    consent_transfer_to_3rd boolean NOT NULL,
    name character varying(255) NOT NULL,
    tax_number character varying(255),
    start_date date
);