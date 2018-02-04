import * as Nightmare from "nightmare";
import * as moment from 'moment';

const nightmare = new Nightmare({show: false});

var argv = require('minimist')(process.argv.slice(2));
console.log(argv)


var user = argv.user;
var pwd = process.env.pwd2 || argv.pwd;

console.log(pwd)

let myMoment: moment.Moment = moment();


myMoment.add(21, 'days')

console.log(myMoment.date())
console.log(myMoment.month())

const dayOption = myMoment.date();
const monthOption = myMoment.month();

let attempts = 0;
let currentUser = "449";

nightmare
    .goto('https://www.brsgolf.com/wychwoodpark/member/login')
    .type('[name="_username"]', user)
    .type('[name="_password"]', pwd)
    .click('input[name="SUBMIT"]')
    .wait('.book_a_tee_time_button')
    .click('.book_a_tee_time_button')
    .evaluate(selectMonth, monthOption)
    .evaluate(selectDay, dayOption)
    .evaluate(checkTimeVisibleThenProceed(attempts))
    .end(() => "finished")
    .then(console.log)
    .catch((error) => {
        console.error('Search failed:', error);
    });

console.log("start");

function selectMonth(month): void {

    console.log(month);
    var test = document.querySelector(".month_navigation .t_b");
    var test2 = test.getElementsByTagName("a");
    test2.item(month).click()
}

function selectDay(dayOption): void {

    console.log(dayOption);
    let day = document.querySelector(".tableList tbody").getElementsByTagName("tr")[dayOption];
    day.getElementsByClassName("day_num").item(0).getElementsByTagName("a").item(0).click();
}

function bookTime(currentUser): Promise<void> {
    return nightmare
        .wait('.back_button_cell a')
        .wait(1000)
        .select("[name='Player1_uid']", currentUser)
        .select("[name='Player2_uid']", "Member")
        .select("[name='Player3_uid']", "Member")
        .select("[name='Player4_uid']", "Member")
        .wait(3000)
        .click('[name=\'SubmitButton\']')
        .wait(1000)
        .then(console.log)
    //.click('.back_button_cell a')

}

function findTime(time) {
    var error = "";
    let inputs = document.querySelector(".table_white_text tbody").querySelectorAll("tr");
    for (var i = 0, length = inputs.length; i < length; i++) {

        var data = inputs[i].innerText.trim();
        if (data.indexOf(time) >= 0) {
            if (data.length == 5) {
                var val = inputs[i].querySelectorAll("input[name=\"SubmitButton\"]");

                (val[0]).click();
                return data;
            } else {
                error += " " + error;
            }
        }
    }
    new Error("no time: " + error);
}


function checkTimeVisibleThenProceed(attempts: number): Promise<void> {

    if (attempts == 5) {
        throw new Error("tried 5 times....")
    }

    return nightmare.wait(".table_white_text").evaluate(() => {
        if (document.querySelectorAll("input[name=\"SubmitButton\"]").length > 0) {
            return proceed();
        }
        else {
            nightmare.click("refresh");
            attempts++;
            return checkTimeVisibleThenProceed(attempts)
        }
    }).then(console.log)
}

function proceed(): Promise<void> {
    return nightmare.evaluate(() => {
        return findTime('08:')
    }).then(console.log)
        .then(() => {
                return bookTime(currentUser)
            }
        )
}