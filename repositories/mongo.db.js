import mongodb from 'mongodb';

function getClient(){
    const uri = "mongodb+srv://root:igti@cluster0.ryjfzri.mongodb.net/"
    return new mongodb.MongoClient(uri);
}

export { getClient }