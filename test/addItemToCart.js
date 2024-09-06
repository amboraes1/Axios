const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("Add product to Cart", () => {
  //Needed data
  before(async () => {
    try {
      let response = await axios.post(`${jsonData.baseUrl}/carts`);
      jsonData.cartId = response.data.cartId;
      await fs.writeFileSync("../env.json", JSON.stringify(jsonData));
      // done();
    } catch (e) {
      // console.log("error " + e);
    }
  });

  let response;
  it("Status code 201", async () => {
    let request = {
      url: `${jsonData.baseUrl}/carts/${jsonData.cartId}/items/`,
      method: "POST",
      data: {
        productId: `${jsonData.productId}`,
      },
    };
    console.log("Antes de hacer el llamado");
    try {
      response = await axios(request);
      expect(response.status).equals(201);
      expect(response.data.created).to.be.true;
      jsonData.itemIdOnCart = response.data.itemId;
      // console.log(jsonData.itemIdOnCart);
      fs.writeFileSync("../env.json", JSON.stringify(jsonData));
    } catch (e) {
      console.log("Add Item to cart failed");
      // console.log(e);
    }
  });
});
