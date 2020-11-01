Parse.Cloud.define('place', async function(req, res) {
  const query = new Parse.Query('Place');
  if(req.params.target){query.contains("Place_name",req.params.target)}
  if(req.params.placeid){query.equalTo("Place_id",req.params.placeid)}
  if(req.params.type){query.contains("Place_type",req.params.type)}
  if(Array.isArray(req.params.devices)&& req.params.devices.length){query.containsAll("Place_devices",req.params.devices)}
  if(req.params.max){query.lessThanOrEqualTo("Place_max",Number(req.params.max))}
  let results = await query.find();
  return results
});


Parse.Cloud.define('booking', async function(req,res){
  const Addbooking = Parse.Object.extend("PlanBooking");
  const addbooking = new Addbooking();
  addbooking.set("Name_booking",req.params.Name_booking);
  addbooking.set("Place_id",req.params.Place_id);
  addbooking.set("Time_booking",req.params.Time_booking);
  addbooking.set("Date_booking",req.params.Date_booking);
  addbooking.set("Day_booking",req.params.Day_booking.toString());
  addbooking.set("Month_booking",req.params.Month_booking.toString());
  addbooking.save()
 
});

Parse.Cloud.define('placeBooked', async function(req, res) {
  const query = new Parse.Query('PlanBooking');
  query.equalTo("Place_id",req.params.Place_id);
  let results = await query.find();
  return results
});

Parse.Cloud.define('placeBookedsearch', async function(req, res) {
  const placeBookedsearchq = new Parse.Query('PlanBooking');
  placeBookedsearchq.equalTo("Place_id",req.params.Place_id);
  placeBookedsearchq.equalTo("Month_booking",req.params.Month_booking.toString());
  placeBookedsearchq.equalTo("Day_booking",req.params.Day_booking.toString());
  placeBookedsearchq.containedIn("Time_booking",req.params.Time_booking);
  let results = await placeBookedsearchq.find();
  return results
});

Parse.Cloud.define('News', async function(req, res) {
  const News = new Parse.Query('News');
  let results = await News.find();
  return results
});

Parse.Cloud.define('News_Del', async function(req, res) {
  const News = Parse.Object.extend('News');
  const news = new News();
  news.set("objectId",req.params.delid);
  news.destroy();
});

Parse.Cloud.define('News_add', async function(req,res){
  const NewsAdd = Parse.Object.extend("News");
  const newsAdd = new NewsAdd();
  newsAdd.set("News_Contain",req.params.contain);
  newsAdd.save()
});