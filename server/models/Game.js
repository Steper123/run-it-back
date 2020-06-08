/* eslint-disable camelcase */
const { Model } = require("objection");

class Game extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "Game";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        locationId: { type: "integer" },
        playersNeeded: { type: "integer" },
        playersIn: { type: "integer" },
        startDate: { type: "string" },
        startTime: { type: "string" }

      }
    };
  }

}

module.exports = Game;
