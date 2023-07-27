We used the following libraries in this project: <br>
<b>1. axios</b> - we can use fetch as well <br>
<b>2. bcryptjs</b> - to encrypt the password and then store to databas, also used to create a token as well <br>
<b>3. jsonwebtoken</b> - securely sending a token and not to be stored in the local storage. We will be sending and <br>securing the cookies from the server side so that it doesn't get manipulated on the front-end side and for this <br>we will need a jsonwebtoken
<b>4. nodemailer - use to shoot out an email from gmail, aws or anything</b> <br>
<b>5. react-hot-toast </b> - for pop-up messages  <br>
<b>6. mongoose </b> - help us to talk to mango db. It's a wrapper around mango db drivers<br>

We build signup login front-end page
We also build the backend of signup and login page and connect to database and jwt token for user
Now:
Some of our pages are not protected:
Through profile page we can still go back to our login page and we can directly access to profile page
This will be done through middleware
Logout functionality is also pending yet
