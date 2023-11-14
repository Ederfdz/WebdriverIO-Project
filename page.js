module.exports = {
  // Inputs
  fromField: "#from",
  toField: "#to",
  phoneNumberField: "#phone",
  codeField: "#code",
  cardNumber: "#number",
  cvvCode: "#code.card-input",
  messageToDriver: "#comment[value]",
  // Buttons
  callATaxiButton: "button=Call a taxi",
  phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
  nextButton: "button=Next",
  confirmButton: "button=Confirm",
  supportiveButton: '(//img[@src="/static/media/kids.27f92282.svg"])[1]',
  paymentMethodButton: ".pp-text",
  addCardButton: "div=Add card",
  linkButton: "button=Link",
  paymentMethodModalCloseButton: ".payment-picker .modal .active .close-button",
  blanketHandkerchiefSwitch: "(//span[@class='slider round'])[1]",
  iceCreamCounterPlus: "(//div[@class='counter-plus'])[1]",
  orderButton: "(//button[@class='smart-button'])",
  // Misc
  addingACardText: "div=Adding a card",
  paymentMethodCardIcon: ".pp-value-container [alt=card]",
  iceCreamCounterValue: "(//div[@class='counter-value'])[1]",
  blanketHandkerchiefSwitchActive: "(//input[@class='switch-input'])[1]",
  // Modals
  phoneNumberModal: ".modal",
  orderConfirmationModal: "(//div[@class='order-header-title'])",

  // Functions
  fillAddresses: async function (from, to) {
    const fromField = await $(this.fromField);
    await fromField.setValue(from);
    const toField = await $(this.toField);
    await toField.setValue(to);
    const callATaxiButton = await $(this.callATaxiButton);
    await callATaxiButton.waitForDisplayed();
    await callATaxiButton.click();
  },
  fillPhoneNumber: async function (phoneNumber) {
    const phoneNumberButton = await $(this.phoneNumberButton);
    await phoneNumberButton.waitForDisplayed();
    await phoneNumberButton.click();
    const phoneNumberModal = await $(this.phoneNumberModal);
    await phoneNumberModal.waitForDisplayed();
    const phoneNumberField = await $(this.phoneNumberField);
    await phoneNumberField.waitForDisplayed();
    await phoneNumberField.setValue(phoneNumber);
  },
  submitPhoneNumber: async function (phoneNumber) {
    await this.fillPhoneNumber(phoneNumber);
    // we are starting interception of request from the moment of method call
    await browser.setupInterceptor();
    await $(this.nextButton).click();
    // we should wait for response
    // eslint-disable-next-line wdio/no-pause
    await browser.pause(2000);
    const codeField = await $(this.codeField);
    // collect all responses
    const requests = await browser.getRequests();
    // use first response
    await expect(requests.length).toBe(1);
    const code = await requests[0].response.body.code;
    await codeField.setValue(code);
    await $(this.confirmButton).click();
  },
  selectSupportiveClass: async function (phoneNumber) {
    const supportiveButton = await $(this.supportiveButton);
    await supportiveButton.waitForDisplayed();
    await supportiveButton.click();
  },
  addPaymentMethod: async function () {
    const paymentMethodButton = await $(this.paymentMethodButton);
    await paymentMethodButton.waitForDisplayed();
    await paymentMethodButton.click();

    const addCardButton = await $(this.addCardButton);
    await addCardButton.waitForDisplayed();
    await addCardButton.click();

    const cardNumber = await $(this.cardNumber);
    await cardNumber.waitForDisplayed;
    await cardNumber.setValue(1234123412341234);

    const cvvCode = await $(this.cvvCode);
    await cvvCode.waitForDisplayed();
    await cvvCode.setValue(77);

    const addingACardText = await $(this.addingACardText);
    await addingACardText.waitForDisplayed();
    await addingACardText.click();

    const linkButton = await $(this.linkButton);
    await linkButton.waitForDisplayed();
    await linkButton.click();

    const paymentMethodModalCloseButton = await $(
      this.paymentMethodModalCloseButton
    );
    await paymentMethodModalCloseButton.waitForDisplayed();
    await paymentMethodModalCloseButton.click();
    await browser.pause(4000);
  },
  addMessageToDriver: async function (message) {
    const messageToDriver = await $(this.messageToDriver);
    await messageToDriver.waitForDisplayed();
    await messageToDriver.setValue(message);
  },
  enableBlanketHandkerchiefOption: async function () {
    const blanketHandkerchiefSwitch = await $(this.blanketHandkerchiefSwitch);
    await blanketHandkerchiefSwitch.waitForDisplayed();
    await blanketHandkerchiefSwitch.click();
  },
  orderIceCream: async function (number) {
    const iceCreamCounterPlus = await $(this.iceCreamCounterPlus);
    await iceCreamCounterPlus.waitForDisplayed();
    for (let i = 0; i < number; i++) {
      await iceCreamCounterPlus.click();
    }
  },
  orderRide: async function () {
    const orderButton = await $(this.orderButton);
    await orderButton.waitForDisplayed();
    await orderButton.click();
    await browser.pause(40000);
  },
};
