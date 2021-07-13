
# Baithak

This is an open-source android app made during the [Microsoft Engage Mentorship Programs 2021](https://microsoft.acehacker.com/engage2021/?mc_cid=70edf59e1b&mc_eid=a6934c0683). The theme of the program is to build a Microsoft teams clone with **Agile software development methodology**.

*Baithak is a Hindi word that means* "**Meeting**"

So baithak is a **multi-video calling app** where people can connect virtually through video calls and would able to do conversations with other users. The can also schedule tasks and meetings with other members too.

<a href="https://drive.google.com/drive/u/0/folders/1CNthFvi_Wtyp8V2JXN18udlOarTzRPyP">
  <img src="https://firebasestorage.googleapis.com/v0/b/baithak-4a1fe.appspot.com/o/android-ver1.svg?alt=media&token=b22cc972-c33f-4d7f-910f-07bc17e9b20e" />
</a>

## App Flow and Screenshots

Here's a app flow [link](https://drive.google.com/file/d/1vIKdk2OoCO1oKxCmdrN8DEhFD8ms1C8G/view?usp=sharing) (Open with diagrams.net for better view)
  
## Features

- Secure with **Authentication**.
  
  The app is secured with three types of Authentication systems.
  - With Email and Password
  - With **Google**
  - With **Facebook**

- **Dark/Light theme**


-  Home Page
    
    The home page of the app allows you to do the following things.

    - At the top there's  a **search bar** where the user can search for other users.
    - User can able to start an **instant** baithak.
    
      On starting an instant baithak, they are requested to add a Name and description(optional).  After creating it, the baithak is secured with `Id` and `password` (auto-generated) which they can share with other users through their favourite messaging app.
    - User can **join** other user's baithak with **joining link** and also with Id and password.
    - They can **schedule** baithak along with other authenticated users.
      
      This feature allows the user to schedule baithak on a particular date and time, and they will get **reminder notifications** at an appropriate time.

- Video Calling

    The video calling screen is loaded with the followig features.

    - The user can **turn on/off** their **mic** and **video**.
    - They can **share** the baithak credentials (Id and Password) through other messaging apps.
    - They can see other **participants** in the baithak.
    - The camera can be **switch between front and back**.
    - They can **turn on/off their flashes** with just one click on the screen. This is very **helpful during nights**.
    - They can do **real-time chats** along with an option of sharing **images** in the chat while during the baithak.
    - They can turn **off/on all incoming videos**. The videos will be turned off from the user's side who is using this feature.
    - They can turn **off/on all incoming audios**. The audios will be turned off from the user's side who is using this feature.

    Worry about important messages being shared in chat while during baithak? **All the participants there in the baithak can continue their conversation in the app's chat section.

- Chats

    The app has a real=time chat feature where the user can share images too. 

    - They can do **direct messages (1:1)** to any user of the app.
    - They can **create groups(1:N)** with other users of the app.
    - They are allowed to add their favourite image as a **group image** while creating a group. They can **change** this group image in future too.
    - They also have the option to **leave** the group.
    - There's an option of creating baithak in the chat screen. When they create baithak through this, all the other members in the group will get **notified**.
    
- Tasks

    This section helps the user to manage there task and future meetings. There's a **calendar** in the Tasks tab section where the user can see there added task. They can **create and edit task** and will get **reminder notification** at approriate time.

- Profile section

    There's a dedicated profile section which allows the user to see other users profile. They can also **edit there profile** section too. They profile section contains

    - Name
    - Tag line 
    - Bio
    - Email Id
    - **Social Profile** links like Instagram, Facebook, LinkedIn, Twitter and Github.
    
    - Settings 
    
        - Toggle between themes i.e. Dark and Night mode.
        - User can anytime **turn on/off their notifications**.


## How I used agile software development methodology in my project?

The core theme of the Microsoft mentorship program is the **Agile software development methodology**. Agile is a methodology adopted today in the software industry which promotes teamwork, flexible procedures, and a sle-organizing team. 

How I achieved agile methodology?

- As the project is made by an individual i.e. me with the support of mentors, so I first considered myself as a team. 
- As in Agile methodology, the development cycle is broken down into Sprints (1/2 weeks), so I've chosen **1 week** as a sprint and divided tasks according.

    - **Sprint 1 (Research Phase)** - 14/06/21 - 21/06/21 
    
        - [x]  Research on the implement of Video call from different libraries
        - [x]  Have a meet with mentors and ask necessary doubts.
        - [x]  Basic overview of how your app should work and look like
    
    - **Sprint 2 (Development Phase I)** - 21/06/21 - 29/06/21 
    
        - [x]  Setup the react native project and add git and upload to github.
        - [x]  Add theme - dark and light theme
        - [x]  Add firebase and implement Authentications with firebase
        - [x]  Main Navigation
        - [x]  Implement Video between two people

    - **Sprint 3 (Development Phase II)** - 28/06/21 - 05/07/21 
    
        - [x]  Make a proper UI of Video Stream Screen.
        - [x]  Add a logic for join meeting (waiting list, host join)
        - [x]  Bug Fixes
            - [x]  Google SignIn developer error
            - [x]  ScrollView of Authentication Screens
            - [x]  Local Video not showing
            - [x]  Not able to update while joining meet
            - [x]  Mute Video and Mute video not working 
        - [x]  Add message to current meeting
        - [x]  Make a profile screen
        - [x]  Make a Search bar
        - [ ]  Schedule a meeting and add participants during create meet
        - [ ]  If time permits...try deep links to share meet

    - **Sprint 3 (Development Phase III along with Adopt phase)** - 05/07/21 - 12/07/21 
    
        - [x]  Make a adopt feature
        - [x]  Add notifications in the chat and baithak
        - [x]  Make a edit profile screen
        - [x]  Add calendar along with task
        - [x]  Add calendar along with agenda
        - [x]  Group chat header modal
        - [x]  New user should have their notifications on
        - [x]  Add onboarding Screens.
        - [x]  Make a video for submission and create a Readme.md file
        


- From the very starting of my development phase, I started using **git** and **github** for managing my project. This is my first time extensively using git and github. 

    For every new feature, I created a separate branch, did my code on that branch. And after writing the code and testing, I made a pull request and merged it with my `master`

- The **testing phase** comes after creating every new feature. This is one of the most challenging tasks for me. As there is a feature of multi-video calling and chats along with notifications, I usually took **2-3 phones** for testing. After I was satisfied with the feature and fixed all the necessary bugs I made a new `release-apk` and upload it under the release section of github.  


I would like to thank [Git](https://git-scm.com/) and [Github](https://github.com/), without them I couldn't able to achieve agile software development methodology.

## Tech Stack

<p align="center">
  <img width="250" height="120" src="https://firebasestorage.googleapis.com/v0/b/baithak-4a1fe.appspot.com/o/react%20native.png?alt=media&token=32230bf2-f359-4142-952d-521b5c06d76a">
  <img width="250" height="120" src="https://firebasestorage.googleapis.com/v0/b/baithak-4a1fe.appspot.com/o/firebase.png?alt=media&token=e6df7389-6f68-4c25-b3ca-0fc7045a67d9">
  <img width="200" height="120" src="https://firebasestorage.googleapis.com/v0/b/baithak-4a1fe.appspot.com/o/node.png?alt=media&token=312aaab9-fb02-4dc2-b7b7-d6b54326539a">
  <img width="250" height="120" src="https://firebasestorage.googleapis.com/v0/b/baithak-4a1fe.appspot.com/o/redux.png?alt=media&token=dbe45530-3a05-4b64-83bb-ab67a072febd">
  <img width="250" height="120" src="https://firebasestorage.googleapis.com/v0/b/baithak-4a1fe.appspot.com/o/agora.png?alt=media&token=6cee77ab-6a56-4ad3-92df-37c06b5c2145">
</p>



## Why I choose this tech stack?
[React Native](https://reactnative.dev/) is an open-source **mobile application framework** created by Facebook which allows creating of native apps with a single code base and can run on multi-platforms like android and ios. It allows to write code once and use it again as a component. I have past experience with this technology and this was my first choice for creating this project. Since I have a windows machine, I've developed only an android app with this cross-platform technology. 

[Firebase](https://rnfirebase.io/)  is serverless technology backed by Google which offers features like **firestore database, authentication, storage, cloud messaging, etc**. In the initial sprint, I thought of having features like authentication, notifications, and chats. All these features can **easily be implemented with minimalistic API calls provide by firebase**. So firebase seems to have a great fit for my app. 

[Redux](https://redux.js.org/) is a javascript state management library that allows creating of a centralized store and powerful capabilities like undo/redo, state persistence, and much more. **Before this project, I didn't have experience with this library and was afraid to incorporate this into my projects because of the slight complexity of implementing it (this is what I feel). But now I'm more confident with this library. This is surely one of my great learning through this project.**

[Agora](https://www.agora.io/en/) is a real-time communication service that provides features like video calling, voice calling, chat messaging, and many more. As I've used react native as a frontend framework, agora provides video SDKs for react-native through their library `react-native-agora`. **I have also explored other libraries and APIs like [WebRTC](https://webrtc.org/), [Twilio](https://www.twilio.com/), [`react-native-jitsi-meet`](https://github.com/skrafft/react-native-jitsi-meet) and [Vonage API](https://www.vonage.com/communications-apis/). Except for WebRTC all other SDKs/library/APIs doesn't provide that much flexibility according to my needs. The WebRTC can provide features like agora but I feel relatively difficult in implementing.**

The app is backed with [Node.js](https://nodejs.org/en/) server hosted on Heroku. 

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://baithak-app.herokuapp.com/)


## Run Locally

This is how you can run this project in your local machine.

Clone the project

```bash
  git clone https://github.com/MayankSingh173/Baithak.git
```

Go to the project directory

```bash
  cd Baithak
```

Install dependencies

```bash
  npm install
```

Start the metro server

```bash
  npm run start
```

Run the app in emulator or physical device connect with USB

```bash
  npx react-native run-android
```
  
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

    1. Fork the Project
    2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
    3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
    4. Push to the Branch (`git push origin feature/AmazingFeature`)
    5. Open a Pull Request

  
## Feedback

If you have any feedback, please reach out to me at mayankayush173@gmail.com.

You can also fill the **feedback form** - [link](https://forms.gle/AopoezZbhsaBbLux7)

  
## Acknowledgements

 - [Microsoft Engage Mentorship Program 2021](https://microsoft.acehacker.com/engage2021/?mc_cid=70edf59e1b&mc_eid=a6934c0683)

    I would like to thank Microsoft for providing such a great opportunity where I had to learn a lot from my mentors [Aditi Jain](https://www.linkedin.com/in/aditi-jain96/) and [Parth Mehra](https://www.linkedin.com/in/parth-mehra-b3116010a/) and through amazing live sessions.
 - [React Native](https://github.com/matiassingers/awesome-readme)
 - [Firebase](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
 - [Node.js](https://nodejs.org/en/)
 - [Heroku](https://dashboard.heroku.com/login)
 - [Agora](https://www.agora.io/en/)
 - [All libraries in `package.json`](https://github.com/MayankSingh173/Baithak/blob/master/package.json)
