Parse.Cloud.define('place', async function(req, res) {
  const query = new Parse.Query('Place');
  if(req.params.target){query.contains("Place_name",req.params.target)}
  if(req.params.placeid){query.equalTo("Place_id",req.params.placeid)}
  if(req.params.obId){query.equalTo("objectId",req.params.obId)}
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


Parse.Cloud.define('place_ADD', async function(req,res){
  const placeAdd = Parse.Object.extend("Place");
  const PlaceAdd = new placeAdd();
  PlaceAdd.set("Place_name",req.params.placeName);
  PlaceAdd.set("img",req.params.file1);
  PlaceAdd.set("img_2",req.params.file2);
  PlaceAdd.set("img_3",req.params.file3);
  PlaceAdd.set("Place_devices",req.params.placeDevices);
  PlaceAdd.set("Place_detail",req.params.placeDetail);
  PlaceAdd.set("Place_max",parseInt(req.params.placeMax));
  PlaceAdd.set("Place_crash",null);
  PlaceAdd.set("Place_id",'ว่าง');
  PlaceAdd.set("Place_type",req.params.placeType);
  PlaceAdd.set("Place_phone",req.params.placePhone);
  PlaceAdd.set("Place_address",req.params.placeAddress);
  PlaceAdd.save()
});