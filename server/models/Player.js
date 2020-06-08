/* eslint-disable camelcase */
const { Model } = require("objection");

class Player extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "Player";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        //credentials
        id: { type: "integer" },
        name: { type: "string" },
        googleId: { type: "string" },
        primaryPos: { type: "integer" },
        height: { type: "integer" },
        weight: { type: "integer" },
        birthday: { type: "string" },
        primLocation: { type: "string" },
        //gameStatus
        loggedIn: { type: "boolean" },
        currGameID: { type: "integer", default: 0 },
        isAdmin: { type: "boolean", default: false }
      }
    };
  }

}

module.exports = Player;
