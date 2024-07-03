const  axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");
const fs = require("fs")

describe("All products are returned", ()=> {
    let config = {
        params: {
            results: 20
        }
    }
    let response;
    it("Status code 200", async () => {
        response = await axios.get(`${jsonData.baseUrl}/products`, config);
        // console.log(response.data[0]);
        expect(response.status).equals(200);
        jsonData.productId = response.data[0].id;
        fs.writeFileSync('env.json', JSON.stringify(jsonData));
    })

    it("")
});
