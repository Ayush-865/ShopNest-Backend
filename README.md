### Features to be Added
1] Need to Implement Put Api to update the profile photo and product image </br>
2] To create an auth system so that user can edit only their products </br>
3] To integrate **Google OAuth** for Sign In with Google  </br>
4] Need to integrate Cloudinary as base64 is not the most efficient image storing method

### Features 
1] Using **JSON WEB Token** for creating a secured Login and SignUp system </br>
2] Using bcrypt library for hashing of password via salt and pepper </br>
3] MiddleWares to get user id from signed JWT </br>
4] Used **express-validator** to validate the responses </br>
5] **mongoose** to connect to a Mongo Atlas </br>
6] For Image Storing in MongoDB the image is first converted to base64 format and request is fetched from Frontend and stored in DB using .create() func </br>
7] The Products are updated by getting req of _id via req.params._id </br>
8] Basically used CRUD operations to create all the API's </br>

### Hosting
Used Render
