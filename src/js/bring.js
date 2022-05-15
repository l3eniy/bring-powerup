const bringApi = require(`bring-shopping`);
main();

async function main () {
    // provide user and email to login
    const bring = new bringApi({mail: `benjamin.fuhlbruegge@gmail.com`, password: `9PiC!TSxnRXLrG&Q`});

    // login to get your uuid and Bearer token
    try {
        await bring.login();
        console.log(`Successfully logged in as ${bring.name}`);
    } catch (e) {
        console.error(`Error on Login: ${e.message}`);
    }

    // get all lists and their listUuid
    const lists = await bring.loadLists();
    //console.log(lists);

    // get items of a list by its list uuid
    const items = await bring.getItems('9b7a5bb0-f4f2-4b83-b545-3fa72545216d');
    console.log(items);

    // get translations
    const translations = await bring.loadTranslations('de-DE');

    // test
    const xyz = await bring.saveItem('9b7a5bb0-f4f2-4b83-b545-3fa72545216d',"Gouda", "2TL")
}