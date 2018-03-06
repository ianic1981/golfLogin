"use strict";
const Nightmare = require("nightmare");
const moment = require("moment");
const nightmare = new Nightmare({ show: false });
var argv = require('minimist')(process.argv.slice(2));
console.log(argv);
var user = argv.user;
var pwd = process.env.pwd || argv.pwd;
console.log(pwd);
let myMoment = moment();
myMoment.add(21, 'days');
console.log(myMoment.date());
console.log(myMoment.format("MMM"));
const dayOption = myMoment.date();
const monthOption = myMoment.format("MMM");
nightmare
    .goto('https://www.brsgolf.com/wychwoodpark/member/login')
    .type('[name="_username"]', user)
    .type('[name="_password"]', pwd)
    .click('input[name="SUBMIT"]')
    .wait('.book_a_tee_time_button')
    .click('.book_a_tee_time_button')
    .evaluate(selectMonth, monthOption)
    .evaluate(selectDay, dayOption)
    .wait(".table_white_text")
    .evaluate(() => { return document.querySelector(".day_page_date").innerText; })
    .then(console.log)
    .then(() => {
    return nightmare.evaluate(() => {
        var error = "";
        let inputs = document.querySelector(".table_white_text tbody").querySelectorAll("tr");
        for (var i = 0, length = inputs.length; i < length; i++) {
            var data = inputs[i].innerText.replace('18s', '').replace('18S', '').replace("Reserved For Members", "").trim();
            if (data.indexOf('08:') >= 0) {
                if (data.length == 5) {
                    var val = inputs[i].querySelectorAll("input[name=\"SubmitButton\"]");
                    val[0].click();
                    return data;
                }
                else {
                    error += " " + data;
                }
            }
        }
        throw new Error("no time: " + error);
    }).then(console.log);
})
    .then(() => {
    return nightmare
        .wait('.back_button_cell a')
        .wait(1000)
        .select("[name='Player1_uid']", "448")
        .select("[name='Player2_uid']", "Member")
        .select("[name='Player3_uid']", "Member")
        .select("[name='Player4_uid']", "Member")
        .wait(3000)
        .click('[name=\'SubmitButton\']')
        .wait(1000)
        .end(() => "finished");
})
    .then(console.log)
    .catch((error) => {
    console.error('Search failed:', error);
});
console.log("start");
function selectMonth(month) {
    console.log(month);
    // var test = document.querySelector(".month_navigation .t_b");
    // var test2 = test.getElementsByTagName("a");
    // test2.item(month).click()
    let length = 0;
    while (length < document.querySelectorAll(".month_navigation .date_large").length) {
        if (document.querySelectorAll(".month_navigation .date_large").item(length).innerText.indexOf(month) > -1) {
            document.querySelectorAll(".month_navigation .date_large").item(length).click();
            length = 13;
        }
        length++;
    }
}
function selectDay(dayOption) {
    console.log(dayOption);
    let length = 1;
    while (length < document.querySelector(".tableList tbody").getElementsByTagName("tr").length) {
        if (document.querySelector(".tableList tbody").getElementsByTagName("tr").item(length).innerText.indexOf(dayOption) > -1) {
            let day = document.querySelector(".tableList tbody").getElementsByTagName("tr")[length];
            day.getElementsByClassName("day_num").item(0).getElementsByTagName("a").item(0).click();
            length = 999;
        }
        length++;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVDQUF1QztBQUN2QyxpQ0FBaUM7QUFFakMsTUFBTSxTQUFTLEdBQUcsSUFBSSxTQUFTLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztBQUUvQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBR2pCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDckIsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUV0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBRWhCLElBQUksUUFBUSxHQUFrQixNQUFNLEVBQUUsQ0FBQztBQUd2QyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUV4QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBRW5DLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNsQyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRTNDLFNBQVM7S0FDSixJQUFJLENBQUMsbURBQW1ELENBQUM7S0FDekQsSUFBSSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQztLQUNoQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsR0FB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