from flask import Flask,render_template,request
import requests
 
app = Flask(__name__)
app.config["DEBUG"] = True
 
@app.route('/form')
def form():
    return render_template('form.html')
 
@app.route('/data/', methods = ['POST'])
def data():
    
    # create a variable containing the value of the city field on the html form
    form_data = request.form['City']
    
    # create the url containing the city variable, process the response
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + form_data + "&appid=4c4c74c9d7d23d7ed5b0d20daafcaf64&units=imperial"
    response = requests.get(url)
    data = response.json()
    
    # create an empty list and append the data from the request using a for loop
    info = list()
    for i in data['main']:
        val = str(data['main'][i])
        info.append(i + ': ' + val)
        
    # the render template displays info to users
    return render_template('data.html', info = info)
 
 
app.run(host='0.0.0.0', port=80)