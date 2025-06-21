# Stremio Addon: Arabic Mneizel

This document provides a comprehensive guide to setting up and running the 'Arabic Mneizel' Stremio addon. The addon is designed to stream content from `vidfast.pro` and is built using Node.js and the Stremio Addon SDK.

## 1. Prerequisites

Before you begin, you will need to have the following software installed on your Windows 10 machine:

-   **Node.js:** You can download and install Node.js from the official website: [https://nodejs.org/](https://nodejs.org/)
-   **Visual Studio Code:** While not strictly required, a code editor like Visual Studio Code is highly recommended for working with the project files. You can download it from here: [https://code.visualstudio.com/](https://code.visualstudio.com/)

## 2. Project Structure

The addon is contained within a single directory, `stremio-addon-arabic-mneizel`, which has the following structure:

-   `package.json`: This file defines the project's dependencies and scripts.
-   `server.js`: This is the main file for the addon's server. It contains the addon's logic and serves the manifest and stream information to Stremio.
-   `.env`: This file stores your TMDB API key.
-   `README.md`: This file, which you are currently reading.

## 3. Setup and Installation

1.  **Get a TMDB API Key:** You will need a TMDB API key to fetch movie and series information. You can get a free API key by creating an account on the TMDB website: [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup)
2.  **Download the addon:** You can download the addon files as a ZIP archive and extract them to a location of your choice on your computer.
3.  **Install dependencies:** Open a command prompt or terminal in the `stremio-addon-arabic-mneizel` directory and run the following command to install the required Node.js modules:

    ```
    npm install
    ```

4.  **Add your TMDB API Key:** Open the `.env` file and replace `your_tmdb_api_key` with your actual TMDB API key.
5.  **Start the addon server:** Once the dependencies are installed and you have added your API key, you can start the addon server by running the following command:

    ```
    npm start
    ```

    You should see a message in the console indicating that the addon is running on port 3000.

## 4. Testing the Addon

To test the addon, you will need to add it to Stremio. You can do this by following these steps:

1.  Open Stremio.
2.  Click on the addon manager icon (the puzzle piece) in the top right corner.
3.  In the addon search bar, enter the following URL:

    ```
    http://127.0.0.1:3000/manifest.json
    ```

4.  Click on the "Install" button.

Once the addon is installed, you should see new catalogs called "Arabic Movies" and "Arabic Series" in Stremio. When you select a movie or series from these catalogs, the addon will provide the streaming URL from `vidfast.pro`, and Stremio will start playing the content.

## 5. Troubleshooting

-   **Addon not starting:** If the addon server fails to start, make sure you have Node.js installed correctly, that you have run `npm install` to install the dependencies, and that you have a valid TMDB API key in your `.env` file.
-   **Addon not appearing in Stremio:** If the addon does not appear in Stremio after you have installed it, make sure the addon server is running and that you have entered the correct URL in the addon manager.
-   **Content not playing:** If the content is not playing, there may be an issue with the `vidfast.pro` service. You can try opening the streaming URL directly in your browser to see if it is working.
-   **Empty catalogs:** If the catalogs are empty, make sure your TMDB API key is correct and that you have a stable internet connection.
