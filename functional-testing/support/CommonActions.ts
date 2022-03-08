// In this file, we define methods that would be used multiple teams in different steps or files among the whole framework
// For example, the next method is for fetching an ID from the browser session storage
export var getVault = async (hyphen:boolean) => {
    let vaultId: string = await browser.execute(`return JSON.parse(sessionStorage["oidc.user:${process.env.AUTH0_URL}:B8xsOAm8VmaV069R2oftG8A70PuFQtVa"])["profile"]["https://cloud.rockwellautomation.com/uid"];`);
    if(hyphen == true){
        return global.vaultHyphen = vaultId
    }
    else
    { 
        return global.vault = vaultId.replace(/-/g, "")
    }
}
