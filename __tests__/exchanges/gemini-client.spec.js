const { testClient } = require("../test-runner");
const GeminiClient = require("../../src/exchanges/gemini-client");

testClient({
  clientFactory: () => new GeminiClient(),
  clientName: "GeminiClient",
  exchangeName: "Gemini",
  markets: [
    {
      id: "btcusd",
      base: "BTC",
      quote: "USD",
    },
    {
      id: "ethusd",
      base: "ETH",
      quote: "USD",
    },
    {
      id: "ltcusd",
      base: "LTC",
      quote: "USD",
    },
  ],

  hasTickers: false,
  hasTrades: true,
  hasLevel2Snapshots: false,
  hasLevel2Updates: true,
  hasLevel3Snapshots: false,
  hasLevel3Updates: false,

  trade: {
    hasTradeId: true,
  },

  l2snapshot: {
    hasTimestampMs: false,
    hasSequenceId: true,
    hasCount: false,
  },

  l2update: {
    hasSnapshot: true,
    hasTimestampMs: true,
    hasSequenceId: true,
    hasCount: false,
  },
});
