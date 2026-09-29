CREATE TABLE "rate_limits" (
	"key" text PRIMARY KEY,
	"count" integer NOT NULL,
	"window_start" timestamp with time zone NOT NULL,
	"last_request_at" timestamp with time zone NOT NULL
);
