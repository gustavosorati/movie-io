/*
  Warnings:

  - You are about to alter the column `vote_average` on the `movies` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `vote_count` on the `movies` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tmdb_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,
    "vote_average" REAL NOT NULL,
    "vote_count" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "movies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_movies" ("id", "poster_path", "title", "tmdb_id", "userId", "vote_average", "vote_count") SELECT "id", "poster_path", "title", "tmdb_id", "userId", "vote_average", "vote_count" FROM "movies";
DROP TABLE "movies";
ALTER TABLE "new_movies" RENAME TO "movies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
