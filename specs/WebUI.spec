# Getting Started with Gauge

This is an executable specification file. This file follows markdown syntax. Every heading in this file denotes a scenario. Every bulleted point denotes a step.
To execute this specification, use
	npm test

This is a context step that runs before every scenario
* Goto Zipmex page

## WebUI_Trade_USDTUSD

* Select a instrument for "USDT/USD"
* Get the best price to buy
* Adjust the price for "0.1" percent to buy
* Input amount "1.00" to buy
* Print "buy" order result
* Get the best price to sell
* Adjust the price for "0.1" percent to sell
* Input amount "1.00" to sell
* Print "sell" order result
