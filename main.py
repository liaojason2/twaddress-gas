from flask import Flask, request
import os
import twaddress

app = Flask(__name__)

@app.route('/', methods=['POST'])
def address_to_english():
  address = request.json.get('address')
  address = twaddress.get(address)

  return address

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
