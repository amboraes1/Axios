const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("Register API successfully", async () => {
  let request = {
    url: `${jsonData.baseUrl}/api-clients`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      clientName: "Test name",
      clientEmail: `test${Math.random()}@example.com`,
    },
  };
  let response;
  it("Status code is 201", async () => {
    response = await axios(request);
    expect(response.status).to.equal(201);
  });

  it("Access token not null", () => {
    expect(response.data).to.be.an("object");
    expect(response.data).haveOwnPropertyDescriptor("accessToken");
    expect(response.data.accessToken).is.not.empty;
    // jsonData.accessToken = response.data.accessToken;
    // fs.writeFileSync("../env.json", JSON.stringify(jsonData));
  });
});
