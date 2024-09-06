const axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs");

describe("Get a single product", () => {
  let request;
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
    await fs.writeFileSync("../env.json", JSON.stringify(jsonData));
    request = {
      url: `${jsonData.baseUrl}/products/${jsonData.productId}`,
      method: "GET",
    };
  });

  let response;
  it("Status code 200 ", async () => {
    response = await axios(request);
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
