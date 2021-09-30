const dateOfBirth = document.querySelector("#dob");
const checkButton = document.querySelector("#btn-check");
const output = document.querySelector("#output");

function reverseStr(str) {
    let reverse = str.split("").reverse().join("");
    return reverse;
}

function isPallindrome(str) {
    let reverse = reverseStr(str);
    return str === reverse;
}

function convertDateToStr(date) {
    let dateStr = {
        day: "",
        month: "",
        year: ""
    };

    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function getAllDateFormats(date) {
    let dateStr = convertDateToStr(date);

    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPallindromeForAllDateFormats(date) {
    let listOfPallindromes = getAllDateFormats(date);

    let flag = false;

    for (let i = 0; i < listOfPallindromes.length; i++) {
        if (isPallindrome(listOfPallindromes[i])) {
            flag = true;
            break;
        }
    }

    return flag;
}

function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //Check for February
    if (month === 2) {

        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++; // Increment Month
            }
        }
    }

    // Check for other months
    else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    //Increment Year
    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextPallindromeDate(date) {
    let counter = 0;
    let nextDate = getNextDate(date);

    //Infinite loop
    while (1) {
        counter++;
        let isPallindrome = checkPallindromeForAllDateFormats(nextDate);
        if (isPallindrome) {
            break;
        }

        nextDate = getNextDate(nextDate);
    }

    return [counter, nextDate];
}


// ================================homework ===================
function getPreviousDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //Check for March
    if (month === 3) {

        if (isLeapYear(year)) {
            if (day === 1) {

            }
        } else {

        }
    }

    // Check for other months
    else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    //Increment Year
    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function getPreviousPallindromeDate(date) {

}
// ==============================================================


function clickHandler() {
    let dobStr = dateOfBirth.value;

    if (dob !== "") {
        let listOfDate = dobStr.split("-");
        let date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };

        let isPallindrome = checkPallindromeForAllDateFormats(date);
        console.log(getNextPallindromeDate(date));

        if (isPallindrome) {
            output.innerText = "Yaay!! Your birthday is a pallindrome 🥳🥳"
        } else {
            let [counter, nextDate] = getNextPallindromeDate(date);
            output.innerText = `The next pallindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days`;
        }

    }
}

let date = {
    day: 28,
    month: 9,
    year: 2021
};

checkButton.addEventListener("click", clickHandler);