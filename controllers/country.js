var Country = require('../models/country');


// List of all country
exports.country_list = async function(req, res) {
    try{
        theCountries = await Country.find();
        res.send(theCountries);
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


    // Handle country create on POST.
    exports.country_create_post = async function(req, res) {
        console.log(req.body)
        let document = new Country();
        
        document.country_name = req.body.country_name;
        document.country_continent = req.body.country_continent;
        document.country_populationranking = req.body.country_populationranking;
        try{
        let result = await document.save();
        res.send(result);
        }
        catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
        }
    };

// Handle country delete on DELETE.
exports.country_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await Country.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
   };


// VIEWS
// Handle a show all view
    exports.country_view_all_Page = async function(req, res) {
    try{
    theCountries = await Country.find();
    res.render('countries', { title: 'Country Search Results', results: theCountries });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};

 
exports.country_detail = async function(req,res){
    console.log("detail"+req.params.id)
    try{
        result = await Country.findById(req.params.id);
        res.send(result);
    }catch(error){
        res.status(500);
        res.send(`{"error":document for id${req.params.id} not found`);
    }
};

//Handle country update form on PUT. 
exports.country_update_put = async function(req, res) { 
    console.log(`update on id ${req.params.id} with body 
${JSON.stringify(req.body)}`) 
    try { 
        let toUpdate = await  Country.findById( req.params.id) 
        // Do updates of properties 
        if(req.body.country_type)  
               toUpdate.country_type = req.body.country_type; 
        if(req.body.country_continent) toUpdate.country_continent = req.body.country_continent; 
        if(req.body.country_populationranking) toUpdate.country_populationranking = req.body.country_populationranking; 
        let result = await toUpdate.save(); 
        console.log("Sucess " + result) 
        res.send(result) 
    } catch (err) { 
        res.status(500) 
        res.send(`{"error": ${err}: Update for id ${req.params.id} 
failed`); 
    } 
};

exports.country_view_one_Page = async function(req, res) { 
    console.log("single view for id "  + req.query.id) 
    try{ 
        result = await Country.findById( req.query.id) 
        res.render('countrydetail',  
{ title: 'Country Detail', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
};

exports.country_create_Page =  function(req, res) { 
    console.log("create view") 
    try{ 
        res.render('countrycreate', { title: 'country Create'}); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 
exports.country_update_Page =  async function(req, res) { 
    console.log("update view for item "+req.query.id) 
    try{ 
        let result = await Country.findById(req.query.id) 
        res.render('countryupdate', { title: 'Country Update', toShow: result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 

exports.country_delete_Page = async function(req, res) { 
    console.log("Delete view for id "  + req.query.id) 
    try{ 
        result = await Country.findById(req.query.id) 
        res.render('countrydelete', { title: 'Country Delete', toShow: 
result }); 
    } 
    catch(err){ 
        res.status(500) 
        res.send(`{'error': '${err}'}`); 
    } 
}; 