# Codexa Problem Service



________________________________


## How routing is working in the porject

 - /api/v1/problems/ping
    - because the route starts with /api
        /api             -> /v1          -> /problems              -> /ping
        apiRouter->          v1Router->      problemRouter->           problemController->          Service Layer