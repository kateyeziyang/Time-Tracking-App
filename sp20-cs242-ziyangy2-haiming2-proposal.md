# Final Project Proposal
## Motivation
At night, many people have such a feeling: what I have done today? It seems I've done nothing. Many people would like to have a good time management plan, but first they need to know what they are spending time on, and, after they have a plan for time, they need to see if they actually spend that much time on studying or working as in their plan.
WeTime app is born for this task. Just like expense tracking app, users can save a period of time along with a description. After a day / week, users can see an analyzing diagram of the past day / week. The user can also retrieve data of a single day.
Because of Apple's limitation on devices developing iOS, WeTime will most likely be an Android only app.

## Technologies, Tools and Style
Since this this a mobile app, I will use JavaScript and React Native as a framework.  
The developing platform is Windows 10, and IDE is Android Studio.  
I will follow the CS 242 JavaScript Styling Convention Reference Document for JavaScript style.  

## High-level Functionalities
1. Record: the user will be able to save a period of time along with a description.
2. Data storage: user data will be saved locally. If there is time in Week 3, I'll try to add database to manage user data and add sign-in / sign-up functionalities.
3. Analyzing diagram: the app will show analyzing diagram for data in a given period.
4. App lock: (If have time to implement) the user can set a password for this app so that every time he opens the app, he must type the password to access the app.

## GUI
![](https://uofi.box.com/shared/static/3b2rqr0ya90w6ym4nqavicpiqmymat4r.png)

## Weekly Functional Goal
### Functional
| Week | Points | Requirement |
| --- | --- | --- |
| Week 1 | 3 | Design and implement a data management plan for saving time data.<br>1. Generate a JSON format file locally to store data in each month. <br>2. If possible, encrypt the JSON file.<br>3. If have time, add funtions for multiple users. User will be able to logout and signin; Everyone's data is independent and is hidden from others. |
|   | 4 | Create model that can save multiple records consist of start time, end time and event tag to a file. |
|   | 8 | +2pt Create basic screens for time recorder, analyzer and app lock. Setting appropriate headers and options. <br>+2pt Implement tab navigation between screens.<br>In time recorder screen, implement the following:<br>+2pt Create a time input area for start time, end time. User should be able to select (rather than type in) a specfic time period.<br>+2pt Create a drag down menu for event tags. The user can also choose to type in. |
| Week 2 | 7 | The analyzer model should be able to manipulate as such:<br>+2pt Can retrieve data from a specfic period from local file. <br>+1pt Generate text analysis (average, mean).<br>+4pt Generate statistical diagrams, such as histogram, box diagram and pie chart. |
|   | 4 | +1pt The analyzer screen should have an input field to select a time period.<br>+1pt an entry button to look at past data, a tab button to select from different diagram types. <br>+2pt A place to exhibit the diagrams. |
|   | 3 | Create a screen to for viewing past time data. |
|   | 1 | Navigation between analyzer screen and past data screen. |
| Week 3 | 6 | +3pt App lock should be able to save password in a secure way, and check input password with the secured password to give access.<br>+2pt The user can set new password using old password.<br>+1pt The app lock setting screen should have an old pwd field, a new pwd field. |
|   | 3 | +2pt Create a lock screen that if app lock is enabled, the screen should be shown prior to any other screens.<br>+1pt Navigation between lock screen and home screen. |
|   | 4 | Beautify the app. Set icons and style for each part. |
|   | 2 | Finish and polish any functions that are not completed / perfect. Maybe add more details to the app. |

### Test
| Week | Part | Points | Requirement |
| --- | --- | --- | --- |
| Week 1 | Unit tests | 4  | for every 2 unit tests, gain 1 point. |
|   | Snapshot test | 3  | 2 point for time recorder view layer.<br>1 point for test error conditions. |
|   | Manual test plan | 3  | Manually test navigation between screens. |
| Week 2 | Unit tests | 4  | for every 2 unit tests, gain 1 point. |
|   | Snapshot test | 3  | 2 point for analyzer view layer.<br>1 point for test error conditions. |
|   | Manual test plan | 3  | Manually generate data and check the result text / diagram statistics. |
| Week 3 | Unit tests | 3  | for every 2 unit tests, gain 1 point. |
|   | Snapshot test | 3  | 2 point for app lock view layer.<br>1 point for test error conditions. |
|   | Manual test plan | 4  | Test the whole app and see if everything works. |