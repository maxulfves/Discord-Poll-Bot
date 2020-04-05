<h1>Poll bot</h1>
<h2>Intro</h2>
During the covid-19 outbreak in 2020 I had a discord-conversation with other CS students and were a bit frustrated that I couldn't find a pollbot that didn't depend on reactions to count votes. This is an attempt to do just that, vote by typing /vote [INDEX] into the chat instead, and have the bot count the options. The bot (though working) isn’t perfect in its current state and should be regarded as a proof of concept.
<h2>List of features:</h2>
In its current form it has the following features:
-	The user can vote for no more than one option
-	The user can change his vote.
-	The poll creator can make any amount of options
-	The poll displays the options by editing the original poll-message.
-	The users can see what other users voted by typing <i>/voters</i>, which sends the user a DM with all voters and their selected option.
-	The poll is currently available for 24 hours by default.
-	/Commands are removed immediately after being posted to keep the chat clean.
<h2>Expansion possibilities:</h2>
Most of the features could be changed fairly easily to make other options possible. One could among other things:
-	Let the user come up with other options
-	Allow users to vote for multiple options
-	Allow creator to select end date
-	Make voting anonymous (by disabling /voters and performing the voting by DM, or DM:ing a secret token to every user in the chat that should be added to the index of the desired option.

<h2>To make improvements to the bot: </h2>
Read on discordjs.guide how to setup your own bot. Copy that bot’s token and insert it into the end of the index.js file in the project folder.
