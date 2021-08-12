const math = require('mathjs');
/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    evaluate,
    waitFor,
    highlight,
    resizeWindow,
    clearHighlights,
    clear,
    $
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless,
        args: ["--window-size=1440,1000", "--incognito"]
    })
});

afterSuite(async () => {
    await closeBrowser();
});


// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Goto Zipmex page", async () => {
    await goto('https://trade.zipmex.com/trade/BTCUSD');
});

step("Select a instrument for <pair>", async (pair) => {

    /*
    const instrumentElements = `//div[@class="instrument-selector-popup__instrument-name" and text()="${pair}"]`;
    const instrumentHighlights = `//div[@class="instrument-selector-popup__instrument-name" and text()="${pair}"]//ancestor::div[@class="instrument-selector-popup__instrument-info"]`;
    await highlight($(instrumentHighlights));
    await click($(instrumentElements));
    */

    const instrumentElements = `//div[@class="instrument-selector-popup__instrument-name" and text()="${pair}"]//ancestor::div[@class="instrument-selector-popup__instrument-info"]`;
    await click($(instrumentElements));

});

step("Get the best price to buy", async () => {

    const orderBookBuyElements = `(//div[@class="flex-table__column orderbook__table-price orderbook__table-price--buy"])[1]`;
    await click($(orderBookBuyElements));

});

step("Get the best price to sell", async () => {

    const orderBookSellElements = `(//div[@class="flex-table__column orderbook__table-price orderbook__table-price--sell"])[last()]`;
    await click($(orderBookSellElements));

});

step("Adjust the price for <adjustPrice> percent to buy", async (adjustPrice) => {

    // set object by xpath
    const objBuyPriceInput = `(//div[@class="trading-layout__order-entry"]//input[@name="limitPrice"])[1]`;

    // get value and calculate new price
    let oldPrice = await evaluate($(objBuyPriceInput), (elem) => {
        return elem.getAttribute('value')
    })
    let newPrice = math.round(math.evaluate(`${oldPrice}+(${oldPrice}*${adjustPrice}/100)`), 4);
    
    // set new price to textbox
    await clear($(objBuyPriceInput));
    await write(newPrice, into($(objBuyPriceInput)));
    
});

step("Adjust the price for <adjustPrice> percent to sell", async (adjustPrice) => {

    // set object by xpath
    const objSellPriceInput = `(//div[@class="trading-layout__order-entry"]//input[@name="limitPrice"])[2]`;

    // get value and calculate new price
    let oldPrice = await evaluate($(objSellPriceInput), (elem) => {
        return elem.getAttribute('value')
    })
    let newPrice = math.round(math.evaluate(`${oldPrice}+(${oldPrice}*${adjustPrice}/100)`), 4);
    
    // set new price to textbox
    await clear($(objSellPriceInput));
    await write(newPrice, into($(objSellPriceInput)));
    
});

step("Input amount <amount> to buy", async (amount) => {

    // set object by xpath
    const objAmount = `(//input[@name="quantity"])[1]`;
    
    // set new price to textbox
    await clear($(objAmount));
    await write(amount, into($(objAmount)));
    
});

step("Input amount <amount> to sell", async (amount) => {

    // set object by xpath
    const objAmount = `(//input[@name="quantity"])[2]`;
    
    // set new price to textbox
    await clear($(objAmount));
    await write(amount, into($(objAmount)));
    
});

step("Print <orderType> order result", async (orderType) => {

    // set object by xpath
    const objInstrumentSymbol = `//span[@class="instrument-selector__symbol"]`;
    let objPriceInput, objAmount, objTotal;

    if (orderType==="buy") {
        objPriceInput = `(//div[@class="trading-layout__order-entry"]//input[@name="limitPrice"])[1]`;
        objAmount = `(//input[@name="quantity"])[1]`;
        objTotal = `(//input[@name="orderTotal"])[1]`;
    } else if (orderType==="sell") {
        objPriceInput = `(//div[@class="trading-layout__order-entry"]//input[@name="limitPrice"])[2]`;
        objAmount = `(//input[@name="quantity"])[2]`;
        objTotal = `(//input[@name="orderTotal"])[2]`;
    } else{
        return false;
    }

    // get value
    let instrument = await $(objInstrumentSymbol).text();
    let price = await evaluate($(objPriceInput), (elem) => {
        return elem.getAttribute('value')
    })
    let amount = await evaluate($(objAmount), (elem) => {
        return elem.getAttribute('value')
    })
    let total = await evaluate($(objTotal), (elem) => {
        return elem.getAttribute('value')
    })
    
    // print console log
    console.log(`\nTrade ${instrument}\n`);
    console.log(`with side = \t${orderType}\n`);
    console.log(`with price = \t${price}\n`);
    console.log(`with amount = \t${amount}\n`);
    console.log(`Total (USD) = \t${total}\n`);
    
});
