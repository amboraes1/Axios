const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("Create a cart", () => {
  let response;
  it("Status code", async () => {
    response = await axios.post(`${jsonData.baseUrl}/carts`);
    expect(response.status).to.be.equals(201);
    jsonData.cartId = response.data.cartId;
    fs.writeFileSync("../env.json", JSON.stringify(jsonData));
  });
});
