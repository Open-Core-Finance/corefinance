-- Liquibase formatted SQL
-- ChangeSet Trung.Doan:5 labels:audit runOnChange:true

ALTER TABLE IF EXISTS branch ADD COLUMN IF NOT EXISTS created_date  timestamp with time zone;
ALTER TABLE IF EXISTS branch ADD COLUMN IF NOT EXISTS last_modified_date  timestamp with time zone;
ALTER TABLE IF EXISTS branch ADD COLUMN IF NOT EXISTS created_by jsonb;
ALTER TABLE IF EXISTS branch ADD COLUMN IF NOT EXISTS last_modified_by jsonb;

ALTER TABLE IF EXISTS exchange_rate ADD COLUMN IF NOT EXISTS created_date  timestamp with time zone;
ALTER TABLE IF EXISTS exchange_rate ADD COLUMN IF NOT EXISTS last_modified_date  timestamp with time zone;
ALTER TABLE IF EXISTS exchange_rate ADD COLUMN IF NOT EXISTS created_by jsonb;
ALTER TABLE IF EXISTS exchange_rate ADD COLUMN IF NOT EXISTS last_modified_by jsonb;

ALTER TABLE IF EXISTS rate ADD COLUMN IF NOT EXISTS created_date  timestamp with time zone;
ALTER TABLE IF EXISTS rate ADD COLUMN IF NOT EXISTS last_modified_date  timestamp with time zone;
ALTER TABLE IF EXISTS rate ADD COLUMN IF NOT EXISTS created_by jsonb;
ALTER TABLE IF EXISTS rate ADD COLUMN IF NOT EXISTS last_modified_by jsonb;

ALTER TABLE IF EXISTS crypto_product ADD COLUMN IF NOT EXISTS created_date  timestamp with time zone;
ALTER TABLE IF EXISTS crypto_product ADD COLUMN IF NOT EXISTS last_modified_date  timestamp with time zone;
ALTER TABLE IF EXISTS crypto_product ADD COLUMN IF NOT EXISTS created_by jsonb;
ALTER TABLE IF EXISTS crypto_product ADD COLUMN IF NOT EXISTS last_modified_by jsonb;
ALTER TABLE IF EXISTS deposit_product ADD COLUMN IF NOT EXISTS created_date  timestamp with time zone;
ALTER TABLE IF EXISTS deposit_product ADD COLUMN IF NOT EXISTS last_modified_date  timestamp with time zone;
ALTER TABLE IF EXISTS deposit_product ADD COLUMN IF NOT EXISTS created_by jsonb;
ALTER TABLE IF EXISTS deposit_product ADD COLUMN IF NOT EXISTS last_modified_by jsonb;
ALTER TABLE IF EXISTS gl_product ADD COLUMN IF NOT EXISTS created_date  timestamp with time zone;
ALTER TABLE IF EXISTS gl_product ADD COLUMN IF NOT EXISTS last_modified_date  timestamp with time zone;
ALTER TABLE IF EXISTS gl_product ADD COLUMN IF NOT EXISTS created_by jsonb;
ALTER TABLE IF EXISTS gl_product ADD COLUMN IF NOT EXISTS last_modified_by jsonb;
ALTER TABLE IF EXISTS loan_product ADD COLUMN IF NOT EXISTS created_date  timestamp with time zone;
ALTER TABLE IF EXISTS loan_product ADD COLUMN IF NOT EXISTS last_modified_date  timestamp with time zone;
ALTER TABLE IF EXISTS loan_product ADD COLUMN IF NOT EXISTS created_by jsonb;
ALTER TABLE IF EXISTS loan_product ADD COLUMN IF NOT EXISTS last_modified_by jsonb;