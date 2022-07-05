const axios = require("axios");
const { expect } = require("chai");
const { StatusCodes } = require("http-status-codes");

describe("First Api Tests", () => {
  it("Consume GET Service", async () => {
    const response = await axios.get("https://httpbin.org/ip");

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data).to.have.property("origin");
  });

  it("Consume GET Service with query parameters", async () => {
    const query = {
      name: "John",
      age: "31",
      city: "New York",
    };

    const response = await axios.get("https://httpbin.org/get", { query });

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config.query).to.eql(query);
  });

  it("Consume HEAD Service", async () => {
    const headers = {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9,es;q=0.8",
      Host: "httpbin.org",
      Referer: "https://httpbin.org/",
      "Sec-Ch-Ua":
        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": '"macOS"',
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
      "X-Amzn-Trace-Id": "Root=1-62c45eab-1696255c4a076d86410337a9",
    };

    const response = await axios.head("https://httpbin.org/headers", {
      headers,
    });
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.headers["content-type"]).to.equal("application/json");
    expect(response.headers["content-length"]).to.equal("741");
    expect(response.config.headers).to.eql(headers);
  });

  it("Consume PATCH Service", async () => {
    const response = await axios.patch("https://httpbin.org/anything", {
      name: "Alejandro Rios",
      age: "24",
      as: "software engineer",
    });

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.data).to.be.equal(
      '{"name":"Alejandro Rios","age":"24","as":"software engineer"}'
    );
  });

  it("Consume PUT Service", async () => {
    const response = await axios({
      method: "put",
      url: "https://httpbin.org/anything",
      data: {
        title: "Making PUT Requests with Axios",
        status: "published",
      },
    });

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.data).to.be.equal(
      '{"title":"Making PUT Requests with Axios","status":"published"}'
    );
  });

  it("Consume DELETE Service", async () => {
    const response = await axios({
      method: "delete",
      url: "https://httpbin.org/anything",
    });

    console.log(response.data);
    expect(response.status).to.equal(StatusCodes.OK);
  });
});
