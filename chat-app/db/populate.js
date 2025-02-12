const populateTables = require("./populate/populateTables");
const createUsersTableSQL = require("./create/createUserTable");
const createMessagesTable = require("./create/createMessagesTable");
const createMembershipsTable = require("./create/createMembershipsTable");
const createAdminsTable = require("./create/createAdminsTable");

populateTables([
  createUsersTableSQL,
  createMessagesTable,
  createMembershipsTable,
  createAdminsTable,
]);
