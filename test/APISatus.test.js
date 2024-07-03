const  axios = require("axios");
const { expect } = require("chai");
const jsonData = require("../env.json");

// const url = "https://simple-grocery-store-api.glitch.me/status";

describe("API is up", ()=>{
    it("Status code is 200", async () => {
       // console.log((jsonData))
       let response = await axios.get(`${jsonData.baseUrl}/status`);

       expect(response.status).equals(200);
    })
})