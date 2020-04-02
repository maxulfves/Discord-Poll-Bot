const Discord = require('discord.js');


var dt = require('./res/msg/poll.js');
const file = new Discord.MessageAttachment('res/img/icon.png');

const client = new Discord.Client();

const userManager = new Discord.UserManager();


var fs = require('fs')

client.once('ready', () => {
	console.log('Ready!');
});

const prefix = "/"

var voteA = 0
var voteB = 0



//var pollMessage

const myPoll = {
	name: "NameOfPoll",
	options: [
		{name: "AAA", votes: 0, index: 0},
		{name: "BBB", votes: 0, index: 1}
	],

	voters: new Map(),

	pollMessage: null,

	getOptionsString(){
		var optionsString = ""
		myPoll.options.forEach(element => {
			//optionsString += ´[${element.index}]´ + element.name +  " 	* Votes * " + element.value + "\n"
			const str = (`[${element.index}] \t| ${element.name} \t Votes: ${element.votes}`);
			optionsString += str + "\n"
		});

		return optionsString
	},
	getPollString(){
		let pollText = fs.readFileSync("res/msg/pollMsg.txt", "utf8")
		return pollText.replace("[NAME]", myPoll.name).replace("[OPTIONS]", myPoll.getOptionsString())
	}
}

//When bot recieves a message from any channel:
client.on('message', message => {

	let content = message.content
	let channel = message.channel
	let server = message.guild
	let author = message.author

	if(content.startsWith(prefix)){
			message.delete() //Delete nessage.
			console.log("COMMAND: " + message.content)

			if( content.startsWith( prefix + "voters" ) ){
				let votersString = ""
				for (let [key, value] of myPoll.voters) {
					votersString += value.username + "\t" + value.vote + "\n"

				}
				author.send(votersString)
			}

			if(content.startsWith( prefix + "poll")) {
				const arr = content.split(" ")

				//Clear potential previous poll.
				myPoll.name = arr[1]
				myPoll.voters = new Map()
				myPoll.options = []

				const voters = [{id:0, name: "0", vote: 1}]

				//Add options to myPoll
				for(var i = 2; i < arr.length; i++){
					myPoll.options.push( { name: arr[i], votes: 0, index:i-2, voters: voters} )
				}

				channel.send({ files:[file], embed: dt.polling(author, myPoll) })
					.then(msg => myPoll.pollMessage = msg);

				/*
				channel.send(myPoll.getPollString())
					.then(msg => myPoll.pollMessage = msg)
				*/
			}


				/**
				 * On vote:
				 */
		  if( content.startsWith( prefix + "vote " ) ){
		    const nn = content.split(" ")
		    const vote = parseInt(nn[1].trim())

				if(!isNaN(vote)){
					if(myPoll.voters.get(author.id) != null ){
						let previousVote = myPoll.options.find(function(element) {
							return element.index == myPoll.voters.get(author.id).vote
						});
						if(previousVote != null){
							previousVote.votes -= 1
						}

					}

					myPoll.voters.set(author.id, {vote: vote, username:author.username})

					const selected = myPoll.options.find(function(element) {
			  		return element.index == vote;
					});
					if(selected != null){
						selected.votes += 1
						myPoll.pollMessage.edit({ files:[file], embed: dt.polling(author, myPoll) });

					}
				}
		  }

			if( content.startsWith( prefix + "help" ) ){

				fs.readFile('res/msg/help.txt', "utf-8", function read(err, data) {
				    if (err) { throw err; }
				    const msg = data;
						author.send(msg)

				});
			}

			
	}
});

//message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);

bot_secret_token = "Njg5ODgyODM3MzgxNTQ2MTQz.XoTKZQ.yBXQUtYZhbZYmE6owGYp4G-OsdQ"

client.login(bot_secret_token)
