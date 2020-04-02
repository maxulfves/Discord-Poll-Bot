exports.myDateTime = function () {
 return Date();
};

exports.polling = function(user, myPoll) {

  const exampleEmbed = {
    color: '#ff0000',
    title: "Question: " + myPoll.name,
    //url: 'https://discord.js.org',
    author: {
      name: user.username,
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

    footer: {
      text: 'Some footer text here',
      icon_url: 'https://i.imgur.com/wSTFkRM.png',
    },*/
  };

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
