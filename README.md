## Screenshot
![Promotional screenshot](screenshots/promo.webp)

## Build Steps
1. Generate the API server and SQL queries
    ```
    go generate
    ```
2. Build the frontend application 
    ```
    npm --prefix app install
    npm --prefix app run build
    ```
3. Build the project
    ```
    go build -o ./tmp/main
    ```

## Running the Application
Assuming you want to run the binary directly from the repository:

1. Download the DB schema migration tool [atlas](https://atlasgo.io/docs)
   ```
   curl -sSf https://atlasgo.sh | sh
   ```
2. Copy the .env file and provide values for any empty variables
    ```shell
    cp .env.example tmp/
    ```
3. Start the server
    ```
    ./tmp/main
    ```
3. Open the [frontend](http://localhost:8080) or browse the [API](http://localhost:8080/api/docs)
