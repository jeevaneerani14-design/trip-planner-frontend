# Trip Planner & Smart Expense Splitter

## Run locally

From this folder, install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

The frontend expects the Spring Boot API at `http://localhost:8080/api` by default. Set `VITE_API_URL` in a local `.env` file to use a different API URL.

## Trip itinerary suggestions

New trips require a destination and start/end dates. Creating a trip also adds a dated starter itinerary. Kerala trips use a Kochi-Munnar-Alappuzha route; other destinations receive a flexible local-exploration outline. Review opening hours, transport, weather, and access conditions before relying on suggested activities. Itinerary items can be edited or deleted from the trip's Itinerary page.
