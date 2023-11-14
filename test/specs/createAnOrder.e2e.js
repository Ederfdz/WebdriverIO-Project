const page = require("../../page");
const helper = require("../../helper");

describe("Create an order", () => {

  //TEST 1 Filling address input fields
  it("Should fill the address fields", async () => {
    // Sets the address
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await expect(await $(page.fromField)).toHaveValueContaining(
      "East 2nd Street, 601"
    );
    await expect(await $(page.toField)).toHaveValueContaining("1300 1st St");
  });

  //TEST 2 Selects 'Supportive' option
  it("Should select the Supportive class", async () => {
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await page.selectSupportiveClass();
    await expect(await $(page.supportiveButton)).toBeExisting();
  });

  //TEST 3 Fills in phone number form
  it("Should fill in phone number", async () => {
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    const phoneNumber = helper.getPhoneNumber("+1");
    await page.submitPhoneNumber(phoneNumber);
    await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
  });

  //TEST 4 Adds payment method
  it("Should add a credit card", async () => {
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await page.selectSupportiveClass();
    await page.addPaymentMethod();
    const paymentMethodCardIcon = await $(page.paymentMethodCardIcon);
    await expect(paymentMethodCardIcon).toBeExisting();
  });

  //TEST 5 Write a message to the driver
  it("Should write a message to the driver", async () => {
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    // Writes a message for driver
    await page.addMessageToDriver("Please drive fast");
    await expect(await $(page.messageToDriver)).toHaveValueContaining(
      "Please drive fast"
    );
  });

  //TEST 6 Orders a blanket & handkerchiefs
  it("Should order a blanket & handkerchief", async () => {
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await page.selectSupportiveClass();
    await page.enableBlanketHandkerchiefOption();
    const blanketHandkerchiefSwitchActive = await $(
      page.blanketHandkerchiefSwitchActive
    );
    await expect(blanketHandkerchiefSwitchActive).toBeChecked();
  });

  //TEST 7 Orders 2 ice creams
  it("Should order 2 ice creams", async () => {
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await page.selectSupportiveClass();
    await page.orderIceCream(2);
    const iceCreamCounterValue = await $(page.iceCreamCounterValue);
    await expect(iceCreamCounterValue).toHaveText("2");
  });

  //TEST 8 Order ride and wait for driver
  it("Should place an order and wait for driver", async () => {
    await browser.url("/");
    await page.fillAddresses("East 2nd Street, 601", "1300 1st St");
    await page.selectSupportiveClass();
    const phoneNumber = helper.getPhoneNumber("+1");
    await page.submitPhoneNumber(phoneNumber);
    await page.addPaymentMethod();
    await page.orderRide();
    const orderConfirmationModal = await $(page.orderConfirmationModal);
    await orderConfirmationModal.waitForDisplayed();
    await expect(orderConfirmationModal).toBeExisting();
  });
});
