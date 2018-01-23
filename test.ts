import * as Nightmare from "nightmare";
import * as moment from 'moment';
const nightmare = new Nightmare({ show: true });

var argv = require('minimist')(process.argv.slice(2));
console.log(argv)

var user = argv.user;
var pwd = argv.pwd;

let myMoment: moment.Moment = moment();


myMoment.add(21, 'days')

console.log(myMoment.date())
console.log(myMoment.month())

const dayOption = myMoment.date();
const monthOption = myMoment.month();


//--usr 59629 --pwd h3lpm3

nightmare
    .goto('https://www.brsgolf.com/wychwoodpark/member/login')
    .type('[name="_username"]', user)
    .type('[name="_password"]', pwd)
    .click('input[name="SUBMIT"]')
    .wait('.book_a_tee_time_button')
    .click('.book_a_tee_time_button')
    .evaluate(selectMonth,monthOption)
    .evaluate(selectDay,dayOption)
    .wait(".table_white_text")
    .evaluate(()=>{

        let inputs = document.querySelector(".table_white_text tbody").querySelectorAll("tr");
        for (var i = 0, length = inputs.length; i < length; i++) {
            if (inputs[i].innerText.indexOf('16:') >= 0 && inputs[i].innerText.trim().length ==5) {
                 var val = inputs[i].querySelectorAll("input[name=\"SubmitButton\"]");

                 val[0].click();
                return inputs[i].innerText;
            }
        }
    })
        .wait('.back_button_cell a')
        .wait(1000)
        .select("[name='Player1_uid']","448")
        .select("[name='Player2_uid']","449")
        .select("[name='Player3_uid']","Member")
        .select("[name='Player4_uid']","Member")
        .wait(9000)
        .click('[name=\'SubmitButton\']')
        //.click('.back_button_cell a')
    .end()
    .then(console.log)
    .catch((error) => {
        console.error('Search failed:', error);
    });

function selectMonth(month) {

    console.log(month);
    var test = document.querySelector(".month_navigation .t_b");
    var test2 = test.getElementsByTagName("a");
    test2.item(month).click()
}

function selectDay(dayOption){

    console.log(dayOption);
    let day  = document.querySelector(".tableList tbody").getElementsByTagName("tr")[dayOption];
    day.getElementsByClassName("day_num").item(0).getElementsByTagName("a").item(0).click();
}