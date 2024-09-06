const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("All products are returned", () => {
  let request = {
    url: `${jsonData.baseUrl}/products`,
    method: "GET",
    params: {
      results: 20,
    },
  };
  let response;
  it("Status code 200", async () => {
    response = await axios(request);
    // console.log(response);
    expect(response.status).equals(200);
    jsonData.productId = response.data[0].id;
    await fs.writeFileSync("../env.json", JSON.stringify(jsonData));
  });

  it("data should not be empty", async () => {
    expect(response.data).to.not.be.empty;
  });
});
