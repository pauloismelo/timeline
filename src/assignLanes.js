/**
 * Takes an array of items and assigns them to lanes based on start/end dates.
 * @returns an array of arrays containing items.
 */


//Here I create the function for help in sorting
const {parseDate} = require("./utils/functions");

//export function for use in the index page
export default function assignLanes(items) {
    const sorted = [...items].sort((a, b) => parseDate(a.start) - parseDate(b.start));
    const lanes = [];
  
    return sorted.map((item) => {
      for (let i = 0; ; i++) {
        if (!lanes[i]) {
          lanes[i] = [item];
          return { ...item, lane: i };
        }
        const last = lanes[i][lanes[i].length - 1];
        if (parseDate(last.end) < parseDate(item.start)) {
          lanes[i].push(item);
          return { ...item, lane: i };
        }
      }
    });
  }