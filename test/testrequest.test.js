import axios from "axios";
import { expect } from "chai";
const url = "https://simple-grocery-store-api.glitch.me/products?results=20";
let productId = 8739;

describe("get one single product", async () => {
  it("Get product", async () => {
    const response = await axios.get(url, {
      params: {
        productId: productId,
      },
    });
    //console.log(response.data);
    expect(response.status).equals(200);
  });
});
