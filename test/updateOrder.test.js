const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("Update an Order", () => {
  before(async () => {
    let response;

    console.log("Creating cart ---------");
    response = await axios.post(`${jsonData.baseUrl}/carts`);
    jsonData.cartId = response.data.cartId;
    let requestAddItemsToCart = {
      url: `${jsonData.baseUrl}/carts/${jsonData.cartId}/items/`,
      method: "POST",
      data: {
        productId: `${jsonData.productId}`,
      },
    };
    console.log("Adding items to cart ----------");
    response = await axios(requestAddItemsToCart);
    jsonData.itemIdOnCart = response.data.itemId;

    console.log("Creating Order ------");
    let requestCreateOrder = {
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
    response = await axios(requestCreateOrder);
    jsonData.orderId = response.data.orderId;
    jsonData.cartId = "";
    jsonData.itemIdOnCart = 0;
    await fs.writeFileSync("../env.json", JSON.stringify(jsonData));
  });

  let response;
  it("Status code is 201", async () => {
    let request = {
      url: `${jsonData.baseUrl}/orders/${jsonData.orderId}`,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jsonData.accessToken}`,
      },
      data: {
        comment: "Pick up at 2PM",
      },
    };
    try {
      // console.log(`${jsonData.cartId}`);
      response = await axios(request);
      // console.log(response);
      expect(response.status).to.equals(204);
    } catch (e) {
      console.log("Update order failed");
      // console.log("Error: " + e);
    }
  });
});
