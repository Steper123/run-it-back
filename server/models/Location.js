/* eslint-disable camelcase */
const { Model } = require("objection");

class Location extends Model {
  // Table name is the only required property.
  static get tableName() {
    return "Location";
  }

  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        id: { type: "integer" },
        currGameId: { type: "integer" },
        name: { type: "integer" },
        address: { type: "string" },

      }
    };
  }

}

module.exports = Location;
