# nm-eval

*Original Brief:*
Create a responsive (phone, tablet, desktop) web application that allows the user to quick filter a list of things. The top of the page will have a search input field and then below that a list of things in response to the filter. The things should be sorted alphabetically. The things could be anything, but should be AJAX pulled from a backend service that you write and should ultimately be pulled from an open public API.


## Setup

*Note:* this project was developed on Node version **12.13.0** using [nvm](https://github.com/nvm-sh/nvm).
1. Clone the repo, of course.
2. Get yourself some [Spotify API](https://developer.spotify.com/dashboard/applications) keys and put a file named `.env` in the `/app` folder. The contents of the file should look like:
    ```
    CLIENTID=xxxxxxxxxx
    CLIENTSECRET=xxxxxxxxxx
    ```
    I can provide my `.env` file if you're someone that should have that sort of thing. Contact me via email.
3. Change into `/api` and run `npm install`. This is the **Node/Express** server.
4. Run `npm start` to start the server. The server's URL will be [localhost:9000](http://localhost:9000/).
5. Change into `/client` and run `npm install`. This is the front end application built in **React**.
6. Run `npm start` to start it up. The application's URL will be [localhost:3000](http://localhost:3000/). It should open in a browser automatically.


## Usage

Try typing in the box to filter the results! Try it at different screen sizes! Try not to share the repo on Reddit!

If you have any problems, send me an email. If you're supposed to be here, you probably already have my contact info.


## How it Works

When the page is first loaded a request is made to `/get-api-data` which pulls real data from the Spotify API. In production, I suspect you would want to do this with a CRON job. This script will save the response data to a JSON file. Again, in production I think you might want to save this in a database of some kind. Either way it fulfills the goal of caching the data to avoid rate limiting problems.

Once the data is ready, the front end makes a second request to `/get-data` which loads the data from the JSON file, filters it if there were any search terms, and alphabetizes it by album title before returning the response.


## Developer's Notes

I wanted to challenge myself a bit with this one and use it as an opportunity to improve my skills with React and Node, and learn new things. I've got more experience with LAMP stacks and WordPress sites than I do with React and Node/Express, but so far I've been enjoying full stack Javascript development. I like that I've been able to create some fast web applications by bringing my past JS/HTML/CSS experience together with more modern technologies that enable a more streamlined and stable development process.

As mentioned in step 2 above, I set this up to use environment variables for the API keys and the `/api/.env` file isn't committed to the repo. The front end will still work because the cached data file is in there.
