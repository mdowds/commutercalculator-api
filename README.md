# Commuter Calculator API

[![Build Status](https://travis-ci.org/mdowds/commutercalculator-api.svg?branch=master)](https://travis-ci.org/mdowds/commutercalculator-api)

This is the API that provides the backend for the [Commuter Calculator](https://github.com/mdowds/commutercalculator) application, which provides travel time and cost information for commuting into central London.

The API reads from a Google Cloud Firestore populated by the separate [commutercalculator-update](https://github.com/mdowds/commutercalculator-update) application and exposes two endpoints: 
* `/destinations` to provide a list of Zone 1 destinations
* `/journeys/to/{STATION_ID}` to provide the journey times and costs for a selected destination
