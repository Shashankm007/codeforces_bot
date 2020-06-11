var Codeforces = require('codeforces-api');
const fs = require("fs");
const { Client, MessageEmbed } = require("discord.js");
const token = require('../../config.json');
const client = new Client({
    disableEveryone: true
});
client.login(token.token);
client.login(token.token);

CFK = 'e76a901b83f9589d12df677d4d799c8e102bbbe0';
CFS = 'c07fd4f00742e793d982ea1eb1136444b11e8738';

var noOfMissedContests = 5;

//var customfooter = "";
var customfooter = "Bot made By: hashTAG_007#4677";

Codeforces.setApis(CFK, CFS);

module.exports = {
    name: "cfbot",
    category: "",
    description: "PM missed contests",
    run: async (client, message, args) => {
        if (args[0] == "--missed") {
            var filter = "";
            if (args[1] == "-div1") filter = "Div. 1";
            if (args[1] == "-div2") filter = "Div. 2";
            if (args[1] == "-div3") filter = "Div. 3";
            if (args[1] == "-div4") filter = "Div. 4";
            if (filter) {
                var userHandles = args.slice(2);
            }
            else {
                var userHandles = args.slice(1);
            }
            for (h in userHandles) {
                mention = `${message.author}`;
                let mid = mention.replace(/[<@!>]/g, '');
                userHandle = userHandles[h];
                let promises = [];
                let promises2 = [];
                var usercontest = new Set();
                var allcontest = new Set();
                var missedContest = new Array();
                var invalidHandle = 0;
                let _Prommise = new Promise(async (resolve, reject) => {
                    Codeforces.contest.list({ gym: false }, function (err, data) {
                        if (err) {
                            //handle error and return
                        }
                        var arr = Array(data);
                        var contest = arr[0];
                        for (var i = 0; i < contest.length; i++) {
                            if (contest[i].phase == "BEFORE") {
                                continue;
                            }
                            allcontest.add(contest[i]);
                        }
                        Codeforces.user.info({ handles: userHandle }, function (err, userInfo) {
                            if (userInfo) {
                                //userInfo in empty                              
                            }
                            else {
                                client.users.fetch(mid).then(user => {
                                    user.send(`**'${userHandle}'** ` + `is not a valid User Handle.`);
                                });
                                invalidHandle = 1;
                            }
                            resolve(" ");
                        });
                    });
                });
                promises.push(_Prommise);
                let values = await Promise.all(promises);
                if (invalidHandle == 1) {
                    continue;
                }
                let _Prommise2 = new Promise(async (resolve, reject) => {
                    Codeforces.user.rating({ handle: userHandle }, function (err, userData) {
                        if (err) {
                            //console.log(err);
                        }
                        for (var i = 0; i < userData.length; i++) {
                            usercontest.add(userData[i].contestId);
                        }
                        resolve(" ");
                    });
                });
                promises2.push(_Prommise2);
                let values2 = await Promise.all(promises2);
                var allContestArr = Array.from(allcontest);
                allContestArr.sort(compare);
                var i = 0;
                while (i < noOfMissedContests) {
                    for (var j = allContestArr.length - 1; j > -1; j--) {
                        if (usercontest.has(allContestArr[j].id)) {
                            //match found and continue the loop                
                        }
                        else {
                            if (filter) {
                                if (allContestArr[j].name.includes(filter)) {
                                    missedContest.push(allContestArr[j]);
                                    usercontest.add(allContestArr[j].id);
                                    break;
                                }
                            }
                            else {
                                missedContest.push(allContestArr[j]);
                                usercontest.add(allContestArr[j].id);
                                break;
                            }
                        }
                    }
                    i++;
                }
                if (h == 0) {
                    message.channel.send(`[ ${message.author} ] Please check your DM.`);
                }
                //console.log(missedContest);
                var miss = " \n\n";
                var count = 1;
                for (i in missedContest) {
                    miss = miss + `**${count}. ${missedContest[i].name}**` + ` [Click here to practise](https://codeforces.com/contest/${missedContest[i].id})` + "\n\n";
                    count++;
                }
                const misscontest = new MessageEmbed()
                    .setColor('#FFFF00')
                    .setTitle(`Here is a list of last 5 missed contests for: [ ${userHandle} ]`)
                    .setURL(`https://codeforces.com/profile/${userHandle}`)
                    .setDescription(miss)
                    .setTimestamp()
                    .setFooter(customfooter);
                client.users.fetch(mid).then(user => {
                    user.send(misscontest);
                });
            }
        }

        //--team
        else if (args[0] == "--team") {
            mention = `${message.author}`;
            let mid = mention.replace(/[<@!>]/g, '');
            var filter = "";
            if (args[1] == "-div1") filter = "Div. 1";
            if (args[1] == "-div2") filter = "Div. 2";
            if (args[1] == "-div3") filter = "Div. 3";
            if (args[1] == "-div4") filter = "Div. 4";
            if (filter) {
                var userHandles = args.slice(2);
            }
            else {
                var userHandles = args.slice(1);
            }
            if (!checkIfArrayIsUnique(userHandles)) {
                message.channel.send(`[ ${message.author} ] Please enter unique user handles.`);
                return
            }
            var promises = [];
            var allcontest = new Set();
            var allcontestid = new Set();
            var _Prommise = new Promise(async (resolve, reject) => {
                Codeforces.contest.list({ gym: false }, function (err, data) {
                    if (err) {
                        //handle error and return
                    }
                    var arr = Array(data);
                    var contest = arr[0];
                    for (var i = 0; i < contest.length; i++) {
                        if (contest[i].phase == "BEFORE") {
                            continue;
                        }
                        allcontest.add(contest[i]);
                        allcontestid.add(contest[i].id);
                    }
                    resolve(" ");
                });
            });
            promises.push(_Prommise);
            var values = await Promise.all(promises);
            //console.log(userHandles);
            var brk = 0;
            if (userHandles.length == 0 || userHandles.length == 1) {
                message.channel.send(`[ ${message.author} ] Please enter atleast two user handles.`);
                return;
            }
            var allContestArr = Array.from(allcontestid);
            var invalidHandle = 0;
            var c = 0;
            for (h in userHandles) {
                var userHandle = userHandles[h];
                var _Prommise = new Promise(async (resolve, reject) => {
                    Codeforces.user.info({ handles: userHandle }, function (err, userInfo) {
                        if (userInfo) {

                        }
                        else {
                            client.users.fetch(mid).then(user => {
                                if (c == 0) {
                                    message.channel.send(`[ ${message.author} ] Please check your DM.`);
                                    c++;
                                }
                                user.send(`**'${userHandle}'** ` + `is not a valid User Handle.`);
                            });
                            invalidHandle = 1;
                        }
                        resolve(" ");
                    });
                });
                promises.push(_Prommise);
                var values = await Promise.all(promises);
            }
            if (invalidHandle == 1) {
                return;
            }
            for (h in userHandles) {
                if (h == 0) {
                    message.channel.send(`[ ${message.author} ] Please check your DM.`);
                }
                var missedContest = [];
                promises = [];
                var usercontest = new Set();
                var userHandle = userHandles[h];
                var promises2 = [];
                let _Prommise2 = new Promise(async (resolve, reject) => {
                    Codeforces.user.rating({ handle: userHandle }, function (err, userData) {
                        if (err) {
                            //console.log(err);
                        }
                        for (var i = 0; i < userData.length; i++) {
                            usercontest.add(userData[i].contestId);
                        }
                        resolve(" ");
                    });
                });
                promises2.push(_Prommise2);
                let values2 = await Promise.all(promises2);
                //console.log(usercontest);
                for (cont in allContestArr) {
                    if (usercontest.has(allContestArr[cont])) {
                        //has given that contest
                    }
                    else {
                        missedContest.push(allContestArr[cont]);
                        usercontest.add(allContestArr[cont]);
                    }
                }
                allContestArr = missedContest;
            }
            allMissedContest = new Set(allContestArr);
            allContestArr = Array.from(allcontest);
            allContestArr.sort(compare);
            var missedContest = [];
            var i = 0;
            while (i < noOfMissedContests) {
                for (var j = allContestArr.length - 1; j > -1; j--) {
                    if (allMissedContest.has(allContestArr[j].id)) {
                        if (filter) {
                            if (allContestArr[j].name.includes(filter)) {
                                missedContest.push(allContestArr[j]);
                                allMissedContest.delete(allContestArr[j].id);
                                break;
                            }
                        }
                        else {
                            missedContest.push(allContestArr[j]);
                            allMissedContest.delete(allContestArr[j].id);
                            break;
                        }
                    }
                }
                i++;
            }
            //console.log(missedContest);
            var miss = " \n";
            var count = 1;
            for (i in missedContest) {
                miss = miss + `**${count}. ${missedContest[i].name}** ` + " [Click here to practise](https://codeforces.com/contest/" + `${missedContest[i].id})` + "\n\n";
                count++;
            }
            var title = ""
            for (i in userHandles) {
                if (i > 0) {
                    title += `\n`;
                }
                title += `[${userHandles[i]}](https://codeforces.com/profile/${userHandles[i]})`;
            }
            //console.log(title);
            var avatarURL = "https://news.itmo.ru/images/news/big/917925.jpg";
            const misscontest = new MessageEmbed()
                .setColor('#FFFF00')
                .setTitle("Here is a list of last 5 common missed contests")
                .setThumbnail(avatarURL)
                .addField("Coders: \n", title)
                .setDescription(miss)
                .setTimestamp()
                //.addField("hi", "title")
                .setFooter(customfooter);
            client.users.fetch(mid).then(user => {
                user.send(misscontest);
            });
        }

        
        //invalid command
        else {
            message.channel.send(`[ ${message.author} ] Invalid Command.`)
        }
    }
}

function compare(a, b) {
    if (a.startTimeSeconds < b.startTimeSeconds) {
        return -1;
    }
    if (a.startTimeSeconds > b.startTimeSeconds) {
        return 1;
    }
    return 0;
}

function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

function checkIfArrayIsUnique(myArray) {
    return myArray.length === new Set(myArray).size;
}
function getRandomArbitrary(a) {
    return Math.floor(Math.random() * a);
}
