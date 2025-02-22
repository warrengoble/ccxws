const { expect } = require("chai");
const winston = require("winston");
const sinon = require("sinon");
const EventEmitter = require("events").EventEmitter;
const Watcher = require("../src/watcher");

class MockClient extends EventEmitter {
  constructor() {
    super();
    this.reconnect = sinon.stub();
  }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe("Watcher", () => {
  let sut;
  let client;
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(winston);
    client = new MockClient();
    sut = new Watcher(client, 100);
    sinon.spy(sut, "stop");
  });

  after(() => {
    sandbox.restore();
  });

  describe("start", () => {
    before(() => {
      sut.start();
    });
    it("should trigger a stop", () => {
      expect(sut.stop.callCount).to.equal(1);
    });
    it("should start the interval", () => {
      expect(sut._intervalHandle).to.not.be.undefined;
    });
  });

  describe("stop", () => {
    before(() => {
      sut.stop();
    });
    it("should clear the interval", () => {
      expect(sut._intervalHandle).to.be.undefined;
    });
  });

  describe("on messages", () => {
    beforeEach(() => {
      sut._lastMessage = undefined;
    });
    it("other should not mark", () => {
      client.emit("other");
      expect(sut._lastMessage).to.be.undefined;
    });
    it("trade should mark", () => {
      client.emit("trade");
      expect(sut._lastMessage).to.not.be.undefined;
    });
    it("l2snapshot should mark", () => {
      client.emit("l2snapshot");
      expect(sut._lastMessage).to.not.be.undefined;
    });
    it("l2update should mark", () => {
      client.emit("l2update");
      expect(sut._lastMessage).to.not.be.undefined;
    });
    it("l3snapshot should mark", () => {
      client.emit("l3snapshot");
      expect(sut._lastMessage).to.not.be.undefined;
    });
    it("l3update should mark", () => {
      client.emit("l3update");
      expect(sut._lastMessage).to.not.be.undefined;
    });
  });

  describe("on expire", () => {
    before(() => {
      sut.start();
    });
    it("it should call reconnect on the client", async () => {
      await wait(150);
      expect(client.reconnect.callCount).to.equal(1);
    });
  });
});
