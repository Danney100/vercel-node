const Product = require("../models/Product");
const StellarBase = require('stellar-base');

// GET all products
exports.listAllProducts = (req, res) => {
  Product.find({}, (err, event) => {
    if (err) {
      err.reason = "Read failed";
      res.status(404).send(err);
      return;
    }
    res.status(200).json(event);
    return;
  });
};

// CREATE new product
exports.createNewProduct = (req, res) => {
  if (StellarBase.StrKey.isValidEd25519PublicKey(req.body.publicKey) === true) {
    var publicKeySave = req.body.publicKey;
  } else if (StellarBase.StrKey.isValidEd25519SecretSeed(req.body.publicKey) === true) {
    res.status(400).json({Error: "Secret Key detected! SECURITY COMPRIMISED, move funds to a new account and keep new secret key A SECRET!"});
    return;
  } else {
    res.status(400).json({Error: "Not a valid Stellar Public Key"});
    return;
  }
  let newProduct = new Product({
    productTitle: req.body.productTitle,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    publicKey: publicKeySave
  });
  newProduct
    .save((err, event) => {
    if (err) {
      res.status(404).send(err.message);
      return;
    }
    res.status(201).json(event);
    return;
  });
};

// READ one by ID
exports.readProduct = (req, res) => {
  Product.findById(req.params._id, (err, event) => {
    if (err || !event) {
      res.status(404).send('Item not found');
      return;
    } else
    res.status(302).json(event);
    return;
  });
};

// UPDATE one by ID
exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
    // console.log(updateOps) testing
  }
  Product.findOneAndUpdate(
    { _id: id },
    { $set: updateOps },
    {useFindAndModify: false},
    (err, event) => {
      if (err) {
        err.reason = "Update failed";
        res.status(404).send(err);
        return;
      }
      res.status(200).json(event);
      return;
    }
  );
};

// UPDATE memo by ID
  // ID from URL and push memoId into array
exports.addMemoId = (req, res) => {
  Product.findOneAndUpdate(
    {_id : req.params._id},
    { $push: req.body.memoId },
    (err, event) => {
      if (err) {
        err.reason = "Failed to add Memo ID";
        res.status(404).send(err);
        return;
      }
      res.status(200).json({message: "Successfully added Memo ID"});
      return;
    }
  );
}

// DELETE memo by ID
exports.removeMemoId = (req, res) => {
  Product.findOneAndUpdate(
    { _id: req.params._id },
    { $pull: req.body.memoId },
    (err, event) => {
      if (err) {
        err.reason = "Failed to remove Memo ID";
        res.status(404).send(err);
        return;
      }
      res.status(201).json({ message: "Successfully removed Memo ID" });
      return;
    }
  );
}

// DELETE product by ID
exports.deleteProduct = (req, res) => {
  Product.deleteOne({ _id: req.params._id }, (err, event) => {
    if (err) {
      err.reason = "Failed to delete entry";
      res.status(404).send(err);
      return;
    }
    res.status(200).json({ message: "Product successfully deleted" });
    return;
  });
};

// GET all public keys
  // Outputs: [arry of all public keys accociated with ID ]

exports.getAllPubKey = (req, res) => {
  Product.find({},{publicKey:1, memoIds:1, _id:1}, (err, event) => {
    if (err) {
      err.reason = "Read failed";
      res.status(404).send(err);
      return;
    } else {
      var data = [];
      for (var i in event) {
        data.push({
          id: event[i]._id,
          publicKey: event[i].publicKey,
          memoId: event[i].memoIds
        })
      }
      res.status(200).json({count: event.length, data: data});
      return;
    }
  })
}
