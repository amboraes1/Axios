const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("Register API fail", async () => {
  let request = {
    url: `${jsonData.baseUrl}/api-clients`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      clientName: "Test name",
      clientEmail: "valentin_teeesst5@example.com",
    },
  };
  let response;
  it("Status code is 409", async () => {
    try {
      response = await axios(request);
    } catch (e) {
      expect(e.response.status).to.equal(409);
      expect(e.response.data.error).to.equal(
        "API client already registered. Try a different email.",
      );
      // console.log(e);
    }
  });
});
