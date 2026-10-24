const base=require('@playwright/test');

exports.customTest=base.test.extend(
    {

       testDataForOrder : {

        email       : "d1122@gmail.com",
        password    : "Test@123",
        productName : "ZARA COAT 3"


     }

})

