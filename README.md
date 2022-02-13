# NestJS, Svelte and SQlite application
This is just a very basic app I made to practice a bit and dust off my NestJs knowledge. I wanted to make something small using SQLite, so a very tiny app using Svelte made sense. This is my first time using it, and its quite limited since its being used as a render engine for views, a traditional part of the MVC architecture.

# Dependencies
You can check them out at package.json, but we are just using all nestjs packages, with the exception of sqlite3, dayjs and swagger-ui-express

The front end uses a couple of dependencies via cdns, such as the gallery and the fullpage plugin.

# Endpoints
You can find the available endpoints at `/api-docs`

# Auth
This is really basic, set your password at the .env using the `GUARD_PASS=header_password_to_upload` key pair.
For auth marked endpoints, just send in a Header with the `Authorization: header_password_to_upload` pair and your done.
This is just a Guard module found at the `auth.guard.ts` file.

# The db 
To download it just use the path `/db/:your-db-name`

# Image Upload
To upload images you need a IMGUR client ID. Make an account and enable API access for that account. So any image you upload will be related to your account. The Imgur Client ID is set at the `.env` file