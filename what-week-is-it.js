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

/**
 * All the variables needed for the widget.
 */
const BG_COLOR = new Color("#3db5dd");
const BG_GRADIENT = new LinearGradient();
const GRADIENT_X = new Point(0, 1);
const GRADIENT_Y = new Point(0, 1);
const TITLE_COLOR = new Color("#4cb3c0");
const WEEK_COLOR = new Color("#78efff");
const FONT_TITLE = Font.systemFont(15);
const FONT_WEEK = Font.systemFont(75);

let widget = new ListWidget();

let textStack = widget.addStack();
let titleStack = textStack.addStack();
let weekStack = textStack.addStack();

textStack.spacing = 0;
textStack.layoutVertically();

let wTextTitle = titleStack.addText("Calendar Week");
let wTextWeek = weekStack.addText("" + getWeek(date));

BG_GRADIENT.colors = ["#0a2837", "#3e8fb8"];
BG_GRADIENT.locations = [0, 1];
BG_GRADIENT.startPoint = GRADIENT_X;
BG_GRADIENT.endPoint = GRADIENT_Y;

wTextTitle.textColor = TITLE_COLOR;
wTextTitle.font = FONT_TITLE;

wTextWeek.textColor = WEEK_COLOR;
wTextWeek.font = FONT_WEEK;
wTextWeek.shadowRadius= 4;

/**
 * Gets the current week of the year.
 * @param date
 * @returns The current calendar week, starting Monday.
 */
function getWeek(date) {
    let firstOfYear;
    let week;

    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    firstOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    week = Math.ceil((((date - firstOfYear) / 86400000) + 1) / 7);

    return week;
}

Script.setWidget(widget);
Script.complete();

widget.presentSmall();
