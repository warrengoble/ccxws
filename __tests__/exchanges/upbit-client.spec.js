const { testClient } = require("../test-runner");
const UpbitClient = require("../../src/exchanges/upbit-client");

testClient({
  clientFactory: () => new UpbitClient(),
  clientName: "UpbitClient",
  exchangeName: "Upbit",
  markets: [
    {
      id: "KRW-BTC",
      base: "KRW",
      quote: "BTC",
    },
    {
      id: "KRW-BTT",
      base: "KRW",
      quote: "BTT",
    },
  ],

  hasTickers: true,
  hasTrades: true,
  hasLevel2Snapshots: true,
  hasLevel2Updates: false,
  hasLevel3Snapshots: false,
  hasLevel3Updates: false,

  ticker: {
    hasTimestamp: true,
    hasLast: true,
    hasOpen: true,
    hasHigh: true,
    hasLow: true,
    hasVolume: true,
    hasQuoteVolume: true,
    hasChange: true,
    hasChangePercent: true,
    hasAsk: false,
    hasBid: false,
    hasAskVolume: false,
    hasBidVolume: false,
  },

  trade: {
    hasTradeId: true,
  },

  l2snapshot: {
    hasTimestampMs: true,
    hasSequenceId: false,
    hasCount: false,
  },
});
