-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tmdb_id" TEXT NOT NULL,
    "imdb_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,
    "vote_average" INTEGER NOT NULL,
    "vote_counter" INTEGER NOT NULL,
    "vote_count" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "movies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
