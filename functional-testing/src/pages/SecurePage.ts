import {Action} from '../globalTasks/Action'

/**
 * sub page containing specific selectors and methods for a specific page
 */
export class SecurePage extends Action {
    /**
     * define selectors using getter methods
     */
    get flashAlert () { return $('#flash') }
}
