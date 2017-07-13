# GroupRun: https://grouprun.thingselliotprograms.com
GroupRun is a single-page site meant as a hub for groups of runners to post their runs, add proposals for runs and competitions, as well as interact via instant messaging and video chat.
GroupRun is a MEAN stack project, storing user / group data in a MongoDB database, the server running on Node.JS and Express, and the client side being handled mostly by Angular 1.
<img src="https://github.com/thingselliotprograms/GroupRun/blob/master/siteimages/mainpage.png" width="100%" />
## Features
Users have a streamlined calendar running entry module derived from the https://fullcalendar.io/ opensource module.
<img src="https://github.com/thingselliotprograms/GroupRun/blob/master/siteimages/runningcal2.png" width="100%" />

For each group a user joins / creates, they can view the group's calendar, displaying every member's runs in a simple format:
<img src="https://github.com/thingselliotprograms/GroupRun/blob/master/siteimages/groupcal.png" width="100%" />

Instant messaging between all members of the group is achieved using the SocketIO (https://socket.io/) npm module:
<img src="https://github.com/thingselliotprograms/GroupRun/blob/master/siteimages/conversation.png" width="100%" />

Video chat is made possible in Chrome with the Twilio Video SDKs (https://www.twilio.com/video):
<img src="https://github.com/thingselliotprograms/GroupRun/blob/master/siteimages/videochat.png" width="100%" />

Routes and Challenges are still in progress. When complete, Routes will allow users to enter proposed runs, including links and thumbnails to MapMyRun-created routes, that will notify other members of the group so that they can vote and decide as a group formally.
Challenges will enable users to post competitions for specified date ranges within the group; i.e. the user with the most miles in a week, or the fastest average pace, etc. Winners will be awarded prizes and tracked within the site for additional incentive.
