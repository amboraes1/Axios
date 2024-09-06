const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("Get cart items", () => {
  before(async () => {
    let response;
    console.log("Creating cart ---------");
    try {
      response = await axios.post(`${jsonData.baseUrl}/carts`);
      jsonData.cartId = response.data.cartId;
      let request = {
        url: `${jsonData.baseUrl}/carts/${jsonData.cartId}/items/`,
        method: "POST",
        data: {
          productId: `${jsonData.productId}`,
        },
      };
      console.log("Adding items to cart ----------");
      response = await axios(request);
      jsonData.itemIdOnCart = response.data.itemId;
      await fs.writeFileSync("../env.json", JSON.stringify(jsonData));
    } catch (e) {
      console.log(e);
    }
  });

  let response;
  it("Status code 200", async () => {
    response = await axios.get(
      `${jsonData.baseUrl}/carts/${jsonData.cartId}/items`,
    );
    expect(response.status).to.equal(200);
  });
});
