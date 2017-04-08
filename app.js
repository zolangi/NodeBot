
//libraries i want to use
var restify = require('restify');
var builder = require('botbuilder');

/*Setting up the bot*/

var server = restify.createServer(); 
server.listen(process.env.port || process.env.PORT || 3978, function () {
	console.log('%s listening to %s', server.name, server.url);
    });
//^ says this (server.name) is listening to (server.url)

var connector = new builder.ChatConnector({
	appId: process.env.MICROSOFT_APP_ID,
	appPassword: process.env.MICROSOFT_APP_PASSWORD
    });

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

bot.dialog('/', [function(session){
	//anytime you connect to a bot it saves any information you want to save from the user
	    //	session.beginDialog('/profile');
	    function
	},
	function (session, results) {
	    session.send('Hello %s', session.userData.name); 
	    
	}
);

    bot.dialog('/profile', [
			    function(session){
				builder.Prompts.text(session, 'Hi wahts your name?');
			    },
			    function(session, results){
				session.userData.name = results.response;
				session.endDialog();
			    }
			    ]);