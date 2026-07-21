-- +goose Up
CREATE TABLE settings
(
    id             UUID PRIMARY KEY     DEFAULT gen_random_uuid(),
    instance_name  TEXT        NOT NULL,
    initialized_at TIMESTAMPTZ NOT NULL DEFAULT now()
)

-- +goose Down
DROP TABLE users;
