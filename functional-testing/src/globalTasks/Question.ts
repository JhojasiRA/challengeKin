import { getAllInvitations } from '../../services/Invitations';
import { apps } from '../../constant.json'
import {entitlements } from '../../support/Hooks'

var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.use(require('chai-like'));
chai.use(require('chai-things'));
var jp = require('jsonpath')

var intElementsTimeoutDefault = 30000;
global.intElementsTimeout = process.env.ELEMENTS_TIMEOUT !== undefined ? parseInt(process.env.ELEMENTS_TIMEOUT) : intElementsTimeoutDefault;
global.intElementsTimeout = isNaN(global.intElementsTimeout) ? intElementsTimeoutDefault : intElementsTimeoutDefault;

export class Question {
    
  public async assertAllocatedCredits(credits: number): Promise<void> {
    let creditsQuantity = await entitlements.allocatedCredits(credits);
    await expect(creditsQuantity).to.be.equal(parseInt(credits));
  }

  public async assertConsumedCredits(credits: number): Promise<void> {
    let creditsQuantity = await entitlements.consumedCredits(credits);
    await expect(creditsQuantity).to.be.equal(parseInt(credits));
  }

  public async assertTexts(
    firstText: string,
    secondText: string
  ): Promise<void> {
    await expect(firstText).to.equal(secondText);
  }

  public async assertElementText(element, text: string): Promise<void> {
    await element.waitForExist({ timeout: global.intElementsTimeout });
    await expect(await element.getText()).to.equal(text);
  }

  public async getValue(element) {
    await element.waitForExist({ timeout: global.intElementsTimeout });
    const initialValue = await element.getText();
    const intValue = parseInt(initialValue);
    return intValue;
  }

  public async compareInts(oldValue, newValue): Promise<void> {
    await expect(await oldValue).to.equal(await newValue);
  }

  public async assertElementNotExist(
    element: WebdriverIO.Element
  ): Promise<void> {
    await element.waitForExist({
      timeout: global.intElementsTimeout,
      reverse: true,
    });
    await expect(element.isExisting()).to.be.eventually.false;
  }

  public async assertElementExist(element: WebdriverIO.Element): Promise<void> {
    await element.waitForExist({ timeout: global.intElementsTimeout });
    await expect(element.isExisting()).to.be.eventually.true;
  }

  public async assertElementPresent(
    element: WebdriverIO.Element
  ): Promise<void> {
    await element.waitForDisplayed({ timeout: global.intElementsTimeout });
    await expect(element.isDisplayed()).to.be.eventually.true;
  }

  public async assertTwoTextsAreDifferent(
    oldValue: string,
    newValue: string
  ): Promise<void> {
    await expect(oldValue).to.not.equal(newValue);
  }

  public async assertTwoTextsAreEqual(
    oldValue: string,
    newValue: string
  ): Promise<void> {
    await expect(oldValue).to.equal(newValue);
  }

  public async assertElementNotClickable(
    element: WebdriverIO.Element
  ): Promise<void> {
    expect(await element.isClickable()).to.be.true;
  }

  public async assertElementClickable(
    element: WebdriverIO.Element
  ): Promise<void> {
    await element.waitForClickable({ timeout: global.intElementsTimeout });
  }

  public async assertElementNotPresent(
    element: WebdriverIO.Element
  ): Promise<void> {
    await element.waitForExist({
      timeout: global.intElementsTimeout,
      reverse: true,
    });
    await expect(await element.isExisting()).to.be.eventually.false;
  }

  public async assertElementContainsText(element, text: string): Promise<void> {
    await element.waitForExist({ timeout: global.intElementsTimeout });
    await expect(await element.getText()).to.contain(text);
  }

  public async assertTextContains(
    firstText: string,
    secondText: string
  ): Promise<void> {
    await expect(firstText).contains(secondText);
  }

  public async verifyActiveInvitation() {
    const response = await getAllInvitations(
      process.env.USERNAME,
      process.env.PASSWORD
    );
    let status = jp.query(response, "$..records[*].status");
    expect(await status)
      .to.be.an("array")
      .that.include("Active");
  }

  public async assertArrayDoesNotContainObject(
    array: any,
    object: any
  ): Promise<void> {
    await expect(array)
      .to.be.an("array")
      .that.not.contains.something.like(object);
  }

  public async assertTrue(expectedResult: boolean): Promise<void> {
    await expect(expectedResult).to.be.eventually.true;
  }

  public async assertElementIsEnabled(element): Promise<void> {
    await expect(await element.isEnabled()).to.be.true;
  }

  public async assertElementIsDisabled(element): Promise<void> {
    await expect(await element.isEnabled()).to.be.false;
  }
  public async assertElementAttributeContains(
    element: WebdriverIO.Element,
    attribute: string,
    text: string
  ): Promise<void> {
    let attributeValue = await element.getAttribute(attribute);
    await expect(attributeValue.includes(text)).to.be.true;
  }

  public async checkServicesVisible(root: string): Promise<void> {
    let servicesToCheck = new Array<string>();
    let map = new Map<string, string>();
    for (var value in apps) {
      map.set(value, apps[value]);
    }
    map.forEach((app, key) => {
      let appMap = new Map(Object.entries(app));
      if (root === "apps") {
        appMap.forEach((value) => {
          servicesToCheck.push(value);
        });
      } else if (root === key) {
        appMap.forEach((value) => {
          servicesToCheck.push(value);
        });
      }
    });
    for (const service of servicesToCheck) {
      try {
        await expect(await $(service).isDisplayed()).to.be.true;
      } catch (error) {
        throw new Error(
          "Expected to see service card with id: " +
            service +
            " but could not find it"
        );
      }
    }
  }
}
