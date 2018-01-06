## Testing it locally
I'm using https://www.npmjs.com/package/alexa-skill-test

Just run `alexa-skill-test` inside of the `lambda/custom` folder

## Deploy it
I'm using Alexa Skills Kit Command. Follow the steps to install and configure it here: https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html

Run: `ask deploy` to deploy it
Test: `ask simulate -l en-US -t "start bible genius"`
