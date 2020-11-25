const express = require('express')
const cors = require('cors');
const bodyParser= require('body-parser')
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;

const collections = { products: "products",
users: "User",
customers: "customers",
transactions: "transactions"};
const app = express()
// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors());
app.options('*', cors());



// All your handlers here...
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
let db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/tent-house",  (err, client) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.

});
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }
app.get('/', (req, res) => {console.log('ggggg')})
app.post('/quotes', (req, res) => {/*...*/})
app.get('/about', function (req, res) {
    res.send('about')
  })
 app.post("/users/authenticate", (req, res) => {
    db.collection(collections.users).findOne({}, (err, docs) => {
      console.log(err, docs)
      if (err) {
        handleError(res, err.message, "Failed to get Product List");
      } else {
        res.status(200).json(docs);
      }
    });
  });
  app.get("/api/customers", (req, res) => {
    db.collection(collections.customers).find({}).toArray((err, docs) => {
      if (err) {
        handleError(res, err.message, "Failed to get Customer List");
      } else {
        res.status(200).json(docs);
      }
    });
  });
app.get("/api/products", (req, res) => {
    db.collection(collections.products).find({}).toArray((err, docs) => {
      if (err) {
        handleError(res, err.message, "Failed to get Product List");
      } else {
        res.status(200).json(docs);
      }
    });
  });
  app.get("/api/inventorySummary", (req, res) => {
    db.collection(collections.products).aggregate( [{ "$addFields" : {
        "Available Quantity": { $subtract: [ "$quantity_total", "$quantity_booked" ] },
       }}]).toArray((err, docs) => {
      if (err) {
        handleError(res, err.message, "Failed to get Summary Report");
      } else {
        res.status(200).json(docs);
      }
    });
  });
  app.get("/api/inventoryDetailed", (req, res) => {
    db.collection(collections.transactions).aggregate( [
      {
        $lookup:
           {
              from: collections.products,
              localField: "product_id",
              foreignField:  "product_id",
              as: "product"
          }
     },
     {
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$product", 0 ] }, "$$ROOT" ] } }
   },
   { $project: { product: 0 } },
      { "$addFields" : {
        "Available Quantity": { $subtract: [ "$quantity_total", "$quantity_booked" ] },
       }}]).toArray((err, docs) => {
      if (err) {
        handleError(res, err.message, "Failed to get Summary Report");
      } else {
        res.status(200).json(docs);
      }
    });
  });
  app.get("/api/transactionList", (req, res) => {
    db.collection(collections.transactions).aggregate([  {
      "$addFields": {
        timeStamp: {
          $toDate: "$_id"
        },
        transation_id: "$_id"
      }
    }]).sort({timeStamp: -1}).toArray((err, docs) => {
      if (err) {
        handleError(res, err.message, "Failed to fetch Transaction List");
      } else {
        res.status(200).json(docs);
      }
    });
  });
  app.post("/api/addTransc", (req, res) => {
    console.log(req.body, req.params)
    const updateTransaction = db.collection(collections.transactions)
    .insertOne(req.body
    );
    const updateQuantity = db.collection(collections.products)
    .updateOne(
        { product_id: req.body.product_id }, //hint: use .map(ObjectId) instead.
        { $inc: { quantity_booked : req.body.transaction_type === 'IN' ?  req.body.quantity : -req.body.quantity }}
    );
    Promise
    .all([updateTransaction, updateQuantity])
    .then((values) => {
        // const updateContactInfoResult = values[0];
        // const updateUsersResult       = values[1];
        // const updateUsers2Result      = values[2];
        console.log(values.map( s => s.result))
        return res.send({ success: true });

    })
    .catch((reason) => {

        logger.error(`msg`, reason);
        return res.status(400).send({ reason: 'unknown' });

    });
  });

  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
