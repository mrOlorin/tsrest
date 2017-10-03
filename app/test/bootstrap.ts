import server from "../app";
import Bootstrap from "../core/Bootstrap";
import {log} from "../services/LogService";

before(function(done) {
    require("../app");
    describe("bootstrap", function() {
        Bootstrap.evtDone.attach((isSuccessful: boolean): void => {
            if (!isSuccessful) {
                done("Bootstrap error. Aborting tests.");
            } else {
                done();
            }
        });
    });

});

after(function(done) {
    done();
});
