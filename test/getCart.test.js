const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("Get a cart", () => {
  before(async () => {
    let response;

    console.log("Creating cart ---------");
    response = await axios.post(`${jsonData.baseUrl}/carts`);
    jsonData.cartId = response.data.cartId;
    let request = {
      url: `${jsonData.baseUrl}/carts/${jsonData.cartId}/items/`,
      method: "POST",
      data: {
        productId: `${jsonData.productId}`,
      },
    };
    await fs.writeFileSync("../env.json", JSON.stringify(jsonData));
  });
  let response;
  it("Status code 200", async () => {
    response = await axios.get(`${jsonData.baseUrl}/carts/${jsonData.cartId}`);
    expect(response.status).to.equal(200);
    expect(response.data.items).to.be.empty;
  });
});
