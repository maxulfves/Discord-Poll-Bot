exports.myDateTime = function () {
 return Date();
};

exports.polling = function(myPoll) {

  const exampleEmbed = {
    color: '#ff0000',
    title: "Question: " + myPoll.name,
    //url: 'https://discord.js.org',
    author: {
      name: myPoll.author.username,
      icon_url: 'attachment://icon.png',
      //url: 'https://discord.js.org',
    },
    //description: 'Some description here',
    thumbnail: {
      //url: 'https://i.imgur.com/wSTFkRM.png',
    },

    fields: [
      {
        name: "____________",
        value: "Vote by typing: "
         + "```/vote NUMBER```"
         + "For additional commands, type"
         + "```/help```",
        inline: false
      },
    ],

    /*
    image: {
      url: 'https://i.imgur.com/wSTFkRM.png',
    },

    timestamp: new Date(),
    */
    footer: {
      text: 'Voters: ' + names() + "\n"
            + "Time remaining: " + timeRemaining(myPoll.endTime() - Date.now())
    },/*
    footer: {
      text: "Time remaining: " + Math.round((myPoll.endTime() - Date.now())/1000) + " s"
    }*/
  };

  function timeRemaining(time){
    if(time < 0){
      time = 0
    }

    let s = time/1000
    if(s < 120){
      return Math.round(s) + " seconds"
    }else if(s < 3600){
      return Math.round(s/60) + " minutes"
    }else if(s < 3600 * 24){
      return Math.floor(s/3600) + " hours and " + Math.floor(s%3600/60) + " minutes"
    }else{
      return Math.floor(s/(3600*24)) + " days and " + Math.floor(s%(3600*24)/3600) + " hours"
    }

  }

  function names(){
    let lis = ""
    for(let [key, value] of myPoll.voters){
      lis += value.username + ", "
    }
    return lis
  }


  myPoll.options.forEach((item, i) => {
    const element = {
      name: `[${item.index}]\t${item.name}`,
      value: "Votes: " + item.votes,
      inline: false
    }

    exampleEmbed.fields.unshift(element)
  });


  return exampleEmbed
}
