BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "django_migrations" (
	"id"	integer NOT NULL,
	"app"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	"applied"	datetime NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_group_permissions" (
	"id"	integer NOT NULL,
	"group_id"	integer NOT NULL,
	"permission_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("group_id") REFERENCES "auth_group"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_user_groups" (
	"id"	integer NOT NULL,
	"user_id"	integer NOT NULL,
	"group_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("group_id") REFERENCES "auth_group"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_user_user_permissions" (
	"id"	integer NOT NULL,
	"user_id"	integer NOT NULL,
	"permission_id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("permission_id") REFERENCES "auth_permission"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_admin_log" (
	"id"	integer NOT NULL,
	"object_id"	text,
	"object_repr"	varchar(200) NOT NULL,
	"action_flag"	smallint unsigned NOT NULL CHECK("action_flag" >= 0),
	"change_message"	text NOT NULL,
	"content_type_id"	integer,
	"user_id"	integer NOT NULL,
	"action_time"	datetime NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_content_type" (
	"id"	integer NOT NULL,
	"app_label"	varchar(100) NOT NULL,
	"model"	varchar(100) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_permission" (
	"id"	integer NOT NULL,
	"content_type_id"	integer NOT NULL,
	"codename"	varchar(100) NOT NULL,
	"name"	varchar(255) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("content_type_id") REFERENCES "django_content_type"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "auth_group" (
	"id"	integer NOT NULL,
	"name"	varchar(150) NOT NULL UNIQUE,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "auth_user" (
	"id"	integer NOT NULL,
	"password"	varchar(128) NOT NULL,
	"last_login"	datetime,
	"is_superuser"	bool NOT NULL,
	"username"	varchar(150) NOT NULL UNIQUE,
	"last_name"	varchar(150) NOT NULL,
	"email"	varchar(254) NOT NULL,
	"is_staff"	bool NOT NULL,
	"is_active"	bool NOT NULL,
	"date_joined"	datetime NOT NULL,
	"first_name"	varchar(150) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "base_producent" (
	"id"	integer NOT NULL,
	"nazwa_producent"	text NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "base_modell" (
	"id"	integer NOT NULL,
	"nazwa_model"	text NOT NULL,
	"Producent_id"	bigint NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("Producent_id") REFERENCES "base_producent"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "base_katalog_grupa" (
	"id"	integer NOT NULL,
	"grupa_id"	bigint,
	"katalog_id"	bigint,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("grupa_id") REFERENCES "base_grupa"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("katalog_id") REFERENCES "base_katalog_nadrzedny"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "base_czesc" (
	"id"	integer NOT NULL,
	"numer_strony"	integer NOT NULL,
	"opis_Numer_katalogowy"	text NOT NULL,
	"Strona_katalog_id"	bigint,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("Strona_katalog_id") REFERENCES "base_strona_katalog"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "base_grupa" (
	"id"	integer NOT NULL,
	"nazwa_grupa"	text NOT NULL,
	"user_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "base_grupauser" (
	"id"	integer NOT NULL,
	"allow"	bool NOT NULL,
	"grupa_id"	bigint,
	"user_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("grupa_id") REFERENCES "base_grupa"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "base_katalog_nadrzedny" (
	"id"	integer NOT NULL,
	"nazwa_katalog"	text NOT NULL,
	"katalog_wlascicel_id"	integer,
	"modell_id"	bigint,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("katalog_wlascicel_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("modell_id") REFERENCES "base_modell"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "base_numer_katalogowy_czesc" (
	"id"	integer NOT NULL,
	"opis_Numer_katalogowy"	text NOT NULL,
	"czesc_id"	bigint,
	"numer_katalogowy_id"	bigint,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("numer_katalogowy_id") REFERENCES "base_numer_katalogowy"("id") DEFERRABLE INITIALLY DEFERRED,
	FOREIGN KEY("czesc_id") REFERENCES "base_czesc"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "base_strona_katalog" (
	"id"	integer NOT NULL,
	"numer_strony"	integer NOT NULL,
	"nazwa_strony"	text NOT NULL,
	"katalog_nadrzedny_id"	bigint,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("katalog_nadrzedny_id") REFERENCES "base_katalog_nadrzedny"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "base_zdjecie" (
	"id"	integer NOT NULL,
	"tytul_zdiecie"	text NOT NULL,
	"opis_zdjecie"	text NOT NULL,
	"wlasciciel_id"	integer,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("wlasciciel_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "django_session" (
	"session_key"	varchar(40) NOT NULL,
	"session_data"	text NOT NULL,
	"expire_date"	datetime NOT NULL,
	PRIMARY KEY("session_key")
);
CREATE TABLE IF NOT EXISTS "token_blacklist_blacklistedtoken" (
	"blacklisted_at"	datetime NOT NULL,
	"token_id"	bigint NOT NULL UNIQUE,
	"id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("token_id") REFERENCES "token_blacklist_outstandingtoken"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "token_blacklist_outstandingtoken" (
	"token"	text NOT NULL,
	"created_at"	datetime,
	"expires_at"	datetime NOT NULL,
	"user_id"	integer,
	"jti"	varchar(255) NOT NULL UNIQUE,
	"id"	integer NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "auth_user"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE TABLE IF NOT EXISTS "base_numer_katalogowy" (
	"id"	integer NOT NULL,
	"numer_strony"	integer NOT NULL,
	"opis_Numer_katalogowy"	text NOT NULL,
	"strona_katalog_id"	bigint,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("strona_katalog_id") REFERENCES "base_strona_katalog"("id") DEFERRABLE INITIALLY DEFERRED
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_group_permissions_group_id_permission_id_0cd325b0_uniq" ON "auth_group_permissions" (
	"group_id",
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "auth_group_permissions_group_id_b120cbf9" ON "auth_group_permissions" (
	"group_id"
);
CREATE INDEX IF NOT EXISTS "auth_group_permissions_permission_id_84c5c92e" ON "auth_group_permissions" (
	"permission_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_user_groups_user_id_group_id_94350c0c_uniq" ON "auth_user_groups" (
	"user_id",
	"group_id"
);
CREATE INDEX IF NOT EXISTS "auth_user_groups_user_id_6a12ed8b" ON "auth_user_groups" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "auth_user_groups_group_id_97559544" ON "auth_user_groups" (
	"group_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_user_user_permissions_user_id_permission_id_14a6b632_uniq" ON "auth_user_user_permissions" (
	"user_id",
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "auth_user_user_permissions_user_id_a95ead1b" ON "auth_user_user_permissions" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "auth_user_user_permissions_permission_id_1fbb5f2c" ON "auth_user_user_permissions" (
	"permission_id"
);
CREATE INDEX IF NOT EXISTS "django_admin_log_content_type_id_c4bce8eb" ON "django_admin_log" (
	"content_type_id"
);
CREATE INDEX IF NOT EXISTS "django_admin_log_user_id_c564eba6" ON "django_admin_log" (
	"user_id"
);
CREATE UNIQUE INDEX IF NOT EXISTS "django_content_type_app_label_model_76bd3d3b_uniq" ON "django_content_type" (
	"app_label",
	"model"
);
CREATE UNIQUE INDEX IF NOT EXISTS "auth_permission_content_type_id_codename_01ab375a_uniq" ON "auth_permission" (
	"content_type_id",
	"codename"
);
CREATE INDEX IF NOT EXISTS "auth_permission_content_type_id_2f476e4b" ON "auth_permission" (
	"content_type_id"
);
CREATE INDEX IF NOT EXISTS "base_modell_Producent_id_b6a56bd2" ON "base_modell" (
	"Producent_id"
);
CREATE INDEX IF NOT EXISTS "base_katalog_grupa_grupa_id_93c9a5a2" ON "base_katalog_grupa" (
	"grupa_id"
);
CREATE INDEX IF NOT EXISTS "base_katalog_grupa_katalog_id_00d111c5" ON "base_katalog_grupa" (
	"katalog_id"
);
CREATE INDEX IF NOT EXISTS "base_czesc_Strona_katalog_id_263c7727" ON "base_czesc" (
	"Strona_katalog_id"
);
CREATE INDEX IF NOT EXISTS "base_grupa_user_id_d8f62326" ON "base_grupa" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "base_grupauser_grupa_id_6bc5a4df" ON "base_grupauser" (
	"grupa_id"
);
CREATE INDEX IF NOT EXISTS "base_grupauser_user_id_e6911d97" ON "base_grupauser" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "base_katalog_nadrzedny_katalog_wlascicel_id_3c59c75e" ON "base_katalog_nadrzedny" (
	"katalog_wlascicel_id"
);
CREATE INDEX IF NOT EXISTS "base_katalog_nadrzedny_modell_id_1a8582d1" ON "base_katalog_nadrzedny" (
	"modell_id"
);
CREATE INDEX IF NOT EXISTS "base_numer_katalogowy_czesc_czesc_id_b86cb552" ON "base_numer_katalogowy_czesc" (
	"czesc_id"
);
CREATE INDEX IF NOT EXISTS "base_numer_katalogowy_czesc_numer_katalogowy_id_5cb8a464" ON "base_numer_katalogowy_czesc" (
	"numer_katalogowy_id"
);
CREATE INDEX IF NOT EXISTS "base_strona_katalog_katalog_nadrzedny_id_49442612" ON "base_strona_katalog" (
	"katalog_nadrzedny_id"
);
CREATE INDEX IF NOT EXISTS "base_zdjecie_wlasciciel_id_2e581b89" ON "base_zdjecie" (
	"wlasciciel_id"
);
CREATE INDEX IF NOT EXISTS "django_session_expire_date_a5c62663" ON "django_session" (
	"expire_date"
);
CREATE INDEX IF NOT EXISTS "token_blacklist_outstandingtoken_user_id_83bc629a" ON "token_blacklist_outstandingtoken" (
	"user_id"
);
CREATE INDEX IF NOT EXISTS "base_numer_katalogowy_strona_katalog_id_d4062b78" ON "base_numer_katalogowy" (
	"strona_katalog_id"
);
COMMIT;
