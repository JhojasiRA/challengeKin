import {Action} from '../globalTasks/Action'

export class IndexPage extends Action{
    get signInButton () { return $('#sign-in-button')}

    async clickSignin(){
        await this.signInButton.click();
    }

}