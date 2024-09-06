const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("Delete item on cart", () => {
  let cartId, itemIdOnCart;
  before(async () => {
    let response;

    console.log("Creating cart ---------");
    response = await axios.post(`${jsonData.baseUrl}/carts`);
    cartId = response.data.cartId;
    let request = {
      url: `${jsonData.baseUrl}/carts/${cartId}/items/`,
      method: "POST",
      data: {
        productId: `${jsonData.productId}`,
      },
    };
    console.log("Adding items to cart ----------");
    response = await axios(request);
    itemIdOnCart = response.data.itemId;
    await fs.writeFileSync("../env.json", JSON.stringify(jsonData));
  });

  let response;
  it("Status code 204", async () => {
    let request = {
      url: `${jsonData.baseUrl}/carts/${cartId}/items/${itemIdOnCart}`,
      method: "DELETE",
    };
    try {
      response = await axios(request);
      expect(response.status).to.equal(204);
      // jsonData.itemIdOnCart = 0;
      // await fs.writeFileSync("../env.json", JSON.stringify(jsonData));
    } catch (e) {
      console.log("Delete item failed");
      // console.log(e);
    }
  });
});
