# API guide

## GET /api/stations

Returns all the stations. Returns 200 stations at a time. It is the default setting.

### URL parameters

api/stations?page=1&limit=100

- page - defines pagination page
- limit - defines how many entries should be fetched (default 200, max can be changed in the evironment variable)

/api/stations?search=puotila&language=finnish

- search - defines the search word
- language - defines the language in which the names are searched with4 (options are finnish, swedish and english). Default is finnish
