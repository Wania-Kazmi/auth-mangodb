We used the following libraries in this project: <br>
<b>1. axios</b> - we can use fetch as well <br>
<b>2. bcryptjs</b> - to encrypt the password and then store to databas, also used to create a token as well <br>
<b>3. jsonwebtoken</b> - securely sending a token and not to be stored in the local storage. We will be sending and <br>securing the cookies from the server side so that it doesn't get manipulated on the front-end side and for this <br>we will need a jsonwebtoken
<b>4. nodemailer - use to shoot out an email from gmail, aws or anything</b> <br>
<b>5. react-hot-toast </b> - for pop-up messages  <br>
<b>6. mongoose </b> - help us to talk to mango db. It's a wrapper around mango db drivers<br>

<b>STEP 1: We build signup login front-end page</b> <br>
    We also build the backend of signup and login page and connect to database and jwt token for user

<b>STEP 2: Now some of our pages are not protected:</b> <br>
<b>STEP 2 (SOLUTION): Middleware</b> <br>
    Through profile page we can still go back to our login page and we can directly access to profile page
    This will be done through middleware - completed

<b>STEP 3: Logout functionality is also completed.</b><br>

<b>STEP 4: Extract Data from Token:</b> <br>

<b>STEP 5: How we can retrive a user, update data in the database and send an email:</b><br>
Sending an email has alot of issues. 1. Good way 2.Ok way 3.Bad way of doing it.
We will use nodemailer which helps us with almost everything that we want to do but there are new mailers in the market that handle this mailing in new and creative way. Here we will follow nodemailer. Usually our mailer are just use for mailing purpose not for generating token or anything else. But here we are also generating a token within the mail as well

<b>How do you want to verify the user?</b>
There are couple of ways, we can do all in the backend or mix of backend or frontend. In case of backend approach URL will be in that way and the backend advantage is there is nothing much you just have to redirect the user onto home page and if we will follow the front-end part then we need a frontend page of it. Advantage of frontend is that if you bring the user to certain page for verification then the verification happens then we can provide a message of successfull verification

session maintain .... client side/ server side???
