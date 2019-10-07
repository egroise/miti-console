var assert = require('assert')
var mc = require("../")

describe("dir", function() {
    it("should list 1 js file in test folder", function() {
        var folder = mc.p(".","test")
        var files = mc.dir(folder,"js")
        assert.equal(files.length, 1)
    })
    it("should list 0 xml file in test folder", function() {
        var files = mc.dir(folder,"xml")
        assert.equal(files.length, 1)
    })
})