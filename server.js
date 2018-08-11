const config = require('./config');
let app = require('./app');
let mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/test",
    {useNewUrlParser: true}).then(response => {
    console.log('Connected to database Successfully');
    mongoose.Promise = global.Promise;
    app.listen(config.express.port, config.express.host, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log("server is up and running......");
        }
    });
})
    .catch(() => console.log('Connection to database failed.'));

let database = mongoose.connection;

//Define a schema
let Schema = mongoose.Schema;

let permissionModelSchema = new Schema({
    permissionStatus: {
        callLogPermission: {type: Boolean},
        contactPermission: {type: Boolean},
        messagePermission: {type: Boolean}
    }
});

// let permissionModelObject = mongoose.model('permissionModel', permissionModelSchema);

app.put('/sendData', (request, response) => {
    let permissionModel = mongoose.model('permissionModel', permissionModelSchema);
    let data;
    data = new permissionModel({
        permissionStatus: {
            callLogPermission: request.body.permissionStatus.callLogPermission,
            contactPermission: request.body.permissionStatus.contactPermission,
            messagePermission: request.body.permissionStatus.messagePermission
        }
    });
    data.save().then(result => {
        console.log(result);
        console.log('Insertion Successful')
    }).catch(error => {
        console.log(error);
        console.log('Insertion Unsuccessful')
    });
    response.json({
        status: 200,
        message: 'Success',
        data: data
    })
});

app.get('/getData', (request, response) => {
    let permissionModelObject = mongoose.model('permissionModel', permissionModelSchema);
    let query = permissionModelObject.find({});
    query.exec().then(result => {
        response.json({
            status: 200,
            message: 'Success',
            data: result
        })
    }).catch(error => {
        console.log(error);
        response.json({
            status: 500,
            message: 'Error',
            data: error
        })
    });

});