// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: calendar-alt;

/**
 * What Week Is It?!
 * A JavaScript widget for Scriptable on iOS.
 * Author: hcwf (https://github.com/hcwf)
 * Version: 1.0 21.04.2022
 */

/**
 * All variables to set up the current date.
 */
 let date = new Date();
 let day = date.getDate();
 let month = date.getMonth() + 1;
 let year = date.getYear();

/**
 * All the variables needed for the widget.
 */
const BG_COLOR = new Color("#24def6");
const TITLE_COLOR = new Color("#4cb3c0");
const WEEK_COLOR = new Color("#78efff");
const FONT_TITLE = Font.systemFont(15);
const FONT_WEEK = Font.systemFont(70);

let widget = new ListWidget();

let textStack = widget.addStack();
let titleStack = textStack.addStack();
let weekStack = textStack.addStack();

textStack.spacing = 0;
textStack.layoutVertically();

let wTextTitle = titleStack.addText("Calendar Week");
let wTextWeek = weekStack.addText("" + getWeek(day, month, year));

wTextTitle.textColor = TITLE_COLOR;
wTextTitle.font = FONT_TITLE;

wTextWeek.textColor = WEEK_COLOR;
wTextWeek.font = FONT_WEEK;
wTextWeek.shadowRadius= 1;

/**
 * Gets the current week of the year.
 * @param day
 * @param month
 * @param year
 * @returns The current calendar week, starting Monday.
 */
function getWeek(day, month, year) {
    const NORMAL_YEAR = new Array(0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    const LEAP_YEAR = new Array(0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    
    let yearToUse;
    
    let currentDay = 0;
    let week = 0;
    let firstDay = getFirst();

    if(firstDay > 4) {
        week--;
    }

    if(isLeapYear(year)) {
        yearToUse = LEAP_YEAR;
    } else {
        yearToUse = NORMAL_YEAR;
    }
   
    for(let i = 0; i <= month; i++) {
        currentDay += yearToUse[i];
    }
    currentDay += day;

    week = Math.floor(currentDay / 7);
    return week;
}
 
/**
 * Checks if the current year is a leap year
 * or not and returns it as a boolean.
 * @param year The year to check if it's a leap year for.
 * @returns Boolean if it's a leap year or not.
 */
function isLeapYear(year) {
    if(year % 400 == 0) {
        return true;
    }
   
    if(year % 100 == 0) {
        return false;
    }
   
    if(year % 4 == 0) {
        return true;
    }
   
    return false;
}
 
/**
 * Gets the first day of the year as a
 * weekday.
 * @param year The year to get the first day for.
 * @returns First day of the year. 1 == Monday, 2 == Tuesday, etc..
 */
function getFirst(year) { 
    const FIRST_OF_2020 = 4;
    let first;

    let x = year - 2020;    
    let y = Math.floor(x / 4); //Needed for leap years, as the following year starts 2 days later.
    first = FIRST_OF_2020 + x + y;
   
    if(first > 7) {
        first = first - 7;
    }
   
    return first;
}

Script.setWidget(widget);
Script.complete();

widget.presentSmall();
