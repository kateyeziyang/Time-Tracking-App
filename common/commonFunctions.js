import AsyncStorage from '@react-native-community/async-storage';
import { Alert, Text, View } from 'react-native';
import * as React from 'react';

const colors = ['#363062','#4d4c7d','#827397','#d8b9c3'];

/** Check if given password is correct.
 * @param curPwd given password
 * @param setPassed callback function
 * @param onChangeText callback function
 * @param alertWrong callback function
 * @return false if curPwd is wrong, 1 otherwise
*/
export async function checkPwd(curPwd, setPassed, onChangeText, alertWrong) {
  try {
    const temp = await AsyncStorage.getItem("pwd");

    if (temp) {
      const savedPwd = uncompileStr(temp);

      if (curPwd === savedPwd) {
        setPassed(true);
        return true;
      } else {
        onChangeText("");
        alertWrong();
        return false;
      }

    } else { // this conditon shouldn't happen
      onChangeText("");
      alertWrong();
      return false;
    }
  } catch (e) {
    console.error(e);
  }
}

/** Check if there is a password (so to use verify screen).
 * @param setLock callback function
 * @return -1 if there isn't a password, 1 if there is one
*/
export async function checkLock(setLock) {
  try {
    const temp = await AsyncStorage.getItem("pwd");

    if (temp) {
      const savedPwd = uncompileStr(temp);

      // 1. saved password is ""
      if (savedPwd === "") {
        setLock(-1);
        return -1;
      }
      // 2. saved password is not empty
      else {
        setLock(1);
        return 1;
      }
    } else {
      setLock(-1);
      return -1;
    }
  } catch (e) {
    console.error(e);
  }
}

/** Help function to call functions based on condition.
 * @param newPwd given string
 * @param alert1 function to be called when newPwd = ""
 * @param alert2 function to be called when newPwd != ""
*/
async function setAndAlert(newPwd, alert1, alert2) {
  await AsyncStorage.setItem("pwd", compileStr(newPwd));
  if (newPwd === "") {
    alert1();
  } else {
    alert2();
  }
}

/** Set new password for the app.
 * @param curPwd given password
 * @param newPwd if curPwd is correct, set password to this newPwd
 * @param alert1 callback function
 * @param alert2 callback function
 * @param alert3 callback function
 * @return true if newPwd is successfully set up.
*/
export async function setNewPwd(curPwd, newPwd, alert1, alert2, alert3) {
  if (newPwd !== "" && newPwd.length !== 4) { Alert.alert("Sorry", "Password need to have a length of 4."); return false; }
  try {
    const temp = await AsyncStorage.getItem("pwd");

    if (temp) {
      const savedPwd = uncompileStr(temp);

      // 1. saved password is ""
      if (savedPwd === "") {
        setAndAlert(newPwd);
        return true;
      }
      // 2. saved password is not empty
      else {
        if (curPwd === savedPwd) {
          setAndAlert(newPwd, alert1, alert2);
          return true;
        } else {
          alert3();
          return false;
        }
      }
    } else {
      setAndAlert(newPwd, alert1, alert2);
      return true;
    }
  } catch (e) {
    console.error(e);
  }
}

/** Submit record in string format and log in console accordingly.
*/
export async function submitRecord(start, end, tag) {

  const myKey = start.toLocaleDateString();
  const myValue = {'start':start, 'end':end, 'tag':tag};

  try {
    const record = await getRecordByDate(myKey);
    if(record !== null) { // append to records in the same day
      record[record.length] = myValue;
      const newRecordWrapper = JSON.stringify(record);
      await AsyncStorage.setItem(myKey, compileStr(newRecordWrapper));
      console.log("Append data successfully.");
    } else { // create new array for the day
      const newRecordWrapper = JSON.stringify([myValue]);
      await AsyncStorage.setItem(myKey, compileStr(newRecordWrapper));
      console.log("Create data successfully.");
    }
    Alert.alert("Finished!", "Submit successfully.");
  } catch (e) {
    // saving error
    console.error(e);
  }
}

export async function submitPeriod(value, value2, callBack) {
  let dateData = {};
  try {
    let tempStart = new Date(value);
    let tempEnd = new Date(value2);
    let dateKeys = dateKeysBetween(tempStart, tempEnd);
    dateData = await getDatesData(dateKeys);
  } catch (e) {
    console.error(e);
  }
  callBack(dateData);
  return(dateData);
}

/** Get a list of records in date.
 * @param date 'MM/DD/YY' format string.
 * @return a string of list of records in date.
*/
export async function getRecordByDate(date) {
  try {
    const encryptedValue = await AsyncStorage.getItem(date);
    if (encryptedValue !== null) {
      const value = JSON.parse(uncompileStr(encryptedValue));
      return value;
    }
    return null;
  } catch(e) {
    // error reading value
    console.error(e);
  }
}

/** Get a list of items in storage
 * @return a list of keys.
*/
export async function getAllItemsWrapper(callBack) {
  let keys = [];
  let items = {};
  let temp;

  try {
    keys = await AsyncStorage.getAllKeys();
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "pwd") continue;
      temp = await AsyncStorage.getItem(keys[i]);
      temp = JSON.parse(uncompileStr(temp));
      items[keys[i]] = temp;
    }
  } catch(e) {
    // read key error
    console.error(e);
  }

  if (items) {
    let itemsKeys = Object.keys(items);
    textListArr = itemsKeys.map(itemsKey => {
        return(<ItemView key={itemsKey+"-ItemView"} items={items} itemsKey={itemsKey}/>)
    });
    callBack(textListArr);
  } else {
    callBack(null);
  }
}

/** Get a list of items in storage
 * @return a list of keys.
*/
export async function getAllItems(dispatch) {
  let keys = [];
  let items = {};
  let temp;

  try {
    keys = await AsyncStorage.getAllKeys();
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "pwd") continue;
      temp = await AsyncStorage.getItem(keys[i]);
      temp = JSON.parse(uncompileStr(temp));
      items[keys[i]] = temp;
    }
  } catch(e) {
    // read key error
    console.error(e);
  }

  dispatch({ type: 'DONE', localData: items });
}

/** Clear all data in storage.
*/
export async function clearAll() {
  try {
    await AsyncStorage.clear();
  } catch(e) {
    console.error(e);
  }
}

/** Judge if a str is a valid date string.
 * @return true if the str is a valid date string
*/
export const isValidDate = (dateStr) => {
  let timestamp = Date.parse(dateStr);

  if (isNaN(timestamp) == false) {
    return(true);
  }
  return(false);
}

const RecordView = ({recordData, recordKey}) => {
  return (
    <Text key={recordKey}>
    {recordData}
    </Text>
  );
};

const ItemView = ({items, itemsKey}) => {

  let itemData = items[itemsKey];
  let itemIndex = -1;
  let tempStart, tempEnd;

  let itemListArr = itemData.map(itemDat => {
    itemIndex++;

    if (isValidDate(itemDat.start) && isValidDate(itemDat.end)) {
      tempStart = new Date(itemDat.start);
      tempEnd = new Date(itemDat.end);
      return (
        <Text key={itemsKey+itemIndex}>
        Date: {itemsKey}{'\n'}
        Start: {tempStart.toLocaleString()}{'\n'}
        End: {tempEnd.toLocaleString()}{'\n'}
        Tag: {itemDat.tag}{'\n'}{'\n'}
        </Text>
      )
    } else return(null);
  });
  return (itemListArr);
};

/**
 * Generate date keys for all days between the two input date.
 * @param firstDate Date object
 * @param secondDate Date object
 * @return a list of date keys for use in AsyncStorage
*/
export function dateKeysBetween(firstDate, secondDate) {
  if (secondDate < firstDate) {
    console.log("Please give a valid date range.");
    return(null);
  }

  let dates = [];
  let dateptr = firstDate;
  let i = 0;
  while (dateptr <= secondDate) {
    dates[i++] = (new Date(dateptr)).toLocaleDateString();
    dateptr.setDate(dateptr.getDate()+1);
  }
  return dates;
}

/**
 * Get all items with keys in the input list.
 * @param dateKeys a list of keys
 * @return a list of items
*/
export async function getDatesData(dateKeys) {
  let keys = dateKeys;
  let items = {};
  let temp;

  try {
    for (let i = 0; i < keys.length; i++) {
      temp = await AsyncStorage.getItem(keys[i]);
      if (temp) {
        temp = JSON.parse(uncompileStr(temp));
        items[keys[i]] = temp;
      }
    }
  } catch(e) {
    // read key error
    console.error(e);
  }
  return(items);
}

/**
 * Summarize date by tag.
 * @param dateData {"04/19/20":[{"end":..., "start":..., "tag":...}, {...}], "04/20/20":[...]}
 * @return an object with tags as fields, minutes as values
*/
export function summarizeData(dateData) {
  if (dateData) {
    let counts = {"Study":0, "Work":0, "Relax":0, "Sleep":0};
    let dateKeys = Object.keys(dateData);
    for (let i = 0; i < dateKeys.length; i++) {
      let dayData = dateData[dateKeys[i]]; // a list
      for (let j = 0; j < dayData.length; j++) {
        let record = dayData[j];
        let recordStart = new Date(record["start"]);
        let recordEnd = new Date(record["end"]);
        let diff = Math.abs(recordEnd - recordStart);
        let temp = Math.floor((diff/1000)/60);
        counts[record["tag"]] += temp; // in minutes
      }
    }
    return(counts);
  } else {
    console.log("Please check input dateData.");
    return(null);
  }
}

/**
 * Summarize date by tag.
 * @param dateData {"04/19/20":[{"end":..., "start":..., "tag":...}, {...}], "04/20/20":[...]}
 * @return an object with tags as fields, minutes as values
*/
export function summarizeDataByTag(dateData) {
  if (dateData) {
    let counts = {"Study":0, "Work":0, "Relax":0, "Sleep":0};
    let dateKeys = Object.keys(dateData);
    for (let i = 0; i < dateKeys.length; i++) {
      let dayData = dateData[dateKeys[i]]; // a list
      for (let j = 0; j < dayData.length; j++) {
        let record = dayData[j];
        let recordStart = new Date(record["start"]);
        let recordEnd = new Date(record["end"]);
        let diff = Math.abs(recordEnd - recordStart);
        let temp = Math.floor((diff/1000)/60);
        counts[record["tag"]] += temp; // in minutes
      }
    }
    let countsList = [];
    let countKey = Object.keys(counts);
    for (let i = 0; i < countKey.length; i++) {
      countsList[i] = {"name":countKey[i], "count":counts[countKey[i]],
      color: colors[i],
      legendFontColor: "#7F7F7F",
      legendFontSize: 15};
    }
    return(countsList);
  } else {
    console.log("Please check input dateData.");
    return(null);
  }
}

/**
 * Summarize date by tag and date.
 * @param dateData {"04/19/20":[{"end":..., "start":..., "tag":...}, {...}], "04/20/20":[...]}
 * @return an object with tags as fields, minutes as values
*/
export function summarizeDataByTagAndDate(dateData) {
  if (dateData) {
    let barLegend = ["Study", "Work", "Relax", "Sleep"];
    let dateKeys = Object.keys(dateData);
    let barLabels = [];
    let dataList = [];
    for (let i = 0; i < dateKeys.length; i++) {
      barLabels[i] = dateKeys[i].substring(0, 5);
      let dayData = dateData[dateKeys[i]]; // a list
      let temp = [0, 0, 0, 0];
      for (let j = 0; j < dayData.length; j++) {
        let record = dayData[j];
        let recordStart = new Date(record["start"]);
        let recordEnd = new Date(record["end"]);
        let diff = Math.abs(recordEnd - recordStart);
        let tempMins = Math.floor((diff/1000)/60);
        let tempIndex;
        switch (record["tag"]) {
          case "Study":
            tempIndex = 0;
            break;
          case "Work":
            tempIndex = 1;
            break;
          case "Relax":
            tempIndex = 2;
            break;
          default:
            tempIndex = 3;
        }
        temp[tempIndex] += tempMins;
      }
      dataList[i] = temp;
    }
    let barData = {
      labels: barLabels,
      legend: barLegend,
      data: dataList,
      barColors: colors
    };

    return(barData);
  } else {
    console.log("Please check input dateData.");
    return(null);
  }
}

/* Simple encoding / decoding funtions found online at https://blog.csdn.net/wbx_wlg/article/details/78111806 */
// encode string
export function compileStr(code){
  if (code === "") return code;
  var c=String.fromCharCode(code.charCodeAt(0)+code.length);
  for(var i=1;i<code.length;i++){
  c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
  }
  return escape(c);
}

// decode string
export function uncompileStr(code){
  if (code === "") return code;
  code=unescape(code);
  var c=String.fromCharCode(code.charCodeAt(0)-code.length);
  for(var i=1;i<code.length;i++){
  c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
  }
  return c;
}
