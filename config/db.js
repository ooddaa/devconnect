const mongoose = require('mongoose');
const config = require('config');
const util = require('util')
const db = config.get('mongoURI');

const log = (...items) =>
    items.forEach(item =>
        console.log(util.inspect(item, { depth: null, colors: true }))
    );

async function connectDB() {
    try {
        const cn = await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected\n');
        // log(cn)
    } catch (error) {
        console.error(error.message);
        process.exit(1)
    }
}

module.exports = connectDB

/*
Mongoose {
  connections:
   [ NativeConnection {
       base: [Circular],
       collections: {},
       models: {},
       config: [Object],
       replica: false,
       options: null,
       otherDbs: [],
       relatedDbs: {},
       states: [Object],
       _readyState: 1,
       _closeCalled: false,
       _hasOpened: true,
       plugins: [],
       id: 0,
       _listening: false,
       _connectionString:
        'mongodb+srv://oda_user:Qqqwwe!23@oda1.udkui.mongodb.net/test?retryWrites=true&w=majority',
       _connectionOptions: [Object],
       client: [MongoClient],
       '$initialConnection': [Promise],
       name: 'test',
       host: 'oda1-shard-00-00.udkui.mongodb.net',
       port: 27017,
       user: 'oda_user',
       pass: 'Qqqwwe!23',
       db: [Db] } ],
  models: {},
  modelSchemas: {},
  options: { pluralization: true, [Symbol(mongoose:default)]: true },
  _pluralize: [Function: pluralize],
  Schema:
   { [Function: Schema]
     reserved:
      [Object: null prototype] {
        validate: 1,
        toObject: 1,
        schema: 1,
        save: 1,
        remove: 1,
        populated: 1,
        isNew: 1,
        isModified: 1,
        init: 1,
        get: 1,
        errors: 1,
        collection: 1,
        removeListener: 1,
        on: 1,
        listeners: 1,
        emit: 1,
        prototype: 1 },
     Types:
      { String: [Function],
        Number: [Function],
        Boolean: [Function],
        DocumentArray: [Function],
        Embedded: [Function],
        Array: [Function],
        Buffer: [Function],
        Date: [Function],
        ObjectId: [Function],
        Mixed: [Function],
        Decimal: [Function],
        Decimal128: [Function],
        Map: [Function],
        Oid: [Function],
        Object: [Function],
        Bool: [Function],
        ObjectID: [Function] },
     ObjectId:
      { [Function: ObjectId]
        schemaName: 'ObjectId',
        defaultOptions: {},
        get: [Function],
        set: [Function: set],
        _checkRequired: [Function],
        _cast: [Function: castObjectId],
        cast: [Function: cast],
        checkRequired: [Function] } },
  model: [Function],
  plugins:
   [ [ [Function], [Object] ],
     [ [Function], [Object] ],
     [ [Function], [Object] ],
     [ [Function], [Object] ],
     [ [Function: trackTransaction], [Object] ] ] }
*/