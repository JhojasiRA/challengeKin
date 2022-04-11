import {Action} from '../globalTasks/Action';

export class IndexPage extends Action{
    get signInButton () { return $('//*[@id="sign-in-button"]');}
    get companyLogo () { return $('//*[@id="companyLogo"]');}
    get instructionLogOut () { return $('//*[@id="instruction"]');}

    public async goToSignIn(): Promise<void> {
        await this.click(this.signInButton);
    }
      
    public getLogOutPage(): WebdriverIO.Element{
        return this.signInButton;
    }
    public getCompanyLogo(): WebdriverIO.Element{
        return this.companyLogo;
    }

    public getInstructionLogOut(): WebdriverIO.Element{
        return this.instructionLogOut;
    }

}