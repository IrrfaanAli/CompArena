

/**
* Module dependencies.
*/
const express = require('express')
    , routes = require('./routes')
    , user = require('./routes/user')
    , http = require('http')

//const methodOverride = require('method-override');
const session = require('express-session');

var con = require('./connection');
const path = require('path');
const mysql = require('mysql');

var app = express();


var bodyParser = require('body-parser');
const { dirname } = require('path');

app.use(session({ secret: "secret" }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static('images'));


//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
//app.use(express.static(path.join(__dirname, 'public')));




//const express = require('express');
//const path =require('path');
//var bodyParser = require('body-parser');
//const mysql =require('mysql');
//const session = require('express-session');


app.get('/information', function (req, res) {
    res.render('information');
});
app.get('/about_us', function (req, res) {
    res.render('about_us');
});
app.get('/choose_us', function (req, res) {
    res.render('choose_us');
});
app.get('/contact_us', function (req, res) {
    res.render('contact_us');
});
app.get('/conditions_policy', function (req, res) {
    res.render('conditions_policy');
});
app.get('/policy', function (req, res) {
    res.render('policy');
});
app.get('/privacy_policy', function (req, res) {
    res.render('privacy_policy');
});
app.get('/return_policy', function (req, res) {
    res.render('return_policy');
});





app.get('/product', function (req, res) {
    res.sendFile(__dirname + '/admin_product.html');
});

app.post('/product', function (req, res) {
    var Product_name = req.body.Product_name;
    var Price = req.body.Price;
    var Type = req.body.Type;
    var Details = req.body.Details;
    var image = req.body.image;
    var Availability = req.body.Availability;
    var Status = req.body.Status;

    var sql = "INSERT INTO product(Product_name, Price, Type, Details, image, Availability, Status) VALUES('" + Product_name + "', '" + Price + "', '" + image + "','" + Type + "','" + Details + "','" + Availability + "','" + Status + "')";
    con.query(sql, function (error, result) {
        if (error) throw error;
        res.redirect('/product_read');

    })

});

app.get('/order_tracking', function (req, res) {
    res.render('order_tracking1');
})

app.get('/track', function (req, res) {
    var order_id = req.query.order_id;
    var sql = "select * from orders where order_id LIKE '%" + order_id + "%' ";

    con.query(sql, [order_id], function (error, result) {
        if (error) console.log(error);
        res.render('order_tracking2', { orders: result });
    });

})

//refund part
app.get('/refund', function (req, res) {
    res.render('refund');
})

app.get('/refund2', function (req, res) {
    res.render('refund2');
})

app.post('/refund', function (req, res) {
    var Order_Id1 = req.body.Order_Id1;
    var U_Name = req.body.U_Name;
    var U_Email = req.body.U_Email;
    var Message1 = req.body.Message1;

    var sql = "INSERT INTO refund1(Order_Id1, U_Name, U_Email, Message1) VALUES('" + Order_Id1 + "', '" + U_Name + "', '" + U_Email + "','" + Message1 + "')";

    con.query(sql, function (error, result) {
        if (error) throw error;
        res.redirect('/refund2');

    })
})

app.get('/refund_read', function (req, res) {

    var sql = "select * from refund1 order by Refund_ID ASC";

    con.query(sql, function (error, result) {
        if (error) console.log(error);
        res.render('admin_r', { refund1: result })
    });
});

app.get('/delete_refund', function (req, res) {

    var sql = "delete from refund1 where Refund_Id=?";

    var Refund_Id = req.query.Refund_Id;

    con.query(sql, [Refund_Id], function (error, result) {
        if (error) console.log(error);
        res.redirect('/refund_read');
    });
});

app.get('/update_refund', function (req, res) {

    var sql = "select * from refund1 where Refund_Id=?";

    var Refund_Id = req.query.Refund_Id;

    con.query(sql, [Refund_Id], function (error, result) {
        res.render('admin_r2', { refund1: result })
    });
});

app.post('/update_refund', function (req, res) {

    var Status1 = req.body.Status1;
    var Refund_Id = req.query.Refund_Id;

    var sql = "UPDATE refund1 set Status1=? where Refund_Id=?";

    con.query(sql, [Status1, Refund_Id], function (error, result) {
        if (error) console.log(error);
        res.redirect('/refund_read');
    });
});




app.get('/abc', function (req, res) {
    res.render('abc2');
})


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.get('/dashboard', function (req, res) {
    res.render('dashboard');
})



app.get('/', routes.index);//call for main index page
app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
app.get('/login', routes.index);//call for login page
app.post('/login', user.login);//call for login post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile', user.profile);//to render users profile





app.get('/product_read', function (req, res) {

    var sql = "select * from product order by Product_Name ASC";

    con.query(sql, function (error, result) {
        if (error) console.log(error);
        res.render('admin_p1', { product: result })
    });
});

app.get('/delete_product', function (req, res) {

    var sql = "delete from product where Product_Id=?";

    var Product_Id = req.query.Product_Id;

    con.query(sql, [Product_Id], function (error, result) {
        if (error) console.log(error);
        res.redirect('/product_read');
    });
});

app.get('/update_product', function (req, res) {

    var sql = "select * from product where Product_Id=?";

    var Product_Id = req.query.Product_Id;

    con.query(sql, [Product_Id], function (error, result) {
        res.render('admin_p2', { product: result })
    });
});

app.post('/update_product', function (req, res) {

    var Product_Name = req.body.Product_Name;
    var Price = req.body.Price;
    var Type = req.body.Type;
    var Details = req.body.Details;
    var image = req.body.image;
    var Availability = req.body.Availability;
    var Status = req.body.Status;
    var Product_Id = req.query.Product_Id;


    var sql = "UPDATE product set Product_Name=?, Price=?, Type=?, Details=?, image=?, Availability=?, Status=? where Product_Id=?";

    con.query(sql, [Product_Name, Price, Type, Details, image, Availability, Status, Product_Id], function (error, result) {
        if (error) console.log(error);
        res.redirect('/product_read');
    });
});

// Coupon part

app.get('/coupon2', function (req, res) {
    res.sendFile(__dirname + '/admin_coupon.html');
});

app.post('/coupon2', function (req, res) {
    var Coupon_Code = req.body.Coupon_Code;
    var Discount_Percentage = req.body.Discount_Percentage;

    var sql = "INSERT INTO coupon(Coupon_Code, Discount_Percentage) VALUES('" + Coupon_Code + "', '" + Discount_Percentage + "')";
    con.query(sql, function (error, result) {
        if (error) throw error;
        res.redirect('/coupon_read');

    })

});

app.get('/coupon_read', function (req, res) {

    var sql = "select * from coupon";

    con.query(sql, function (error, result) {
        if (error) console.log(error);
        res.render('admin_coupon1', { coupon: result })
    });
});

app.get('/delete_coupon', function (req, res) {

    var sql = "delete from coupon where Coupon_Id=?";

    var Coupon_Id = req.query.Coupon_Id;

    con.query(sql, [Coupon_Id], function (error, result) {
        if (error) console.log(error);
        res.redirect('/coupon_read');
    });
});

app.get('/update_coupon', function (req, res) {

    var sql = "select * from coupon where Coupon_Id=?";

    var Coupon_Id = req.query.Coupon_Id;

    con.query(sql, [Coupon_Id], function (error, result) {
        res.render('admin_coupon2', { coupon: result })
    });
});

app.post('/update_coupon', function (req, res) {

    var Coupon_Code = req.body.Coupon_Code;
    var Discount_Percentage = req.body.Discount_Percentage;
    var Coupon_Id = req.query.Coupon_Id;

    var sql = "UPDATE coupon set Coupon_Code=?, Discount_Percentage=? where Coupon_Id=?";

    con.query(sql, [Coupon_Code, Discount_Percentage, Coupon_Id], function (error, result) {
        if (error) console.log(error);
        res.redirect('/coupon_read');
    });
});


//order part
app.get('/order_read', function (req, res) {

    var sql = "select * from orders";

    con.query(sql, function (error, result) {
        if (error) console.log(error);
        res.render('admin_or1', { orders: result })
    });
});

app.get('/delete_order', function (req, res) {

    var sql = "delete from orders where order_id=?";

    var order_id = req.query.order_id;

    con.query(sql, [order_id], function (error, result) {
        if (error) console.log(error);
        console.log(order_id);

        res.redirect('/order_read');
    });
});

app.get('/update_order', function (req, res) {

    var sql = "select * from orders where order_id=?";

    var order_id = req.query.order_id;

    con.query(sql, [order_id], function (error, result) {
        res.render('admin_or2', { orders: result })
    });
});

app.post('/update_order', function (req, res) {

    //var Order_Details = req.body.Order_Details;
    var status = req.body.status;
    var order_id = req.query.order_id;

    var sql = "UPDATE orders set status=? where order_id=?";

    con.query(sql, [status, order_id], function (error, result) {
        if (error) console.log(error);
        res.redirect('/order_read');
    });
});




//ali

function isProductInCart(cart, Product_Id) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].Product_Id == Product_Id) {
            return true;
        }
    }
    return false;
}


function calculateTotal(cart, req) {
    total = 0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].dis_price) {
            total = total + (cart[i].dis_Price * cart[i].quantity);
        }
        else {
            total = total + (cart[i].Price * cart[i].quantity)
        }
    }
    req.session.total = total;
    return total;
}








app.get('/home', (req, res) => {



    con.query("SELECT * FROM product WHERE Status = 'New Arrival'", (err, result) => {

        res.render('homepage', { result: result });

    });

});


app.post('/add_to_cart', function (req, res) {

    var Product_Id = req.body.Product_Id;
    var Product_Name = req.body.Product_Name;
    var Price = req.body.Price;
    var quantity = req.body.quantity;
    var image = req.body.image;
    var product = { Product_Id: Product_Id, Product_Name: Product_Name, Price: Price, quantity: quantity, image: image }

    if (req.session.cart) {
        var cart = req.session.cart;

        if (!isProductInCart(cart, Product_Id)) {
            cart.push(product);
        }
    }
    else {
        req.session.cart = [product];
        var cart = req.session.cart;
    }

    //calculate tolal
    calculateTotal(cart, req);

    // return to cart page 
    res.redirect('/cart');
});

app.get('/cart', function (req, res) {

    var cart = req.session.cart;
    var total = req.session.total;

    res.render('cart', { cart: cart, total: total });

});

app.post('/remove_product', function (req, res) {

    var Product_Id = req.body.Product_Id;
    var cart = req.session.cart;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].Product_Id == Product_Id) {
            cart.splice(cart.indexOf(i), 1);
        }
    }

    //re-calculate
    calculateTotal(cart, req);
    res.redirect('/cart');

});

app.post('/edit_product_quantity', function (req, res) {
    //get value from input
    var Product_Id = req.body.Product_Id;
    var quantity = req.body.quantity;
    var increase_btn = req.body.increase_product_quantity;
    var decrease_btn = req.body.decrease_product_quantity;

    var cart = req.session.cart;

    if (decrease_btn) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].Product_Id == Product_Id) {
                if (cart[i].quantity > 1) {
                    cart[i].quantity = parseInt(cart[i].quantity) - 1;
                }
            }
        }
    }

    if (increase_btn) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].Product_Id == Product_Id) {
                if (cart[i].quantity > 0) {
                    cart[i].quantity = parseInt(cart[i].quantity) + 1;
                }
            }
        }
    }

    calculateTotal(cart, req);
    res.redirect('/cart')

});

app.get('/checkout', function (req, res) {

    var total = req.session.total
    res.render('checkout', { total: total });
});

app.post('/place_order', function (req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var city = req.body.city;
    var address = req.body.address;
    var cost = req.session.total;
    var status = "Processing";
    var date = new Date();
    var product_ids = "";

    var cart = req.session.cart;
    for (let i = 0; i < cart.length; i++) {
        product_ids = product_ids + "," + cart[i].id;
    }


    var query = "INSERT INTO orders(cost,name,email,status,city,address,phone,date,product_ids) VALUES ?";
    var values = [
        [cost, name, email, status, city, address, phone, date, product_ids]
    ];

    con.query(query, [values], (err, result) => {
        res.redirect('/xyz')

    });

});


app.get('/xyz', function (req, res) {
    var order_id = req.query.order_id;
    var sql = "SELECT * FROM orders ORDER BY order_id DESC LIMIT 1 "

    con.query(sql, [order_id], function (error, result) {
        if (error) console.log(error);
        res.render('xyz', { orders: result });
    });
})


app.get('/payment', function (req, res) {
    var order_id = req.query.order_id;

    var sql = "select MAX(order_id) from orders"
    res.render('payment');
    /* con.query(sql, [order_id], function (error, result) {
         if (error) console.log(error);
         res.render('payment', { orders: result });
     });*/
});


function discountprice(req, result) {

    var total = req.session.total;
    var dis = (result / 100) * req.session.total;
    req.session.total = total - dis;
    return total - dis;
}

app.post('/coupon', function (req, res) {

    var Coupon_Code = req.body.Coupon_Code;


    var sql = 'SELECT Discount_Percentage FROM coupon WHERE Coupon_Code = ?';
    con.query(sql, [Coupon_Code], function (err, result) {
        if (err) throw err;

        Object.keys(result).forEach(function (key) {
            var row = result[key];
            discountprice(req, row.Discount_Percentage);
            res.redirect('/cart');
        });



    });




});




app.get('/shop', (req, res) => {



    con.query("SELECT * FROM product ", (err, result) => {

        res.render('shop', { result: result });

    });

});


app.post('/add_to_details', function (req, res) {

    var Product_Id = req.body.Product_Id;
    var Product_Name = req.body.Product_Name;
    var Price = req.body.Price;
    var quantity = req.body.quantity;
    var Availability = req.body.Availability;
    var Details = req.body.Details;
    var Type = req.body.Type;
    var image = req.body.image;
    var product = { Product_Id: Product_Id, Product_Name: Product_Name, Price: Price, Type: Type, image: image, Details: Details, Availability: Availability }


    req.session.details = [product];



    res.redirect('/details');
});

app.get('/details', function (req, res) {

    var result = req.session.details;


    res.render('details', { result: result });

});


app.get('/in_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'In Stock'   ", (err, result) => {

        res.render('shop', { result: result });

    });
});

app.get('/out_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Out Stock'  ", (err, result) => {

        res.render('shop', { result: result });

    });
});
app.get('/pre_order', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Pre Order'    ", (err, result) => {

        res.render('shop', { result: result });

    });


});

app.get('/latest', (req, res) => {


    con.query("SELECT * FROM product WHERE Status = 'New Arrival'  ", (err, result) => {

        res.render('shop', { result: result });

    });
});

app.get('/low-high', (req, res) => {


    con.query("SELECT * FROM product  ORDER BY Price ASC ", (err, result) => {

        res.render('shop', { result: result });

    });
});


app.get('/high-low', (req, res) => {


    con.query("SELECT * FROM product  ORDER BY Price DESC ", (err, result) => {

        res.render('shop', { result: result });

    });
});


// Electronics part

app.get('/electronics', (req, res) => {


    con.query("SELECT * FROM product WHERE Type = 'Electronics' ", (err, result) => {

        res.render('electronics', { result: result });

    });
});

app.get('/elec_in_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'In Stock'  AND  Type = 'Electronics'  ", (err, result) => {

        res.render('electronics', { result: result });

    });
});

app.get('/elec_out_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Out Stock'  AND  Type = 'Electronics'  ", (err, result) => {

        res.render('electronics', { result: result });

    });
});
app.get('/elec_pre_order', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Pre Order'  AND  Type = 'Electronics'  ", (err, result) => {

        res.render('electronics', { result: result });

    });


});

app.get('/elec_latest', (req, res) => {


    con.query("SELECT * FROM product WHERE Status = 'New Arrival'  AND  Type = 'Electronics'  ", (err, result) => {

        res.render('electronics', { result: result });

    });
});

app.get('/elec_low-high', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Electronics' ORDER BY Price ASC ", (err, result) => {

        res.render('electronics', { result: result });

    });
});


app.get('/elec_high-low', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Electronics' ORDER BY Price DESC ", (err, result) => {

        res.render('electronics', { result: result });

    });
});


// clothing part





app.get('/clothing', (req, res) => {


    con.query("SELECT * FROM product WHERE Type = 'Clothing' ", (err, result) => {

        res.render('clothing', { result: result });

    });
});

app.get('/clo_in_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'In Stock'  AND  Type = 'Clothing'  ", (err, result) => {

        res.render('clothing', { result: result });

    });
});

app.get('/clo_out_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Out Stock'  AND  Type = 'Clothing'  ", (err, result) => {

        res.render('clothing', { result: result });

    });
});
app.get('/clo_pre_order', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Pre Order'  AND  Type = 'Clothing'  ", (err, result) => {

        res.render('clothing', { result: result });

    });


});

app.get('/clo_latest', (req, res) => {


    con.query("SELECT * FROM product WHERE Status = 'New Arrival'  AND  Type = 'Clothing'  ", (err, result) => {

        res.render('clothing', { result: result });

    });
});

app.get('/clo_low-high', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Clothing' ORDER BY Price ASC ", (err, result) => {

        res.render('clothing', { result: result });

    });
});


app.get('/clo_high-low', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Clothing' ORDER BY Price DESC ", (err, result) => {

        res.render('clothing', { result: result });

    });
});







// Cosmetics Part


app.get('/cosmetics', (req, res) => {


    con.query("SELECT * FROM product WHERE Type = 'Cosmetics' ", (err, result) => {

        res.render('cosmetics', { result: result });

    });
});

app.get('/cos_in_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'In Stock'  AND  Type = 'Cosmetics'  ", (err, result) => {

        res.render('cosmetics', { result: result });

    });
});

app.get('/cos_out_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Out Stock'  AND  Type = 'Cosmetics'  ", (err, result) => {

        res.render('cosmetics', { result: result });

    });
});
app.get('/cos_pre_order', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Pre Order'  AND  Type = 'Cosmetics'  ", (err, result) => {

        res.render('cosmetics', { result: result });

    });


});

app.get('/cos_latest', (req, res) => {


    con.query("SELECT * FROM product WHERE Status = 'New Arrival'  AND  Type = 'Cosmetics'  ", (err, result) => {

        res.render('cosmetics', { result: result });

    });
});

app.get('/cos_low-high', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Cosmetics' ORDER BY Price ASC ", (err, result) => {

        res.render('cosmetics', { result: result });

    });
});


app.get('/cos_high-low', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Cosmetics' ORDER BY Price DESC ", (err, result) => {

        res.render('cosmetics', { result: result });

    });
});




// geroceries

app.get('/geroceries', (req, res) => {


    con.query("SELECT * FROM product WHERE Type = 'Geroceries' ", (err, result) => {

        res.render('geroceries', { result: result });

    });
});

app.get('/ge_in_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'In Stock'  AND  Type = 'Geroceries'  ", (err, result) => {

        res.render('geroceries', { result: result });

    });
});

app.get('/ge_out_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Out Stock'  AND  Type = 'Geroceries'  ", (err, result) => {

        res.render('geroceries', { result: result });

    });
});
app.get('/ge_pre_order', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Pre Order'  AND  Type = 'Geroceries'  ", (err, result) => {

        res.render('geroceries', { result: result });

    });


});

app.get('/ge_latest', (req, res) => {


    con.query("SELECT * FROM product WHERE Status = 'New Arrival'  AND  Type = 'Geroceries'  ", (err, result) => {

        res.render('geroceries', { result: result });

    });
});

app.get('/ge_low-high', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Geroceries' ORDER BY Price ASC ", (err, result) => {

        res.render('geroceries', { result: result });

    });
});


app.get('/ge_high-low', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Geroceries' ORDER BY Price DESC ", (err, result) => {

        res.render('geroceries', { result: result });

    });
});


// sports items

app.get('/sports_item', (req, res) => {


    con.query("SELECT * FROM product WHERE Type = 'Sports_Item' ", (err, result) => {

        res.render('sports_items', { result: result });

    });
});


app.get('/si_in_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'In Stock'  AND  Type = 'Sports_Item'  ", (err, result) => {

        res.render('sports_items', { result: result });

    });
});

app.get('/si_out_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Out Stock'  AND  Type = 'Sports_Item'  ", (err, result) => {

        res.render('sports_items', { result: result });

    });
});
app.get('/si_pre_order', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Pre Order'  AND  Type = 'Sports_Item'  ", (err, result) => {

        res.render('sports_items', { result: result });

    });


});

app.get('/si_latest', (req, res) => {


    con.query("SELECT * FROM product WHERE Status = 'New Arrival'  AND  Type = 'Sports_Item'  ", (err, result) => {

        res.render('sports_items', { result: result });

    });
});

app.get('/si_low-high', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Sports_Item' ORDER BY Price ASC ", (err, result) => {

        res.render('sports_items', { result: result });

    });
});


app.get('/si_high-low', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Sports_Item' ORDER BY Price DESC ", (err, result) => {

        res.render('sports_items', { result: result });

    });
});


//kitchen

app.get('/kitchen', (req, res) => {



    con.query("SELECT * FROM product WHERE Type = 'Kitchen' ", (err, result) => {

        res.render('kitchen', { result: result });

    });
});

app.get('/ki_in_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'In Stock'  AND  Type = 'Kitchen'  ", (err, result) => {

        res.render('kitchen', { result: result });

    });
});

app.get('/ki_out_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Out Stock'  AND  Type = 'Kitchen'  ", (err, result) => {

        res.render('kitchen', { result: result });

    });
});
app.get('/ki_pre_order', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Pre Order'  AND  Type = 'Kitchen'  ", (err, result) => {

        res.render('kitchen', { result: result });

    });


});

app.get('/ki_latest', (req, res) => {


    con.query("SELECT * FROM product WHERE Status = 'New Arrival'  AND  Type = 'Kitchen'  ", (err, result) => {

        res.render('kitchen', { result: result });

    });
});

app.get('/ki_low-high', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Kitchen' ORDER BY Price ASC ", (err, result) => {

        res.render('kitchen', { result: result });

    });
});


app.get('/ki_high-low', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Kitchen' ORDER BY Price DESC ", (err, result) => {

        res.render('kitchen', { result: result });

    });
});


//tools part

app.get('/tools', (req, res) => {


    con.query("SELECT * FROM product WHERE Type = 'Tools' ", (err, result) => {

        res.render('tools', { result: result });

    });
});


app.get('/to_in_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'In Stock'  AND  Type = 'Tools'  ", (err, result) => {

        res.render('tools', { result: result });

    });
});

app.get('/to_out_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Out Stock'  AND  Type = 'Tools'  ", (err, result) => {

        res.render('tools', { result: result });

    });
});
app.get('/to_pre_order', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Pre Order'  AND  Type = 'Tools'  ", (err, result) => {

        res.render('tools', { result: result });

    });


});

app.get('/to_latest', (req, res) => {


    con.query("SELECT * FROM product WHERE Status = 'New Arrival'  AND  Type = 'Tools'  ", (err, result) => {

        res.render('tools', { result: result });

    });
});

app.get('/to_low-high', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Tools' ORDER BY Price ASC ", (err, result) => {

        res.render('tools', { result: result });

    });
});


app.get('/to_high-low', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Tools' ORDER BY Price DESC ", (err, result) => {

        res.render('tools', { result: result });

    });
});





app.get('/baby_items', (req, res) => {


    con.query("SELECT * FROM product WHERE Type = 'Baby_Items' ", (err, result) => {

        res.render('babyitems', { result: result });

    });
});


app.get('/bi_in_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'In Stock'  AND  Type = 'Baby_Items'  ", (err, result) => {

        res.render('babyitems', { result: result });

    });
});

app.get('/bi_out_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Out Stock'  AND  Type = 'Baby_Items'  ", (err, result) => {

        res.render('babyitems', { result: result });

    });
});
app.get('/bi_pre_order', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Pre Order'  AND  Type = 'Baby_Items'  ", (err, result) => {

        res.render('babyitems', { result: result });

    });


});

app.get('/bi_latest', (req, res) => {


    con.query("SELECT * FROM product WHERE Status = 'New Arrival'  AND  Type = 'Baby_Items'  ", (err, result) => {

        res.render('babyitems', { result: result });

    });
});

app.get('/bi_low-high', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Baby_Items' ORDER BY Price ASC ", (err, result) => {

        res.render('babyitems', { result: result });

    });
});


app.get('/bi_high-low', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Baby_Items' ORDER BY Price DESC ", (err, result) => {

        res.render('babyitems', { result: result });

    });
});


app.get('/jewelery', (req, res) => {


    con.query("SELECT * FROM product WHERE Type = 'Jewelery' ", (err, result) => {

        res.render('jewelery', { result: result });

    });
});
app.get('/je_in_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'In Stock'  AND  Type = 'Jewelery'  ", (err, result) => {

        res.render('jewelery', { result: result });

    });
});

app.get('/je_out_stoke', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Out Stock'  AND  Type = 'Jewelery'  ", (err, result) => {

        res.render('jewelery', { result: result });

    });
});
app.get('/je_pre_order', (req, res) => {


    con.query("SELECT * FROM product WHERE Availability = 'Pre Order'  AND  Type = 'Jewelery'  ", (err, result) => {

        res.render('jewelery', { result: result });

    });


});

app.get('/je_latest', (req, res) => {


    con.query("SELECT * FROM product WHERE Status = 'New Arrival'  AND  Type = 'Jewelery'  ", (err, result) => {

        res.render('jewelery', { result: result });

    });
});

app.get('/je_low-high', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Jewelery' ORDER BY Price ASC ", (err, result) => {

        res.render('jewelery', { result: result });

    });
});


app.get('/je_high-low', (req, res) => {


    con.query("SELECT * FROM product WHERE  Type = 'Jewelery' ORDER BY Price DESC ", (err, result) => {

        res.render('jewelery', { result: result });

    });
});

//search code
app.get('/search', (req, res) => {

    var name = req.query.name;
    con.query("SELECT * FROM product WHERE  Product_Name LIKE '%" + name + "%' ", (err, result) => {

        res.render('search', { result: result });

    });
});




app.listen(7000);