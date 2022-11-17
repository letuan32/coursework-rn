import { openDatabase, enablePromise } from 'react-native-sqlite-storage';

enablePromise(true);

const DATABASE_NAME = "lt-cw-rn";
const TABLE_NAME = "trips";
const COLUMN_ID = "id";
const COLUMN_NAME = "name";
const COLUMN_DESTINATION = "destination";
const COLUMN_DATE = "date";
const COLUMN_RISKASSESSMENT = "isRequireRiskAssessment";
const COLUMN_DESCRIPTION = "description";


export async function getDbConnection() {
  const db = openDatabase({ name: DATABASE_NAME, location: 'default' });
  return db;
}

export async function initDatabase() {
  const db = await getDbConnection();
  db.executeSql(dropTable())
  db.executeSql(createTable())
  db.executeSql(seedData())
  db.close
}

export function createTable() {
  const query = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}
  (
    ${COLUMN_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
    ${COLUMN_NAME} VARCHAR(255),
    ${COLUMN_DESTINATION} VARCHAR(255),
    ${COLUMN_DATE} VARCHAR(255),
    ${COLUMN_RISKASSESSMENT}  VARCHAR(255),
    ${COLUMN_DESCRIPTION} VARCHAR(255)
  )`;
  return query
}

export async function insertTrip(db, name, destination, date, risk, description) {
  const insertQuery = `INSERT INTO ${TABLE_NAME}
  (
    ${COLUMN_NAME},
    ${COLUMN_DESTINATION},
    ${COLUMN_DATE},
    ${COLUMN_RISKASSESSMENT},
    ${COLUMN_DESCRIPTION}
  )
  VALUES ("${name}","${destination}","${date}","${risk}","${description}")`;
  return db.executeSql(insertQuery);
}

export async function getTrips(db) {
  const trip = [];
  const results = await db.executeSql(`SELECT * FROM ${TABLE_NAME}`);
  results.forEach(function (resultSet) {
    for (let i = 0; i < resultSet.rows.length; i++) {
      trip.push(resultSet.rows.item(i));
    }
  });
  return trip;
}

export async function updateTrip(db, name, destination, date, risk, description, id) {
  const insertQuery = `
  UPDATE ${TABLE_NAME}
  SET
    ${COLUMN_NAME} = "${name}",
    ${COLUMN_DESTINATION} = "${destination}",
    ${COLUMN_DATE} = "${date}",
    ${COLUMN_RISKASSESSMENT} = "${risk}",
    ${COLUMN_DESCRIPTION} = "${description}"
  WHERE ${COLUMN_ID} = ${id}`;
  return db.executeSql(insertQuery);
}

export async function deleteAll(db) {
  const query = `DELETE FROM ${TABLE_NAME}`;
  return db.executeSql(query);
}

export function dropTable() {
  const dropQuery = `DROP TABLE IF EXISTS ${TABLE_NAME}`;
  return dropQuery;
}

export function seedData() {
  const insertQuery = `INSERT INTO ${TABLE_NAME}
  (
    ${COLUMN_NAME},
    ${COLUMN_DESTINATION},
    ${COLUMN_DATE},
    ${COLUMN_RISKASSESSMENT},
    ${COLUMN_DESCRIPTION}
  )
  VALUES 
  ('Seed Name 1', 'Seed Destination 1', '17-11-2022', 'Yes', 'Seed Description 1'),
  ('Seed name 2', 'Seed destination 2', '17-11-2022', 'Yes', 'Seed Description 2'),
  ('Seed name 3', 'Seed destination 3', '17-11-2022', 'Yes', 'Seed Description 3'),
  ('Seed name 4', 'Seed destination 4', '17-11-2022', 'Yes', 'Seed Description 4'),
  ('Seed name 5', 'Seed destination 5', '17-11-2022', 'Yes', 'Seed Description 5'),
  ('Seed name 6', 'Seed destination 6', '17-11-2022', 'Yes', 'Seed Description 6'),
  ('Seed name 7', 'Seed destination 7', '17-11-2022', 'Yes', 'Seed Description 7')`;
  return insertQuery
}
