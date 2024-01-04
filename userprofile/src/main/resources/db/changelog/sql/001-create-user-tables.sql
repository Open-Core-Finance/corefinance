-- Liquibase formatted SQL
-- ChangeSet Trung.Doan:1 labels:permission,basic-table runOnChange:true

CREATE TABLE IF NOT EXISTS resource_action
(
    id character varying(255) DEFAULT gen_random_uuid()::character varying(255) PRIMARY KEY,
    action character varying(255),
    request_method character varying(255),
    resource_type character varying(255),
    url character varying(255),
    CONSTRAINT resource_action_request_method_check CHECK (request_method::text = ANY (ARRAY['GET'::character varying, 'HEAD'::character varying, 'POST'::character varying, 'PUT'::character varying, 'PATCH'::character varying, 'DELETE'::character varying, 'OPTIONS'::character varying, 'TRACE'::character varying]::text[])),
    CONSTRAINT resource_action_action_method_type_url_unique UNIQUE NULLS NOT DISTINCT (action, request_method, resource_type, url)
);

CREATE TABLE IF NOT EXISTS internal_service_config
(
    id character varying(255) DEFAULT gen_random_uuid()::character varying(255) PRIMARY KEY,
    activated boolean NOT NULL,
    api_key character varying(255) NOT NULL,
    created_date timestamp(6) with time zone,
    last_modified_date timestamp(6) with time zone,
    service_name character varying(255) NOT NULL,
    CONSTRAINT internal_service_config_activated_service_name_unique UNIQUE NULLS NOT DISTINCT (activated, service_name)
);

CREATE TABLE IF NOT EXISTS permission
(
    id character varying(255) DEFAULT gen_random_uuid()::character varying(255) PRIMARY KEY,
    action character varying(255) NOT NULL,
    control character varying(255) NOT NULL,
    request_method character varying(255),
    resource_type character varying(255) NOT NULL,
    role_id character varying(255) NOT NULL,
    url character varying(255),
    CONSTRAINT permission_control_check CHECK (control::text = ANY (ARRAY['ALLOWED'::character varying, 'DENIED'::character varying, 'ALLOWED_SPECIFIC_RESOURCES'::character varying, 'DENIED_SPECIFIC_RESOURCES'::character varying, 'MANUAL_CHECK'::character varying]::text[])),
    CONSTRAINT permission_request_method_check CHECK (request_method::text = ANY (ARRAY['GET'::character varying, 'HEAD'::character varying, 'POST'::character varying, 'PUT'::character varying, 'PATCH'::character varying, 'DELETE'::character varying, 'OPTIONS'::character varying, 'TRACE'::character varying]::text[])),
    CONSTRAINT permission_action_control_method_resource_type_role_url_unique UNIQUE NULLS NOT DISTINCT (action, control, request_method, resource_type, role_id, url)
);

CREATE TABLE IF NOT EXISTS user_profile
(
    id character varying(255) DEFAULT gen_random_uuid()::character varying(255) NOT NULL,
    activated boolean,
    address character varying(255),
    birthday date,
    display_name character varying(255),
    email character varying(255),
    first_name character varying(255),
    gender character varying(255),
    last_name character varying(255),
    password character varying(255),
    phone_number character varying(255),
    username character varying(255),
    role_id character varying(255),
    CONSTRAINT user_profile_pkey PRIMARY KEY (id),
    CONSTRAINT user_profile_gender_check CHECK (gender::text = ANY (ARRAY['MALE'::character varying, 'FEMALE'::character varying, 'UNKNOWN'::character varying]::text[]))
);

CREATE TABLE IF NOT EXISTS attempted_login
(
    id character varying(255) DEFAULT gen_random_uuid()::character varying(255) NOT NULL,
    account character varying(255),
    app_platform character varying(255),
    app_version jsonb,
    client_app_id character varying(255),
    date date,
    device_token character varying(255),
    enabled boolean NOT NULL,
    ip_address character varying(255),
    user_agent character varying(255),
    CONSTRAINT attempted_login_pkey PRIMARY KEY (id),
    CONSTRAINT attempted_login_app_platform_check CHECK (app_platform::text = ANY (ARRAY['UNKNOWN'::character varying, 'IOS'::character varying, 'ANDROID'::character varying, 'WEB'::character varying]::text[]))
);

CREATE TABLE IF NOT EXISTS login_session
(
    id character varying(255) DEFAULT gen_random_uuid()::character varying(255) NOT NULL,
    login_time timestamp(6) without time zone,
    login_token character varying(32600),
    refresh_token character varying(32600),
    valid_token boolean,
    user_profile_id character varying(255),
    verify_key character varying(255),
    CONSTRAINT login_session_pkey PRIMARY KEY (id),
    CONSTRAINT fkb96uupl2xe8shjn1sca7mvijk FOREIGN KEY (user_profile_id)
        REFERENCES user_profile (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS role
(
    id character varying(255) NOT NULL,
    name character varying(255),
    tenant_id character varying(255),
    CONSTRAINT role_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_profile_role
(
    id character varying(255) DEFAULT gen_random_uuid()::character varying(255) NOT NULL,
    user_profile_id character varying(255) NOT NULL,
    role_id character varying(255) NOT NULL,
    CONSTRAINT user_profile_role_pkey PRIMARY KEY (id),
    CONSTRAINT user_profile_role_user_role_id_fkey FOREIGN KEY (role_id)
        REFERENCES role (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT user_profile_role_user_profile_id_fkey FOREIGN KEY (user_profile_id)
        REFERENCES user_profile (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT user_profile_role_user_profile_role_unique UNIQUE NULLS NOT DISTINCT (role_id, user_profile_id)
);

CREATE TABLE IF NOT EXISTS delete_tracking
(
    id character varying(255) DEFAULT gen_random_uuid()::character varying(255) PRIMARY KEY,
    entity_class_name character varying(255) NOT NULL,
    entity_data jsonb NOT NULL,
    created_date timestamp with time zone,
    last_modified_date timestamp with time zone,
     created_by jsonb,
     last_modified_by jsonb
);