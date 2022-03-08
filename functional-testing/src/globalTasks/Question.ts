
//const timeoutExplicitWait = 60000;
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const fs = require('fs');
chai.use(require('chai-like'));
chai.use(require('chai-things')); 

var intElementsTimeoutDefault = 30000;
global.intElementsTimeout = process.env.ELEMENTS_TIMEOUT !== undefined ? parseInt(process.env.ELEMENTS_TIMEOUT) : intElementsTimeoutDefault;
global.intElementsTimeout = isNaN(global.intElementsTimeout) ? intElementsTimeoutDefault : intElementsTimeoutDefault;

export class Question {

    public async assertTexts(firstText: string, secondText: string): Promise<void>{
        await expect(firstText).to.equal(secondText);
    }

    public async assertElementText(element, text: string): Promise<void>{
        await expect(await element.getText()).to.equal(text);
    }

    public async assertElementNotExist(element: WebdriverIO.Element): Promise<void>{
        await element.waitForExist({ timeout: global.intElementsTimeout , reverse: true});
        await expect(element.isExisting()).to.be.eventually.false 
    }

    public async assertElementExist(element: WebdriverIO.Element): Promise<void>{
        await element.waitForExist({ timeout: global.intElementsTimeout })
        await expect(element.isExisting()).to.be.eventually.true 
    }
    

    public async assertTwoTextsAreDifferent(oldValue: string, newValue: string): Promise<void>{
        await expect(oldValue).to.not.equal(newValue);
    }

    public async assertElementNotClickable(element: WebdriverIO.Element ): Promise<void>{
        await element.waitForClickable({timeout: global.intElementsTimeout, reverse: true});
    }

    public async assertElementClickable(element: WebdriverIO.Element): Promise<void>{
        await element.waitForClickable({timeout: global.intElementsTimeout});
    }

    public async assertElementContainsText(element, text: string): Promise<void>{
        await element.waitForVisible({timeout: global.intElementsTimeout});
        await expect(await element.getText()).to.contain(text)
    }

    public async assertTextContains(firstText: string, secondText: string): Promise<void>{
        await expect(firstText).contains(secondText);
    }

    public async assertFileDownloaded(filename:string, extensionFile:string):Promise<void>{
        var downloadDirectory = global.downloadsPath+"\\";
        var file=filename+"."+extensionFile;
        await browser.waitUntil(async function() {
            return await fs.existsSync(downloadDirectory +file)
        },
        {
            timeout: 60000,
            timeoutMsg: `File ${filename} didn't download in 60 seconds`
        })
    }

    public async assertArrayDoesNotContainObject(array: any, object: any): Promise<void>{
        await expect(array).to.be.an('array').that.not.contains.something.like(object);
    }

    public async assertTrue(expectedResult:boolean): Promise<void> {
        await expect(expectedResult).to.be.eventually.true
    }

    public async assertElementIsEnabled(element): Promise<void>{
        await expect(await element.isEnabled()).to.be.true
    }

    public async assertElementIsDisabled(element): Promise<void>{
        console.log(await element.isEnabled())
        await expect(await element.isEnabled()).to.be.false
    }

}
