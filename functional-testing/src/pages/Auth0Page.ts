import {Action} from '../globalTasks/Action'

export class Auth0Page extends Action{
    get username () { return $('#username')}
    get password () { return $('#password')}
    get continueButton() {return $(`//button[@value='default']`)}

    async submitForm(username: string, password: string){
        await this.username.setValue(username);
        await this.password.setValue(password);
        await this.continueButton.click();
    }

}