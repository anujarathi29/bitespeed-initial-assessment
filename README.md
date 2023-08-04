# Bitespeed Backend Task: Identity Reconciliation - Solution


## Installation
Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/anujarathi29/bitespeed-initial-assessment
```
Build the front-end image.

```sh
cd front-end
docker build -t front-end:latest
cd ..
```
Build the back-end image.

```sh
cd back-end
docker build -t back-end:latest
cd ..
```

Docker compose.

```sh
docker compose up
```

- In the browser, go to [localhost](http//localhost:3000)
# API

## `/identify`
#### Expected payload
    {
        "email": <enter an email id>,
        "phoneNumber": <enter a phone number>
    }
#### Expected response
    {
	    "contact": {
		    "primaryContactId": <primary contact id>,
		    "emails": [
			    <entered email id> + "<list of emails if more than one email exists>
		    ],
		    "phoneNumbers": [
			    <entered phone number>" + "<list of phone numbers if more than one phone number exists>
		    ],
		    "secondaryContactIds": [<list of ids if secondary ids exists>]
	    }
    }


