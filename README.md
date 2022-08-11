This is e-commerce website for construction material

Steps to run this aappliation on your pc:-

*Download the zip file*

*Open the folder in VS code and in the terimnal enter the command (npm init)*

*Now create a (.env) file in the top hierarchy and create the following variables *

GOOGLE_ID=You can create this using this link('https://developers.google.com/identity/sign-in/web/sign-in').Its for google signup\login
GOOGLE_TOKEN=You can create this using this link('https://developers.google.com/identity/sign-in/web/sign-in').

EMAIL_ID=enter the email id from which you want to send email to customers for confirmation,you can edit the provider by going on public/controller.js/sendEmail() function.

PASSWORD=Enter the password of the above email id

MONGO_URI=You can gey the link by creating your own cluser in mongodb atlas,You can follow this link to get idea how to download the link ('https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/')

*Now enter the command (node app.js) in the terminal*

*Open browser and go to (https://localhost:4000) and you can see the application running*