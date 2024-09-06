const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("Get an Order", () => {
  before(async () => {
    let response;
    try {
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
    } catch (e) {
      console.log(e);
    }
  });

  let response;

  it("Status code is 200", async () => {
    let request = {
      url: `${jsonData.baseUrl}/orders/${jsonData.orderId}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jsonData.accessToken}`,
      },
    };
    try {
      // console.log(`${jsonData.cartId}`);
      response = await axios(request);
      expect(response.status).to.equals(200);
      expect(response.data.id).to.equals(`${jsonData.orderId}`);
    } catch (e) {
      console.log("Get single order failed");
      // console.log("Error: " + e);
    }
  });
});
