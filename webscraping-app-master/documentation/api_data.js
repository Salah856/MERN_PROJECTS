define({ "api": [
  {
    "type": "put",
    "url": "/api/webscraping/start",
    "title": "Start Webscraping",
    "version": "1.0.0",
    "name": "startWebscraping",
    "group": "Webscraping",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Returns true if success, false if not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Returns message results.</p>"
          }
        ]
      }
    },
    "filename": "server/routes/api/webscraping.js",
    "groupTitle": "Webscraping"
  },
  {
    "type": "put",
    "url": "/api/webscraping/stop",
    "title": "Stop Webscraping",
    "version": "1.0.0",
    "name": "stopWebscraping",
    "group": "Webscraping",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>Returns true if success, false if not.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Returns message results.</p>"
          }
        ]
      }
    },
    "filename": "server/routes/api/webscraping.js",
    "groupTitle": "Webscraping"
  }
] });
