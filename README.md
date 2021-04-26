# Static Node.js and Express Site
## techdegree-project-6

## Home
![image](https://user-images.githubusercontent.com/63255333/116013968-31901080-a633-11eb-816c-46e21d6df73a.png)

## About
![image](https://user-images.githubusercontent.com/63255333/116013995-4a98c180-a633-11eb-8df6-9c6e7ba92a99.png)

## About the project
In this project I used Node.js, Express and Pug templates to create a portfolio site to show off my projects.

## Tech Stack
* Node.js
* Express
* Pug templates

## Example Code

### Rendering pug template 
This function is called when there is a get request which is calling the route "/"
With "redner" the pug-template "index" is searched for in the folder "view" and then it will execute the file
The second argument in the render function passes the array projects to the pug file
```javascript
app.get("/", (req, res) => {
  res.render("index", { projects: projects });
});
```

### Middleware
 * In order to ensure that, for example, an easily readable error appears 
   when a page call is made to a non-existent subpage, this middleware  generates a 404 error.
   The error middleware is then added behind this middleware. 
 * Normally, a Rout handler would be used first and the program would not run through to this point 
   due to the response sent.  
 * But if no corresponding Rout is found, the program runs through to this point and generates the 404 error 
   and outputs it via the following error middleware.
   
```javascript
app.use((req, res, next) => {
  const err = new Error("Not found!");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(`The pages does not exist (${err.status} - ${err.message}) `);
  res.status(err.status);
  res.render("error", { error: err });
});
```

### PUG-Template 
```pug
extends layout.pug

block content 
  article.grid-container.portfolio-intro
    div

   
      h1 Portfolio

      
      p.lead.text-light
        | My Fullstack JavaScript Projektcs
  article.grid-container.portfolio-index
    
    .grid-x.grid-margin-x.small-up-2.medium-up-2.large-up-3



      //- uses the Pug each iteration to create the thubmnails for the projects
      each project in projects
        .cell
          a(href=`/project/${project.id}`)
            img.thumbnail(src=`${project.image_urls[0]}`)
            h5= project.project_name

```
