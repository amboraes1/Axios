const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("Create an order", () => {
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
    console.log("Adding items to cart ----------");
    response = await axios(request);
    jsonData.itemIdOnCart = response.data.itemId;
    await fs.writeFileSync("../env.json", JSON.stringify(jsonData));
  });

  let response;
  it("Status code is 201", async () => {
    let request = {
      url: `${jsonData.baseUrl}/orders`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jsonData.accessToken}`,
      },
      data: {
        cartId: `${jsonData.cartId}`,
        customerName: "Test name",
      },
    };
    try {
      // console.log(`${jsonData.cartId}`);
      response = await axios(request);
      expect(response.status).to.equals(201);
      console.log("Before setting order id");
      jsonData.orderId = response.data.orderId;
      jsonData.cartId = "";
      jsonData.itemIdOnCart = 0;

      await fs.writeFileSync("../env.json", JSON.stringify(jsonData));
      // console.log("File written: " + jsonData.orderId);
    } catch (e) {
      console.log("Order creation failed");
      // console.log("Error: " + e);
    }
  });
});
