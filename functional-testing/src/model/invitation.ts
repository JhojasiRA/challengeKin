export class Invitation {
    usermail: string
    resource: string
    role: string

    constructor(usermail: string, resource: string, role: string){
        this.usermail = usermail
        this.resource = resource
        this.role = role
    }

    
}