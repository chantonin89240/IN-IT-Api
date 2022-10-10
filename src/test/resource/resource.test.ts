import { test } from "vitest";
import ResourceService from "../../service/Resources/ResourceService";
import { request, response } from "express";
import Resource from "../../domain/model/ResourceModel";
import { resolve } from "path";
describe("Using the resource router", () => {
  describe.concurrent("Getting", () => {
    //Concurrent in this case will allow faster testing!.. Otherwise, it is used for testing data updating tokens
    test("all resources", async () => {
      setTimeout(() => {
        //getResources needs to connect!
        expect(
          ResourceService.getResources(request, response)
        ).not.toThrowError();
        //Expect doesn't fail
        expect(
          200 <= response.statusCode && response.statusCode < 300,
          "doesn't respond as failure"
        ); //Would be unexpected from an open default GET route, which should always return *something* - even if said something is "empty"
        console.log(response);
        expect(response, "doesn't fail to GET").not.toBeNull();
        expect(response, "actually gets data").toBeDefined();
        resolve();
      }, 500);
    }); // not really effective, response doesn't contain expected data.
    // test("Getting a single resource", async () => {            // Should fail explicitly.
    //     setTimeout(() => {
    //         let req = request
    //         req.params.id = "1"
    //         expect(ResourceService.getResource(request,response)).not.toThrowError()
    //         expect(response).toBeTypeOf("object")
    //         expect(response)
    //     }, 1000);
    // })
    // test.fails("Doesn't return a resource that shouldn't exist", async () => {            // Should fail explicitly.
    //     setTimeout(() => {
    //         let req = request
    //         req.params.id = "-1"
    //         expect(ResourceService.getResource(request,response)).not.toThrowError()
    //         expect(response[0], "Data is insignificant").equals("")
    //         expect(response[0], "data doesn't exist").not.toBeNull()
    //         expect(response, "no unnecessary response overload").toBeGreaterThan(1)
    //     }, 1000);
    //})
  });
  // test.todo("Ensure a resource is created")
  // test.todo("Ensure a specific resource can be acquired")
  test.skip("Example test", () => {
    // Example test if specific data is expected. Not actually testing api, and thus, is skipped.
    const data = 8;
    expect(data, "Data is greater than 3").toBeGreaterThan(3);
    expect(data).toBeLessThan(100);
    expect(data).not.toBeNaN();
    expect(data > 3);
  });
  /* 
        Also useful:
        test.only() => Tests ONLY this one. Useful if you don't want to be bothered by other tests running when creating a test!
        test.skip() => Skips this test. Useful for not removing code while doing a batch of interdependant tests
        The two above can also be applied on "describe" too for only running a specific batch of tests!
        expect(*boolean test*) => good for Custom testing, but can get harder to read
        Since the functions "make up a sentence", I am assuming we are expected to make the route to also end up making a sentence too should it fail.
        More at https://vitest.dev/guide/
    */
});
