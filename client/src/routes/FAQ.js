import React, {Component} from 'react';

export default class FAQ extends Component {
  render(){
    return (
      <div className='faq'>
        <div className='tagline'>q&a</div>

        <h2>...what is this?</h2>
        This full-stack MERN app (Mongo, Express, React, Node) allows users to anonymously send emails and text messages, making it the perfect spam generator -- hence, The Spamerator.

        <h2>...why is this?</h2>
        This project is the pre-interview challenge for a coding position in San Diego! WISH ME LUCK!

        <h2>...what was the challenge?</h2>
        <i>"Build a website contact form. Access to the form should be protected via a login screen. The form should contain fields for Name, Email and message at a minimum. Upon submit, the form should send the message to the email provided in the form, with the name as the email subject. Store the message in a database. Stored messages should be viewable via a link on the form screen."</i>
          <br/><br/>
          <strong>Requirements:</strong> AWS for hosting, SendGrid for email.
          <br/>
          <strong>Extra Credit:</strong> Build using MERN in Docker, secure with LetsEncrypt, integrate Twilio SMS, allow 3rd party social login.

        <h2>...then shouldn't it be hosted on AWS?</h2>
        I know, I got so close! I set up the EC2 instance, connected via PuTTY, transferred the files over, configured mongod.cfg, but just couldn't get MongoDB to cooperate. I suspect it could be related to the admin permissions on my Windows machine but who really knows... #excuses

        <h2>...I think I saw some bugs</h2>
        Very true, there's a few of them! They are, however, an accurate representation of my current skill level as a junior web developer. If you'd like to help me learn how to conquer them you're more than welcome to spam me an email -- Just pop <u>raquel.rudermano@gmail.com</u> into the email form.

        <h2>...wait, but, who are you?</h2>
        I'm Rachel, a linguist-turned-developer fresh out of <a href='https://www.learnacademy.org' target='_blank'>LEARN Academy</a>'s full-stack JavaScript bootcamp! Check out my <a href='https://www.linkedin.com/in/rachelruderman/' target='_blank'>LinkedIn</a>, <a href='https://github.com/rachelruderman' target='_blank'>GitHub</a>, and <a href='http://www.rachelruderman.com' target='_blank'>portfolio site</a> for more deets.

      </div>
    );
  }
}
