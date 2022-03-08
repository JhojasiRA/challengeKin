import {Action} from '../globalTasks/Action'

export class HomePage extends Action{
    get rubikIcon () { return $('#rubick-menu-btn')}
    get vaultButton() { return $(`#card-Vault`) }
    get FTRAButton() { return $(`#card-SecureRemoteAccess`) }

    async accessVault(){
        await this.vaultButton.click();
    }

    async accessFTRA(){
        await this.FTRAButton.click();
    }
}


