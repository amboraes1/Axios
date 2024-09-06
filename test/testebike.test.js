const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");

describe("E-bike added to the cart", () => {
  let response;
  it("testCaseName", async () => {
    let request = {
      url: `/carts/items/`,
      method: "POST",
      baseURL: "https://azr-onlinedev-cto-apim.azure-api.net",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2IjozLCJwcm9maWxlSWQiOiJjYW1pbG8tZnVlbnRlcyIsImFwcFVzZXJJZCI6ImNhbWlsby1mdWVudGVzIiwiY29tbWVyY2VUb29sc0lkIjoiZGUwYjI4YzYtMTE3MS00MWE5LTgyY2MtNjIxMjNkMzQ3ZWU1IiwiZmlyc3ROYW1lIjoiQ2FtaWxvIiwibGFzdE5hbWUiOiJGdWVudGVzIiwiY3JlYXRlZE9uIjoiMTcyMDcwODM0NDM4OCIsImhhc2giOiIyUFcrV1AzeUVkVTBjU28reitJR2pvQnpuTjBqR0R0a3BOU2Q3WnBuK1JZPSIsImlhdCI6MTcyMDcwODM0NH0.V-OM0ElfqlvFLkCxceDMYMk764uaTkivtdsKD0G_G-U`,
      },
      data: {
        sku: "treadwell-neo-grey-sm",
        quantity: 1,
        shippingMethod: "D2C",
        country: "US",
        currency: "USD",
        location: "en",
      },
    };
    try {
      response = await axios(request);
    } catch (e) {
      console.log("Error: " + e);
    }
  });
});
