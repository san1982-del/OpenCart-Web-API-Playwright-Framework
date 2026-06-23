
import { expect, test } from "../src/fixtures/pagefixtures";
import { csvHelper } from "../src/utils/CSVHelper";

let registerTestData = csvHelper.readCsv('src/data/registerData.csv');
for(let row of registerTestData){
    test(`Register test ${row.firstname} : ${row.lastname}`, async ({registerPage})=>{
        await registerPage.goToRegisterPage();
        await registerPage.registerCustomer(row.firstname, row.lastname, row.email, row.telephone, row.password, row.password);
        expect(registerPage.existingCustomerRegisteration).toBeTruthy();
    })
}