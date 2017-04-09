
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

var intents = new builder.IntentDialog();
bot.dialog('/', intents);

intents.onDefault('/', [
	  function(session){
	      //anytime you connect to a bot it saves any information you want to save from the user
	    //	session.beginDialog('/profile');
	      if(!session.userData.name){
		  session.beginDialog('/profile');
	      }
	      else{
		  next();
	      }
	},
	function (session, results) {
	    session.send('Hello %s', session.userData.name); 
	    
	}
);

intents.matches(/^change name/i, [
       	    function (session) {
       	       	session.beginDialog('/profile');
	        },
	    function (session, results) {
	       	session.send('Ok... Changed your name to %s', session.userData.name);
	        }
]);

intents.matches(/^hero card/i, [
       	   function (session, results) {
	            var card = createHeroCard(session);
	            var msg = new builder.Message(session).addAttachment(card);
		    session.send(msg);    }
]);


bot.dialog('/unityQnA', basicQnAMakerDialog);
bot.dialog('/profile', [      
       	  function (session) {
       	      builder.Prompts.text(session, 'Hi! What is your name?');
       	  },
       	  function (session, results) {
       	      session.userData.name = results.response;
       	      session.endDialog();
       	  }
]);

function createHeroCard(session) {
         return new builder.HeroCard(session).title('BotFramework Hero Card').subtitle('Your bots — wherever your users are talking')
			  .text('Build and connect intelligent bots to interact with your users naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.')
			  .images([builder.CardImage.create(session, 'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg')])
			  .buttons([builder.CardAction.openUrl(session, 'https://docs.botframework.com/en-us/', 'Get Started')]);
}