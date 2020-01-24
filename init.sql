-- create tables
CREATE TABLE IF NOT EXISTS "rooms" ("id"   SERIAL , "name" VARCHAR(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
CREATE TABLE IF NOT EXISTS "users" ("id"   SERIAL , "name" VARCHAR(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, PRIMARY KEY ("id"));
CREATE TABLE IF NOT EXISTS "messages" ("id"   SERIAL , "text" VARCHAR(255) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "roomId" INTEGER REFERENCES "rooms" ("id") ON DELETE SET NULL ON UPDATE CASCADE, "userId" INTEGER REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("id"));
CREATE TABLE IF NOT EXISTS "accessTokens" ("id" VARCHAR(255) , "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, "userId" INTEGER REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE, PRIMARY KEY ("id"));

-- insert stub data
INSERT INTO "rooms" ("id","name","createdAt","updatedAt") VALUES (200,'First room',NOW(),NOW());
INSERT INTO "rooms" ("id","name","createdAt","updatedAt") VALUES (201,'Second room',NOW(),NOW());
INSERT INTO "users" ("id","name","createdAt","updatedAt") VALUES (100,'John Doe',NOW(),NOW());
INSERT INTO "users" ("id","name","createdAt","updatedAt") VALUES (101,'Matt Black',NOW(),NOW());
INSERT INTO "accessTokens" ("id","userId","createdAt","updatedAt") VALUES ('token1',100,NOW(),NOW());
INSERT INTO "accessTokens" ("id","userId","createdAt","updatedAt") VALUES ('token2',101,NOW(),NOW());
