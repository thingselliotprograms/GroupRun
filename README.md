# GroupRun: https://grouprun.thingselliotprograms.com
GroupRun is a single-page site meant as a hub for groups of runners to post their runs, add proposals for runs and competitions, as well as interact via instant messaging and video chat.
GroupRun is a MEAN stack project, storing user / group data in a MongoDB database, the server running on Node.JS and Express, and the client side being handled mostly by Angular 1.
## Features
Users have a streamlined calendar running entry module derived from the https://fullcalendar.io/ opensource module.
<img src="https://github.com/thingselliotprograms/GroupRun/blob/master/siteimages/runningcal2.png" width="100%" />

For each group a user joins / creates, they can view the group's calendar, displaying every member's runs in a simple format:
<img src="https://github.com/thingselliotprograms/GroupRun/blob/master/siteimages/groupcal.png" width="100%" />

Instant messaging between all members of the group is achieved using the SocketIO (https://socket.io/) npm module:
<img src="https://github.com/thingselliotprograms/GroupRun/blob/master/siteimages/conversation.png" width="100%" />
