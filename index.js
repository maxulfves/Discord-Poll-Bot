const Discord = require('discord.js');

var dt = require('./res/msg/poll.js');
const file = new Discord.MessageAttachment('res/img/icon.png');
const client = new Discord.Client();
const userManager = new Discord.UserManager();
var fs = require('fs')

client.once('ready', () => {
	console.log('Ready!');

	var interval = setInterval(
		async function(){
			let time = Date.now();
			for (let [key, value] of polls) {
				//console.log(time - value.endTime())

				value.pollMessage.edit({ files:[file], embed: dt.polling(value) });
				if(time > value.endTime()){
					console.log("Deleted " + value.name + " due to timeout. ")
					polls.delete(key)
				}
			}
		}, 5 * 1000);


});

const prefix = "/"
const polls = new Map();


function Poll( maker) {
	this.channelId -1
	this.createdAt = Date.now();
	this.timeAvailable = 24 * 60 * 60 * 1000;
	this.endTime = function(){return this.createdAt + this.timeAvailable}
	this.author = maker
	this.name = ""
	this.options = [
		{name: "AAA", votes: 0, index: 0},
		{name: "BBB", votes: 0, index: 1}
	]

	this.voters = new Map();

}

var dispatcher = null;
//When bot recieves a message from any channel:
client.on('message', async message => {

	let content = message.content
	let channel = message.channel
	let server = message.guild
	let author = message.author

	//var connection;
	if (message.member.voice.channel) {

	}


	if(content.startsWith("~") ){
		message.delete()
		channel.send(content.substring(1))
	}

	if(!author.isBot && content.startsWith(prefix)){
			message.delete() //Delete nessage.
			console.log("COMMAND: " + message.content)

			if( content.startsWith( prefix + "voters" ) ){
				let votersString = "**List of voters:** \n"
				let myPoll = polls.get(channel.id)

				for (let [key, voter] of myPoll.voters) {
					votersString += voter.username + "\t" + voter.vote + " - " + voter.value + "\n"
				}

				author.send(votersString)
			}

			if(content.startsWith( prefix + "poll ")) {
				let args = content.substring((prefix + "poll ").length)
				let arr = args.split(",")

				if(arr.size <= 2 || content.length > 255){
					author.send("Invalid input.")
					return 0;
				}

				let myPoll = new Poll(author);
				polls.set(channel.id, myPoll);

				//Clear potential previous poll.
				myPoll.name = arr[0]
				myPoll.size = []
				myPoll.voters = new Map()
				myPoll.options = []

				myPoll.channelId = channel.id

				const voters = [{id:0, name: "0", vote: 1}]

				//Add options to myPoll
				for(var i = 1; i < arr.length; i++){
					myPoll.options.push( { name: arr[i], votes: 0, index:i-1, voters: voters} )
					myPoll.size.push(i-1)
				}

				console.log("msg made")
				channel.send({ files:[file], embed: dt.polling(myPoll) })
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

				let myPoll = polls.get(channel.id)

				if( !myPoll.size.includes(vote) ){
					console.log("illegal vote: " + vote)
					return 0;
				}else{
					console.log("legal vote: " + vote)
				}


				if(!isNaN(vote) && myPoll != null){
					if(myPoll.voters.get(author.id) != null ){
						let previousVote = myPoll.options.find(function(element) {
							return element.index == myPoll.voters.get(author.id).vote
						});
						if(previousVote != null){
							previousVote.votes -= 1
						}
					}

					const selected = myPoll.options.find(function(element) {
			  		return element.index == vote;
					});

					myPoll.voters.set(author.id, {vote: vote, username:author.username, value:selected.name})

					if(selected != null){
						selected.votes += 1
						myPoll.pollMessage.edit({ files:[file], embed: dt.polling(myPoll) });

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

bot_secret_token = "SECRET TOKEN"
client.login(bot_secret_token)
