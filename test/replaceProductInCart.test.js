const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("Get cart items", () => {
  let config = {
    quantity: 2,
  };
  let response;
  it("Status code 200", async () => {
    response = await axios.patch(
      `${jsonData.baseUrl}/carts/${jsonData.cartId}/items/${jsonData.itemIdOnCart}`
    );
    expect(response.status).to.equal(200);
  });
});
