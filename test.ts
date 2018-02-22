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
console.log(myMoment.format("MMM"))

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
    .evaluate(() => {return document.querySelector(".day_page_date").innerText;})
    //.wait(10000)
    .then(console.log)
    .then(() => {
        return nightmare.evaluate(() => {

            var error = "";
            let inputs = document.querySelector(".table_white_text tbody").querySelectorAll("tr");
            for (var i = 0, length = inputs.length; i < length; i++) {

                var data = inputs[i].innerText.replace('18s','').replace("Reserved For Members","").trim();
                if (data.indexOf('08:') >= 0) {
                    if (data.length == 5) {
                        var val = inputs[i].querySelectorAll("input[name=\"SubmitButton\"]");

                        val[0].click();
                        return data;
                    }else{
                        error += " "+data;
                    }
                }
            }
            throw new Error( "no time: "+error);
        }).then(console.log)
    })
    .then(() => {

            return nightmare
                .wait('.back_button_cell a')
                .wait(1000)
                .select("[name='Player1_uid']", "449")
                .select("[name='Player2_uid']", "Member")
                .select("[name='Player3_uid']", "Member")
                .select("[name='Player4_uid']", "Member")
                .wait(3000)
                .click('[name=\'SubmitButton\']')
                .wait(1000)
                //.click('.back_button_cell a')
                .end(() => "finished")
        }

    )
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


    while (length < document.querySelectorAll(".month_navigation .date_large").length){
        if (document.querySelectorAll(".month_navigation .date_large").item(length).innerText.indexOf(month) >-1){
            document.querySelectorAll(".month_navigation .date_large").item(length).click();
            length =13;
        }
        length++;
    }
}

function selectDay(dayOption) {

    console.log(dayOption);

    let length =  1;

    while(length <  document.querySelector(".tableList tbody").getElementsByTagName("tr").length){
        if(document.querySelector(".tableList tbody").getElementsByTagName("tr").item(length).innerText.indexOf(dayOption) > -1){
            let day = document.querySelector(".tableList tbody").getElementsByTagName("tr")[length];
            day.getElementsByClassName("day_num").item(0).getElementsByTagName("a").item(0).click();
            length = 999;
        }
        length++;
    }


}