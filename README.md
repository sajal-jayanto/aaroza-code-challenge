# aaroza-code-challenge

#### Live link https://aaroza-code-challenge.herokuapp.com/

#### For Singup https://aaroza-code-challenge.herokuapp.com/api/user/signup (POST)
   
```json
{
  "username" : "Your username",
  "password" : "your password"
}
```

#### For login https://aaroza-code-challenge.herokuapp.com/api/user/login (POST)
   
```json
{
  "username" : "Your username",
  "password" : "your password"
}
```

#### For the actors list https://aaroza-code-challenge.herokuapp.com/api/actors (GET)

#### For the actors list https://aaroza-code-challenge.herokuapp.com/api/movies (GET)

```json
   Login in first 
```

#### For Create a Movie https://aaroza-code-challenge.herokuapp.com/api/movies (POST)

```json
{
  "title": "Mission: Impossible – Fallout",
  "year": 2018,
  "rating": 7.8,
  "actors": [
      {
          "name": "Tom Cruise",
          "birthday": "1962-05-02T18:00:00.000Z",
          "country": "United States"
      },
      {
          "name": "Henry Cavill",
          "birthday": "1982-05-04T18:00:00.000Z",
          "country": "Jersey"
      },
      {
          "name": "Simon Pegg",
          "birthday": "1970-02-13T18:00:00.000Z",
          "country": "United Kingdom"
      }
  ]
}
```
