import axios from "axios";
import { expect } from "chai";
describe("User can do login", () => {
  it("User can login successfully", async () => {
    let response = await axios.post(
      `http://dmoney.roadtocareer.net/user/login/user/login`,
      {
        email: "salman@roadtocareer.net",
        password: "1234",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(response.data);
    expect(response.data.message).contains("Login successfully");
  });
});
