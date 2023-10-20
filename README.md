# EASY DOWNLOAD

## API Endpoints:

- ### GET: `/search`

  **Description**: The `/search` API allows users to search for videos on YouTube by providing search queries. It returns a list of relevant video results based on the user's query. Users can specify search parameters such as `keywords`, `filters`, `videoType`, and `sorting options` to refine their search results. This API provides a seamless integration of YouTube video search functionality into your application, making it easy for users to discover and access videos from the vast YouTube library.

  #### Query Parameters

  - `q`: (string) The search query or sentence used to find relevant videos on YouTube.
  - `limit` (_optional_): (integer) The maximum number of search results to return. You can specify the number of results you want to receive.
  - `videoType` (_optional_): The videoType parameter lets you restrict a search to a particular type of videos.
    Acceptable values are:
    - `any` – Return all videos.
    - `episode` – Only retrieve episodes of shows.
    - `movie` – Only retrieve movies.
  - `order` (_optional_): The order parameter specifies the method that will be used to order resources in the API response. The default value is `relevance`.
    - `date` – Resources are sorted in reverse chronological order based on the date they were created.
    - `rating` – Resources are sorted from highest to lowest rating.
    - `relevance` – Resources are sorted based on their relevance to the search query. This is the default value for this parameter.
    - `title` – Resources are sorted alphabetically by title.
    - `videoCount` – Channels are sorted in descending order of their number of uploaded videos.
    - `viewCount` – Resources are sorted from highest to lowest number of views. For live broadcasts, videos are sorted by number of concurrent viewers while the broadcasts are ongoing.

  #### Request

  - GET `/search?q=example&limit=2`

  #### Response

  ```json
  {
    "kind": "youtube#searchListResponse",
    "etag": "string",
    "nextPageToken": "string",
    "regionCode": "region",
    "pageInfo": {
      "totalResults": 1000000,
      "resultsPerPage": 2
    },
    "items": [
      {
        "kind": "youtube#searchResult",
        "etag": "etag-string",
        "id": {
          "kind": "youtube#video",
          "videoId": "videoId"
        },
        "snippet": {
          "publishedAt": "published date",
          "channelId": "channel id",
          "title": "video title",
          "description": "video description",
          "thumbnails": {
            "default": {
              "url": "default thumbnails img url",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "medium thumbnails img url",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "high thumbnails img url",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "channel title",
          "liveBroadcastContent": "is it live",
          "publishTime": "2023-09-28T12:00:11Z"
        }
      },
      {
        "kind": "youtube#searchResult",
        "etag": "etag-string",
        "id": {
          "kind": "youtube#video",
          "videoId": "videoId"
        },
        "snippet": {
          "publishedAt": "published date",
          "channelId": "channel id",
          "title": "video title",
          "description": "video description",
          "thumbnails": {
            "default": {
              "url": "default thumbnails img url",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "medium thumbnails img url",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "high thumbnails img url",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "channel title",
          "liveBroadcastContent": "is it live",
          "publishTime": "2023-09-28T12:00:11Z"
        }
      }
    ]
  }
  ```

- ### GET: `/download/:videoId`

  **Description**: This API endpoint allows users to download a video from YouTube by providing the `videoId` as a parameter. Upon a successful request, the API will respond with the video file for download.

  #### Query Parameters

  - `name` (optional): This parameter can be included in the query to specify the name to be used when sending the video file in the response. If provided, the video will be sent with the specified name.

  #### Request

  - GET `/download/your_video_id?name=my_custom_video_name.mp4`

  #### Response

  - returns a `blob` file
