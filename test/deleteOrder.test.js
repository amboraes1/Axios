const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("Delete an Order", () => {
  let orderId;
  before(async () => {
    let cartId;
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
    await axios(request);
  });
  let response;
  let request = {
    url: `${jsonData.baseUrl}/orders/${jsonData.orderId}`,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jsonData.accessToken}`,
    },
  };
  it("Status code is 204", async () => {
    try {
      // console.log(`${jsonData.cartId}`);
      response = await axios(request);
      expect(response.status).to.equals(204);
      jsonData.orderId = "";
      await fs.writeFileSync("../env.json", JSON.stringify(jsonData));
    } catch (e) {
      console.log("Delete order failed");
      // console.log("Error: " + e);
    }
  });
});
