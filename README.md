# SQL Library Manager

This project mainly uses Sequelize and Express to read and display database data on a website.
User can use the site to create, read, update, and delete (CRUD) the data in the database.

Setup instructions:
1. Download repository
2. Run npm install
3. Run npm start
4. In browser, go to localhost:3000

On localhost:3000, you should see a list of books.
You can create a new book or update details on an existing book.
From the update book page, can also delete an existing book.
When creating or updating a book, Title and Author fields cannot be blank.
Also, the Year field must be numeric.
If there are any issues with the field values, errors will be displayed.
