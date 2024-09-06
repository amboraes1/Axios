const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("Create an order Fail", () => {
  let response;
  it("Status code is 401", async () => {
    let request = {
      url: `${jsonData.baseUrl}/orders`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        cartId: `${jsonData.cartId}`,
        customerName: "Test name",
      },
    };
    try {
      response = await axios(request);
    } catch (e) {
      expect(e.response.status).to.equal(401);
      expect(e.response.data.error).to.equal("Missing Authorization header.");
    }
  });
});
