var whitelist = [
    'http://localhost:4200',
    'http://www.facebook.com'
];
module.exports =  {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
