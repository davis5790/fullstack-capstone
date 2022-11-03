# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

# Flask app

 * Consists of 3 files; app.py, form.html, and data.html
 * The actual logic of the app is contained in app.py, with the app declaration, and the separate page declarations '/' and '/data'.
 * The '/' contains an html form that passes the user input to the '/data' page.
 * The '/data' portion of app.py contains python logic that takes the user input from the html form, makes the api call, and displays the information to the user.
 * To display the data, the data.html form uses a language called jinja that uses python logic in HTML
