// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: calendar-alt;

/*
    What Week Is It?!
    A JavaScript widget for Scriptable on iOS.
    Author: hcwf (https://github.com/hcwf)
    Version: 2.0.0 2023-01-08
*/

let currDate = new Date();

// Background gradient
const BG_GRADIENT = new LinearGradient();
const BG_GRADIENT_COLORS = [new Color("#7075ed"), new Color("#b4a1b")];
const BG_GRADIENT_X = new Point(0, 2);
const BG_GRADIENT_Y = new Point(0, 0);

BG_GRADIENT.colors = BG_GRADIENT_COLORS;
BG_GRADIENT.locations = [0, 1];
BG_GRADIENT.startPoint = BG_GRADIENT_X;
BG_GRADIENT.endPoint = BG_GRADIENT_Y;

// Title gradient
const TITLE_GRADIENT = new LinearGradient();
const TITLE_GRADIENT_COLORS = [new Color("#660000"), new Color("#cc0000")];
const TITLE_GRADIENT_X = new Point(0, 1);
const TITLE_GRADIENT_Y = new Point(0, 0);

TITLE_GRADIENT.colors = TITLE_GRADIENT_COLORS;
TITLE_GRADIENT.locations = [0, 1];
TITLE_GRADIENT.startPoint = TITLE_GRADIENT_X;
TITLE_GRADIENT.endPoint = TITLE_GRADIENT_Y;

// Week gradient
const CAL_GRADIENT = new LinearGradient();
const CAL_GRADIENT_COLORS = [new Color("#ffffff"), new Color("#bcbcbc")];
const CAL_GRADIENT_X = new Point(0, 0.5);
const CAL_GRADIENT_Y = new Point(0, 0);

CAL_GRADIENT.colors = CAL_GRADIENT_COLORS;
CAL_GRADIENT.locations = [0, 1];
CAL_GRADIENT.startPoint = CAL_GRADIENT_X;
CAL_GRADIENT.endPoint = CAL_GRADIENT_Y;

// Font settings
const TITLE_COLOR = new Color("#ffffff");
const WEEK_COLOR = new Color("#000000");
const FONT_TITLE = Font.systemFont(15);
const FONT_WEEK = Font.boldSystemFont(70);

// Stack sizes
const MAIN_SIZE = new Size(150, 150);
const CONTENT_SIZE = new Size(120, 120);
const TITLE_SIZE = new Size(120, 30);
const WEEK_SIZE = new Size(120, 90);
const BORDER_WIDTH = 0; // Only used for visually checking the stack layout when designing.

// Create the widget
let widget = new ListWidget();
widget.backgroundGradient = BG_GRADIENT;

let mainStack = widget.addStack();
let contentStack = mainStack.addStack();
let titleStack = contentStack.addStack();
let weekStack = contentStack.addStack();

// Stack layout
mainStack.size = MAIN_SIZE;
mainStack.borderWidth = BORDER_WIDTH;
mainStack.borderColor = new Color('#ffd966');
mainStack.centerAlignContent();

contentStack.size = CONTENT_SIZE;
contentStack.borderWidth = BORDER_WIDTH;
contentStack.borderColor = new Color('#ffd966');
contentStack.cornerRadius = 10;
contentStack.layoutVertically();
contentStack.topAlignContent();

titleStack.size = TITLE_SIZE;
titleStack.backgroundGradient = TITLE_GRADIENT;
titleStack.borderWidth = BORDER_WIDTH;
titleStack.borderColor = new Color('#ffd966');
titleStack.centerAlignContent();

weekStack.size = WEEK_SIZE;
weekStack.backgroundGradient = CAL_GRADIENT;
weekStack.borderWidth = BORDER_WIDTH;
weekStack.borderColor = new Color('#ffd966');
weekStack.centerAlignContent();

// Add text to stacks
let wTextTitle = titleStack.addText("Calendar Week");
let wTextWeek = weekStack.addText("" + getWeek(currDate));

// Applying font settings
wTextTitle.textColor = TITLE_COLOR;
wTextTitle.font = FONT_TITLE;
wTextTitle.shadowRadius = 1;
wTextTitle.shadowOffset = new Point(0, 1);

wTextWeek.textColor = WEEK_COLOR;
wTextWeek.font = FONT_WEEK;

// Add the widget to the script
Script.setWidget(widget);
Script.complete();

// widget.presentSmall(); // uncomment for in-app testing

/**
 * Checks if the current year is a leap year
 * or not and returns it as a boolean.
 * @param {number} year the year to check
 * @returns true if it's a leap year, false if not
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
 * Calculates the current day of the year.
 * Code from Renat Galyamov, https://renatello.com/javascript-day-of-year/
 * @param {Date} date the current date
 * @returns day of year
 */
function getDayOfYear(date) {
    return Math.floor(date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24;
}


/**
 * Calculates the current week of the year using the algorithm 
 * from Wikipedia. (https://en.wikipedia.org/wiki/ISO_week_date#Calculating_the_week_number_from_an_ordinal_date)
 * @param {Date} date the current date
 * @returns the current calendar week, starting Monday
 */
function getWeek(date) {
    let leapYear = isLeapYear(date.getFullYear());
    let dayOfYear = getDayOfYear(date);

    let day = date.getDay() - 1; // getDay() starts with Sunday at 0, we want Sunday to be 7 and Monday to be 1

    if (day == -1) {
        day = 7;
    }

    let week = Math.floor(((dayOfYear - day) + 10) / 7);

    if(week == 0) {
        if(leapYear){
            week = 53;
        } else {
            week = 52;
        }
        return week;
    }

    if(week == 53) {
        if(!leapYear) {
           week = 1;
        }
        return week;
    }

    return week;
}