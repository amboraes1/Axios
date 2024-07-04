const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");

describe("Get a single product", () => {
  let config = {
    params: {
      results: 20,
    },
  };
  let response;
  it("Status code 200 ", async () => {
    response = await axios.get(
      `${jsonData.baseUrl}/products/${jsonData.productId}`
    );
    expect(response.status).to.be.equals(200);
  });
  it("Response is an object", async () => {
    expect(response).to.be.an("object");
  });

  it("Product name", () => {
    // console.log(response.data.name);
    expect(response.data.name).to.be.a("string");
  });

  it("Product Price", () => {
    expect(response.data.price).to.be.a("number");
    expect(response.data.price).to.be.above(0);
  });

  it("Product availability", () => {
    expect(response.data.inStock).to.be.true;
  });
});
