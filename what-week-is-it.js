// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: calendar-alt;

/**
 * What Week Is It?!
 * A JavaScript widget for Scriptable on iOS.
 * Author: hcwf (https://github.com/hcwf)
 * Version: 1.2.3 26.04.2022
 * 
 * NOTES:
 * # I use "(current)" a lot in this script because it is mainly used
 * to get the week of the current date. If you so please you can modify
 * the script to calculate the week for any date. Just pass the appropriate
 * parameters to the getWeek()-function.
 */

/**
 * All variables to set up the (current) date.
 */
let date = new Date();
let dayofMonth = date.getDate();
let month = date.getMonth();
let year = date.getYear();
let dayOfWeek = date.getDay() + 1;

/**
 * All the variables needed for the widget display.
 */
const BG_GRADIENT = new LinearGradient();
const GRADIENT_COLORS = [new Color("#7075ed"), new Color("#b4a1b")];
const GRADIENT_X = new Point(0, 2);
const GRADIENT_Y = new Point(0, 0);
const TITLE_COLOR = new Color("#ade5df");
const WEEK_COLOR = new Color("#ade5df");
const FONT_TITLE = Font.systemFont(15);
const FONT_WEEK = Font.boldSystemFont(80);
const STACK_SIZE = new Size(150, 150);
const TITLE_SIZE = new Size(120, 40);
const WEEK_SIZE = new Size(120, 78);
const SPACER_SIZE = new Size(10, 78);
const NUMBER_SIZE = new Size(110, 78);
const BORDER_WIDTH = 0; //Only used for visually checking the stack layout when designing.

let widget = new ListWidget();

let textStack = widget.addStack();
let titleStack = textStack.addStack();
let weekStack = textStack.addStack();
let spacerStack = weekStack.addStack();
let numberStack = weekStack.addStack();

textStack.size = STACK_SIZE;
textStack.borderWidth = BORDER_WIDTH;
textStack.setPadding(0, 0, 0, 0);
textStack.spacing = 0;
textStack.layoutVertically();

titleStack.size = TITLE_SIZE;
titleStack.borderWidth = BORDER_WIDTH;
titleStack.bottomAlignContent();

weekStack.size = WEEK_SIZE;
weekStack.borderWidth = BORDER_WIDTH;
weekStack.topAlignContent();

spacerStack.size = SPACER_SIZE;
spacerStack.borderWidth = BORDER_WIDTH;

numberStack.size = NUMBER_SIZE;
numberStack.borderWidth = BORDER_WIDTH;
numberStack.layoutVertically();
numberStack.topAlignContent();
numberStack.setPadding(0, 7, 5, 7);

let wTextTitle = titleStack.addText("Calendar Week");
let wTextWeek = numberStack.addText("" + getWeek(dayOfMonth, month, year, dayOfWeek));

BG_GRADIENT.colors = GRADIENT_COLORS;
BG_GRADIENT.locations = [0, 1];
BG_GRADIENT.startPoint = GRADIENT_X;
BG_GRADIENT.endPoint = GRADIENT_Y;

widget.backgroundGradient = BG_GRADIENT;

wTextTitle.textColor = TITLE_COLOR;
wTextTitle.font = FONT_TITLE;
wTextTitle.shadowRadius = 1;
wTextTitle.shadowOffset = new Point(0, 1);

wTextWeek.textColor = WEEK_COLOR;
wTextWeek.font = FONT_WEEK;
wTextWeek.shadowRadius = 4;
wTextWeek.shadowOffset = new Point(0, 3);

let titleSpacer = titleStack.addSpacer(10);

/**
 * Calculates the (current) week of the year using the algorithm 
 * from Wikipedia. (https://en.wikipedia.org/wiki/ISO_week_date#Calculating_the_week_number_from_an_ordinal_date)
 * @param day The day of the month. 1-31
 * @param month The month of the year. 1-12
 * @param year The (current) year.
 * @param dayOfWeek The (current) day of the week. Monday = 1, Tuesday = 2, etc.
 * @returns The (current) calendar week, starting Monday.
 */
 function getWeek(dayOfMonth, month, year, dayOfWeek) {
    /**
     * Both constants start with 0 because the integers representing the 
     * months are later added to the dayOfYear variable. To not 
     * f up the number when in January you have to start with 0, otherwise 
     * you'd end up with 31 + dayOfMonth.
     * 
     * And yes, I could have left the integer for the days of December out
     * of the array. I just like it that way. :-) It's more "complete".
     */
    const NORMAL_YEAR = new Array(0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    const LEAP_YEAR = new Array(0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

    let yearToUse;

    let dayOfYear = 0;
    let week = 0;

    let leapYear = isLeapYear(year);

    if(leapYear) {
        yearToUse = LEAP_YEAR;
    } else {
        yearToUse = NORMAL_YEAR;
    }

    for(let i = 0; i <= month; i++) {
        dayOfYear += yearToUse[i];
    }
    dayOfYear += dayOfMonth;

    week = Math.floor(((dayOfYear - dayOfWeek) + 10) / 7);

    if(week == 0) {
        if(leapYear){
            week = 53;
        } else {
            week = 52;
        }
        return week;
    }

    if(week == 53) {
        if(leapYear) {
            
        } else {
            week = 1;
        }
        return week;
    }

    return week;
}

/**
 * Checks if the current year is a leap year
 * or not and returns it as a boolean.
 * @param year The year to check.
 * @returns Boolean is true if it's a leap year, false if not.
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

Script.setWidget(widget);
Script.complete();

widget.presentSmall();
