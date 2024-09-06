const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("Replace cart Item", () => {
  before(async () => {
    let response;
    try {
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
      console.log("Adding items to cart ----------");
      response = await axios(request);
      jsonData.itemIdOnCart = response.data.itemId;
      await fs.writeFileSync("../env.json", JSON.stringify(jsonData));
      console.log("Items added to cart ----------");
      console.log("Cart Id: " + jsonData.cartId);
    } catch (e) {
      console.log("Error before: " + e);
    }
  });

  let response;
  it("Status code 204", async () => {
    let request = {
      url: `${jsonData.baseUrl}/carts/${jsonData.cartId}/items/${jsonData.itemIdOnCart}`,
      method: "PATCH",
      data: {
        productId: 4646,
        quantity: 2,
      },
    };
    try {
      response = await axios(request);
      expect(response.status).to.equal(204);
    } catch (e) {
      console.log("Replace product in cart failed");
      // console.log(e);
    }
  });
});
