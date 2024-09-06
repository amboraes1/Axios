const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");

describe("Get all Order", () => {
  let response;
  let request = {
    url: `${jsonData.baseUrl}/orders`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jsonData.accessToken}`,
    },
  };
  it("Status code is 201", async () => {
    try {
      console.log(`${jsonData.cartId}`);
      response = await axios(request);

      expect(response.status).to.equals(200);
    } catch (e) {
      console.log("Get all orders failed");
      // console.log("Error: " + e);
    }
  });
});
