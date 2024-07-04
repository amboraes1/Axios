const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("Get cart items", () => {
  let response;
  it("Status code 200", async () => {
    response = await axios.get(
      `${jsonData.baseUrl}/carts/${jsonData.cartId}/items`
    );
    expect(response.status).to.equal(200);
  });
});
