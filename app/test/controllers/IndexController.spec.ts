import * as chai from "chai";
import * as supertest from "supertest";
import {serverConfig} from "../../config/ServerConfig";

describe("IndexController", function() {
    const server = supertest.agent(`http://${serverConfig.url}:${serverConfig.port}`);
    const pongText = "i'm alive";
    describe("pong method", function() {
        it(`Returns text '${pongText}`, (done) => {
            server
                .get("/")
                .end(function(err: any, res: any) {
                    if (err) {
                        return done(err);
                    }
                    chai.expect(res.body).to.equals(pongText);
                    done();
                });
        });
    });

});
