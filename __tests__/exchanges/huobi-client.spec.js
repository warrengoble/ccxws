const { testClient } = require("../test-runner");
const HuobiClient = require("../../src/exchanges/huobi-client");

testClient({
  clientFactory: () => new HuobiClient(),
  clientName: "HuobiClient",
  exchangeName: "Huobi",
  markets: [
    {
      id: "btcusdt",
      base: "BTC",
      quote: "USDT",
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
    tradeIdPattern: /[0-9]+/,
  },

  l2snapshot: {
    hasTimestampMs: true,
    hasSequenceId: false,
    hasCount: false,
  },
});
