/*
  Warnings:

  - Added the required column `latitude` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manufacturer` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mileage` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Report" (
    "report_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" DECIMAL NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "longitude" REAL NOT NULL,
    "latitude" REAL NOT NULL,
    "mileage" REAL NOT NULL
);
INSERT INTO "new_Report" ("price", "report_id") SELECT "price", "report_id" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
