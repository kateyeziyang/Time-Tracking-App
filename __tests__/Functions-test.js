/**
 * @format
 */

import 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { checkPwd, checkLock, setNewPwd, submitRecord, getRecordByDate, getAllItems, clearAll, isValidDate, compileStr, uncompileStr,
  summarizeDataByTag, summarizeDataByTagAndDate, summarizeData, getDatesData, dateKeysBetween, submitPeriod
 } from '../common/commonFunctions';

const foo = () => {};

beforeEach(async () => {
  await AsyncStorage.clear();
});

it('checkPwd returns true given correct password', async () => {
  await setNewPwd("", "1234", foo, foo, foo);
  const result = await checkPwd("1234", foo, foo, foo);

  expect(result).toBe(true);
});

it('checkPwd returns false given wrong password', async () => {
  await setNewPwd("", "1234", foo, foo, foo);
  const result = await checkPwd("abcd", foo, foo, foo);

  expect(result).toBe(false);
});

it('checkLock returns -1 when there is no app lock', async () => {
  const result = await checkLock(foo);

  expect(result).toBe(-1);
});

it('checkLock returns 1 when there is an app lock', async () => {
  await setNewPwd("", "1234", foo, foo, foo);
  const result = await checkLock(foo);

  expect(result).toBe(1);
});

it('setNewPwd rejects invalid new password', async () => {
  const result = await setNewPwd("", "abc", foo, foo, foo);

  expect(result).toBe(false);
});

it('setNewPwd correctly set new password', async () => {
  const result = await setNewPwd("", "1234", foo, foo, foo);

  expect(result).toBe(true);
});

it('summarizeDataByTag works correctly with some data', () => {
  const data = {"04/13/20": [{"end": "2020-04-13T09:33:10.064Z", "start": "2020-04-13T08:33:10.064Z", "tag": "Study"}], "04/16/20": [{"end": "2020-04-16T08:45:22.631Z", "start": "2020-04-16T07:45:22.631Z", "tag": "Sleep"}, {"end": "2020-04-16T13:58:26.811Z", "start": "2020-04-16T10:58:26.811Z", "tag": "Work"}], "04/19/20": [{"end": "2020-04-19T08:45:22.631Z", "start": "2020-04-19T07:45:22.631Z", "tag": "Relax"}, {"end": "2020-04-19T19:48:55.697Z", "start": "2020-04-19T18:48:55.697Z", "tag": "Sleep"}]};

  const sumedData = summarizeDataByTag(data);
  const expectedData = [{"color": "#363062", "count": 60, "legendFontColor": "#7F7F7F", "legendFontSize": 15, "name": "Study"}, {"color": "#4d4c7d", "count": 180, "legendFontColor": "#7F7F7F", "legendFontSize": 15, "name": "Work"}, {"color": "#827397", "count": 60, "legendFontColor": "#7F7F7F", "legendFontSize": 15, "name": "Relax"}, {"color": "#d8b9c3", "count": 120, "legendFontColor": "#7F7F7F", "legendFontSize": 15, "name": "Sleep"}];

  expect(sumedData).toMatchObject(expectedData);
})

it('summarizeDataByTagAndDate works correctly with some data', () => {
  const data = {"04/13/20": [{"end": "2020-04-13T09:33:10.064Z", "start": "2020-04-13T08:33:10.064Z", "tag": "Study"}], "04/16/20": [{"end": "2020-04-16T08:45:22.631Z", "start": "2020-04-16T07:45:22.631Z", "tag": "Sleep"}, {"end": "2020-04-16T13:58:26.811Z", "start": "2020-04-16T10:58:26.811Z", "tag": "Work"}], "04/19/20": [{"end": "2020-04-19T08:45:22.631Z", "start": "2020-04-19T07:45:22.631Z", "tag": "Relax"}, {"end": "2020-04-19T19:48:55.697Z", "start": "2020-04-19T18:48:55.697Z", "tag": "Sleep"}]};

  const sumedData = summarizeDataByTagAndDate(data);
  const expectedData = {"barColors": ["#363062", "#4d4c7d", "#827397", "#d8b9c3"], "data": [[60, 0, 0, 0], [0, 180, 0, 60], [0, 0, 60, 60]], "labels": ["04/13", "04/16", "04/19"], "legend": ["Study", "Work", "Relax", "Sleep"]};

  expect(sumedData).toMatchObject(expectedData);
})

it('summarizeData works correctly with some data', () => {
  const data = {"04/13/20": [{"end": "2020-04-13T09:33:10.064Z", "start": "2020-04-13T08:33:10.064Z", "tag": "Study"}], "04/16/20": [{"end": "2020-04-16T08:45:22.631Z", "start": "2020-04-16T07:45:22.631Z", "tag": "Sleep"}, {"end": "2020-04-16T13:58:26.811Z", "start": "2020-04-16T10:58:26.811Z", "tag": "Work"}], "04/19/20": [{"end": "2020-04-19T08:45:22.631Z", "start": "2020-04-19T07:45:22.631Z", "tag": "Relax"}, {"end": "2020-04-19T19:48:55.697Z", "start": "2020-04-19T18:48:55.697Z", "tag": "Sleep"}]};

  const sumedData = summarizeData(data);
  const expectedData = {"Relax": 60, "Sleep": 120, "Study": 60, "Work": 180};

  expect(sumedData).toMatchObject(expectedData);
})

it('dateKeys returns a list of date strings given correct input', () => {
  const dateValue = new Date("04/13/20");
  const dateValue2 = new Date("04/16/20");

  const dates = dateKeysBetween(dateValue, dateValue2);
  const expectedDates = [ '2020-4-13', '2020-4-14', '2020-4-15', '2020-4-16' ];

  expect(JSON.stringify(dates)).toBe(JSON.stringify(expectedDates));
})

it('dateKeys returns a empty list given incorrect input', () => {
  const dateValue = new Date("04/13/20");
  const dateValue2 = new Date("04/16/20");

  const dates = dateKeysBetween(dateValue2, dateValue);
  const expectedDates = [];

  expect(dates).toBe(null);
})

it('getDatesData returns empty object when no data available', async() => {
  const dateKeys = [ '2020-4-13', '2020-4-14', '2020-4-15', '2020-4-16' ];

  const records = await(getDatesData(dateKeys));
  expect(Object.keys(records).length).toBe(0);
})

it('getDatesData works correctly with available data', async() => {
  const dateKeys = [ '2020-4-13', '2020-4-14', '2020-4-15', '2020-4-16' ];
  const dateValue = new Date("2020-04-14T22:12:46.752Z");
  await(submitRecord(dateValue, dateValue, "Sleep"));

  const records = await(getDatesData(dateKeys));
  const expectedRecords = {
      '2020-4-14': [
        {
          start: '2020-04-14T22:12:46.752Z',
          end: '2020-04-14T22:12:46.752Z',
          tag: 'Sleep'
        }
      ]
    };
  expect(JSON.stringify(records)).toBe(JSON.stringify(expectedRecords));
})

it('submitPeriod returns a list of data', async() => {
  const dateValue = new Date("2020-04-14T22:12:46.752Z");
  await(submitRecord(dateValue, dateValue, "Sleep"));

  const dateValue1 = new Date("04/13/20");
  const dateValue2 = new Date("04/16/20");
  const placeHolderFunction = () => {};
  const records = await(submitPeriod(dateValue1, dateValue2, placeHolderFunction));

  const expectedRecords = {
      '2020-4-14': [
        {
          start: '2020-04-14T22:12:46.752Z',
          end: '2020-04-14T22:12:46.752Z',
          tag: 'Sleep'
        }
      ]
    };
  expect(JSON.stringify(records)).toBe(JSON.stringify(expectedRecords));
})

it('checks if Async Storage is used in submitRecord', async () => {
  const dateValue = new Date("2020-04-12T22:12:46.752Z");

  await(submitRecord(dateValue, dateValue, "Sleep"));
  const record = await(getRecordByDate("2020-4-12"));

  expect(AsyncStorage.setItem).toHaveBeenCalled();
  expect(record[0].start.toString()).toBe("2020-04-12T22:12:46.752Z");
})

it('checks if Async Storage is used in getRecordByDate', async () => {
  await(getRecordByDate("2020-4-12"));

  expect(AsyncStorage.getItem).toHaveBeenCalled();
})

it('checks getAllItems returns a list of correct length', async () => {
  const dateValue = new Date("2020-04-12T22:12:46.752Z");
  const dateValue2 = new Date("2020-04-13T22:12:46.752Z");

  await(submitRecord(dateValue, dateValue, "Sleep"));
  await(submitRecord(dateValue2, dateValue2, "Work"));
  await(getAllItems(({ localData })=>{
    expect(Object.keys(localData).length).toBe(2);
  }));
})

it('checks clearAll clears all data', async () => {
  const dateValue = new Date("2020-04-12T22:12:46.752Z");
  const dateValue2 = new Date("2020-04-13T22:12:46.752Z");

  await(submitRecord(dateValue, dateValue, "Sleep"));
  await(submitRecord(dateValue2, dateValue2, "Work"));
  await(getAllItems(({ localData })=>{
    expect(Object.keys(localData).length).toBe(2);
  }));
  await(clearAll());
  await(getAllItems(({ localData })=>{
    expect(Object.keys(localData).length).toBe(0);
  }));
})

it('checks isValidDate return true for correct string', () => {
  const temp = "2020-04-12T22:12:46.752Z";
  const result = isValidDate(temp);
  expect(result).toBe(true);
})

it('checks isValidDate return false for wrong string', () => {
  const temp = "blabla";
  const result = isValidDate(temp);
  expect(result).toBe(false);
})

it('checks encoding returns a different string', () => {
  const temp = "2020-04-12T22:12:46.752Z";
  const result = compileStr(temp);
  expect(temp).not.toBe(result);
})

it('checks encoding and decoding returns the string', () => {
  const temp = "2020-04-12T22:12:46.752Z";
  const result = uncompileStr(compileStr(temp));
  expect(temp).toBe(result);
})
