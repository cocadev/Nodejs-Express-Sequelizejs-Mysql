import multer from 'multer'
import * as customers from '../controller/customer.controller.js';

module.exports = function(app) {
 

    global.__basedir = __dirname;
 
    // -> Multer Upload Storage
    const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '../../../uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
    });
    
    const upload = multer({storage: storage});
 
    //Customer
    app.post('/api/addCustomer', customers.create);
    app.get('/api/getAllCustomers', customers.findAll);
    app.get('/api/getOneCustomer/:customerId', customers.findById);
    app.put('/api/updateCustomer/:customerId', customers.update);
    app.delete('/api/deleteCustomer/:customerId', customers.deleteCustomer);
    app.get('/api/downloadAllCustomers/excel', customers.excelCustomer);
    app.get('/api/downloadAllCustomers/jsoncsv', customers.jsoncsv);
    app.post('/api/customer/upload', upload.single("uploadfile"), customers.uploadfile);

}