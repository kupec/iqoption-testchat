-- create tables
CREATE TABLE IF NOT EXISTS "rooms" ("id"   SERIAL , "name" VARCHAR(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
CREATE TABLE IF NOT EXISTS "users" ("id"   SERIAL , "name" VARCHAR(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
CREATE TABLE IF NOT EXISTS "messages" ("id"   SERIAL , "text" VARCHAR(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "roomId" INTEGER REFERENCES "rooms" ("id") ON DELETE SET NULL ON UPDATE CASCADE, "userId" INTEGER REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("id"));

-- insert stub data
INSERT INTO "rooms" ("name","createdAt","updatedAt") VALUES ('First room',NOW(),NOW());
INSERT INTO "rooms" ("name","createdAt","updatedAt") VALUES ('Second room',NOW(),NOW());
INSERT INTO "users" ("name","createdAt","updatedAt") VALUES ('John Doe',NOW(),NOW());
INSERT INTO "users" ("name","createdAt","updatedAt") VALUES ('Matt Black',NOW(),NOW());
