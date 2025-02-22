const { testClient } = require("../test-runner");
const BitstampClient = require("../../src/exchanges/bitstamp-client");

testClient({
  clientFactory: () => new BitstampClient(),
  clientName: "BitstampClient",
  exchangeName: "Bitstamp",
  markets: [
    {
      id: "btcusd",
      base: "BTC",
      quote: "USD",
    },
  ],

  hasTickers: false,
  hasTrades: true,
  hasLevel2Snapshots: true,
  hasLevel2Updates: true,
  hasLevel3Snapshots: false,
  hasLevel3Updates: false,

  trade: {
    hasTradeId: true,
  },

  l2snapshot: {
    hasTimestampMs: true,
    hasSequenceId: false,
    hasCount: false,
  },

  l2update: {
    hasSnapshot: true,
    hasTimestampMs: true,
    hasSequenceId: false,
    hasCount: false,
  },
});
