/*
  Warnings:

  - You are about to drop the column `original_title` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `release_date` on the `movies` table. All the data in the column will be lost.
  - You are about to drop the column `vote_counter` on the `movies` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tmdb_id" TEXT NOT NULL,
    "imdb_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,
    "vote_average" INTEGER NOT NULL,
    "vote_count" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "movies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_movies" ("id", "imdb_id", "poster_path", "title", "tmdb_id", "userId", "vote_average", "vote_count") SELECT "id", "imdb_id", "poster_path", "title", "tmdb_id", "userId", "vote_average", "vote_count" FROM "movies";
DROP TABLE "movies";
ALTER TABLE "new_movies" RENAME TO "movies";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
