// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: calendar-alt;

/**
 * What Week Is It?!
 * A JavaScript widget for Scriptable on iOS.
 * Author: hcwf (https://github.com/hcwf)
 * Version: 1.1.2 22.04.2022
 */

/**
 * All variables to set up the current date.
 */
let date = new Date();

/**
 * All the variables needed for the widget.
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
const BORDER_WIDTH = 0;

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
let wTextWeek = numberStack.addText("" + getWeek(date));

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
 * Gets the current week of the year.
 * @param date The date object to work with.
 * @returns The current calendar week, starting Monday.
 */
function getWeek(date) {
    let firstOfYear;
    let week;

    //Algorithm by RobG https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php/6117889#6117889
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    firstOfYear = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    week = Math.ceil((((date - firstOfYear) / 86400000) + 1) / 7);

    return week;
}

Script.setWidget(widget);
Script.complete();

widget.presentSmall();