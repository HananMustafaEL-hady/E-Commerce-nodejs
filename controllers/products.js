const Menu = require('../models/menu');
const Cart = require('../models/cart');
// const MenuOffers = require('../models/menuOffers');


///////////////////Menu////////////////////////////////////////////
exports.getmenu=async(req, res,next) => {
    console.log("ndsfjdklf");

    try {
        let menus = await Menu.find();
        res.status(200).send({menus, success:true})
        console.log(menus);
    } catch (error) {
        res.status(400).send({error, success:false})
    }

    // Menu.find({}, function(err, menu) {
    //     if (err) throw err;
    //     res.send(menu);

    // }).exec()
    
}


exports.postmenu=(req, res) => {
    const { name, price, description } = req.body;
   const menu =  Menu.create({ name:name, price:price, description:description });
   console.log(menu);
   res.send(menu);
    }

exports.patchdescription=(req, res) => {
    const { id } = req.params;
    const {description} = req.body;
     Menu.findOneAndUpdate({ _id: id}, {  description: description }, function(err, menu) {
            if (err) return handleError(err);
            console.log(menu);

            res.send(menu);
        });
}


exports.patchPrice=(req, res) => {
    const { id } = req.params;
    const {price} = req.body;
   
        Menu.findOneAndUpdate({ _id: id}, {  price: price }, function(err, menu) {
            if (err) return handleError(err);
            console.log(menu);

            res.send(menu);
        });
    
}


exports.patchName=(req, res) => {
    const { id } = req.params;
    const {name} = req.body;
  Menu.findOneAndUpdate({ _id: id}, {  name: name }, function(err, menu) {
        if (err) return handleError(err);
        console.log(menu);

        res.send(menu);
    });

   

}


exports.deleteMenu=(req, res) => {
    const { id } = req.params;


 Menu.deleteOne({ _id:id}, function(err,menu) {
        if (err) throw err;
        else res.send({ success: true })
        console.log(req.params);
        console.log(req.params);

    });


}




///////////////////////////////////////Cart/////////////////////////////////////////
exports.postcart=(req, res) => {
    const {Menucart,menuName,count,price} = req.body;
    
    const cart = Cart.create({ userid: req.signedata.id, Menucart:Menucart,menuName:menuName,count:count,price:price});
    res.send(cart);
}



exports.getcart=(req, res) => {
    Cart.find({userid:req.signedata.id})
    .populate('MenuR')
    .exec(function (err, doc) {
      if (err) return handleError(err);
      res.send(doc);
   })

}



exports.patchcount=(req, res) => {
    const { count } = req.body;
    const { id } = req.params;
   
    Cart.findOneAndUpdate({ _id: id, userid:req.signedata.id }, {count:count}, function(err, user_cart) {
        if (err) return handleError(err);

        res.send({ success: true })
    });


}



exports.deletecart=(req, res) => {
    const { id } = req.params;
    Cart.deleteOne({ _id: id, userid:req.signedata.id }, function(err) {
        if (err) return handleError(err);
        else res.send({ success: true })});

}




