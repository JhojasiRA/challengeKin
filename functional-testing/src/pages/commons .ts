import { Action } from '../globalTasks/Action';

export class Commons extends Action {
    get badRequest() {return browser.$('//*[ contains (text(),"The request was invalid")]');}

    public getBadRequestMessage(): WebdriverIO.Element {
        return this,this.badRequest;
    }

}