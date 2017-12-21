CREATE SCHEMA IF NOT EXISTS model;
/*
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'account_user_fk') THEN
        ALTER TABLE model.account
        ADD CONSTRAINT account_user_fk
        FOREIGN KEY (user_id) REFERENCES model.user(id);
    END IF;
END;
$$;
*/
