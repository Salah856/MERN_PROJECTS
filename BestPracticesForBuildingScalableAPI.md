# Application Planning Phase - Why do it

While developing software there are many moving parts that the developers have to manage. It is very easy for things to go wrong. With so many uncertainties and roadblocks, one thing that you don't want is exceeding the time taken.

This is something the planning phase can save you from. In this phase, you lay down every detail your app would have. It is much easier to predict the time it will take to build these small individual modules in front of you as compared to picturing the whole thing in your head.

If you have multiple developers working on this large project (which you will), having this document will make it much easier to communicate with each other. In fact, things from this doc can be assigned to developers, this will make it much easier for everyone to know what others are working on.

And lastly, because of this doc, you’ll have a very good sense of your own progress on the project. It is very common for developers to switch from one part of the app they’re working on to the other and come back to it much later than they would like to.

## Step 1: Views and Components
We need to determine the look and functionality of each view in the app. One of the best approaches is to draw each view of the app either using a mockup tool or on paper, this will give you a good idea of what information and data you're planning to have on each page.


![image9](https://user-images.githubusercontent.com/23625821/119344346-d71cbb00-bc97-11eb-95c8-a60a35ce6488.png)

In the mockup above, you can easily see the child and parent containers of the app. Later on, the parent containers of these mockups will be the pages of our app and the smaller items will land in the component folder on our application. After you have drawn out the mockups, write the names of pages and components within each of them.

## Step 2: In-app actions and events
After deciding on components, plan out what actions would be performed within each of them. Those actions would later be dispatched from within these components

Consider an e-commerce site with a list of featured products on the homescreen. Each item on that list would be an individual component in the project. Let the name of the component be ListItem.

## Step 3: Data and models
Every component of the app has some data associated with it. If the same data is being used by multiple components of the application, it will be part of the centralized state tree. The state tree will be managed by redux.

This data is used by multiple components, hence when it is changed at one place other components reflect the changed value too.

Make a list of such data in your application as this will constitute the models of the app, and based on these values you'll create your app’s reducers.


```javascript 
 products: {
  productId: {productId, productName, category, image, price},
  productId: {productId, productName, category, image, price},
  productId: {productId, productName, category, image, price},
}
```

Consider the example of the e-commerce store above. The type of data being used by the featured section and the new arrivals section is the same, which is products. So that would be one of the reducers of this e-commerce app.

After documenting your plan of action, it's time to look at some details necessary to setup the app’s data layer, covered in the next section.

## Actions, Datasource and API
As the app grows, it is very common for the redux store to have redundant methods and improper directory structure, and it becomes hard to maintain or update.

Let’s see how we can realign some things to make sure the code of the redux store stays clean. A lot of trouble can be saved by making modules more reusable from the very beginning, although this can seem like trouble at first.

## API design and client apps
While setting up the datastore, the format in which data is received from the API affects the layout of your store a lot. Often times it is necessary to format it before it can be fed to the reducers.

There's a lot of debate surrounding what should and shouldn't be done while designing API. Factors such as Backend Framework, Size of the APP further affect how you design your API.

Just like you would in a backend app, keep utility functions like formatters and mappers in a separate folder. Make sure these functions are free of side effects 

```javascript 
export function formatTweet (tweet, author, authedUser, parentTweet) {
  const { id, likes, replies, text, timestamp } = tweet
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    text,
    avatar: avatarURL,
    likes: likes.length,
    replies: replies.length,
    hasLiked: likes.includes(authedUser),
    parent: !parentTweet ? null : {
      author: parentTweet.author,
      id: parentTweet.id,
    }
  }
}
``` 

In the above snippet, formatTweet function inserts a new key parent to the tweet object of the frontend app and returns data based on parameters, without affecting outside data.

You can take it a step further by mapping the data to a predefined object whose structure is specific to your frontend app and has validations for some keys. Let's talk about the parts that are responsible for making the API calls.

## Datasource design patterns
The parts I describe in this section will be directly used by redux actions, to modify the state. Depending on the size of the app (and also the time you have) you can go about setting the datastore in one of the two ways.

1. Without Courier
2. With Courier

#### Without Courier

Arranging your datastore this way requires you to define GET, POST, PUT requests separately for each model.

![image12](https://user-images.githubusercontent.com/23625821/119345147-c7ea3d00-bc98-11eb-870a-6e74ab9681f8.jpg)


In the above diagram, each component dispatches actions that call methods of the different datastores. This is what the updateBlog method of the BlogApi file would look like.
```javascript
function updateBlog(blog){
   let blog_object = new BlogModel(blog) 
   axios.put('/blog', { ...blog_object })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
```

This approach saves time... At first, it also lets you make modifications without worrying too much about side effects. But there’ll be a lot of redundant code, and performing bulk updates is time-consuming.

#### With Courier

This approach makes things easier to maintain or update in the long run. Your codebase stays clean as you are saved the trouble of making duplicate calls via axios.


![image1](https://user-images.githubusercontent.com/23625821/119345327-067ff780-bc99-11eb-865f-a84071afaebc.png)


However, this approach takes time to set up initially.  You have less flexibility.  That’s kind of a double edged sword because it prevents you from doing something unusual.

```javascript 
export default function courier(query, payload) {
   let path = `${SITE_URL}`;
   path += `/${query.model}`;
   if (query.id) path += `/${query.id}`;
   if (query.url) path += `/${query.url}`;
   if (query.var) path += `?${QueryString.stringify(query.var)}`;
   

   return axios({ url: path, ...payload })
     .then(response => response)
     .catch(error => ({ error }));
}
```

Here’s what a basic courier method would look like, all the API handlers can simply call it, by passing the following variables:

1. A query object that would contain the URL related details like name of the model, query string and others.
2. Payload, which contains request headers and body.


## API calls and In-app actions
While working with redux, one thing that stands out is the usage of predefined actions. It makes the changes in data throughout the app, much more predictable.

Even though it may seem like a lot of work - to define a bunch of constants in a large app, Step 2 of the planning phase makes it a whole lot easier.

```javascript
export const BOOK_ACTIONS = {
   GET:'GET_BOOK',
   LIST:'GET_BOOKS',
   POST:'POST_BOOK',
   UPDATE:'UPDATE_BOOK',
   DELETE:'DELETE_BOOK',
}

export function createBook(book) {
   return {
      type: BOOK_ACTIONS.POST,
    	book
   }
}

export function handleCreateBook (book) {
   return (dispatch) => {
      return createBookAPI(book)
         .then(() => {
            dispatch(createBook(book))
         })
         .catch((e) => {
            console.warn('error in creating book', e);
            alert('Error Creating book')
         })
   }
}

export default {
   handleCreateBook,
}
```

The above code snippet shows an easy way to blend in methods of our data source createBookAPI with our redux actions. The handleCreateBook method can be passed to the dispatch method of redux safely.

Also, note that the above code lives in the actions directory of our project, we can similarly create javascript files containing the name of the actions and handlers for various other models of our app.


## Redux Integrations
In this section, I’ll discuss how the functionality of redux can be extended to take care of more complex operations of the app, systematically. These are the things that if implemented poorly can break the pattern of the store.

Javascript generator functions are able to solve many problems associated with async programming since they can be started stopped at will. The Redux Sagas middleware uses this concept for managing impure aspects of the app.

## Managing impure aspects of the app

Consider a scenario. You are asked to work on an app for a real-estate discovery. The client wants to move to a new and better website. The REST API is in place, you’ve been given the design of each page on Zapier and you have drafted a plan as well, however calamity strikes.

The CMS client has been used by their company for a very long time, they're very familiar with it, and thus do not wish to change to a new one just to write blogs.  In addition, copying all the old blogs would be a hassle.

Fortunately, the CMS has a readable API that gives you the blog content.  Unfortunately, if you've written a courier, the CMS API is on another server that has different grammar.

This is kind of an impure aspect of the app since you're accommodating a new API used for simply fetching the blogs. This can be handled by using React Sagas.

Consider the following diagram.  We are fetching blogs in the background using Sagas.  This is what the entire interaction would look like.

![image6](https://user-images.githubusercontent.com/23625821/119345792-ab023980-bc99-11eb-8f3b-68e909b120e4.jpg)


Here the component makes a dispatch action say GET.BLOGS and in an app using redux middleware that request will be intercepted and in the background, your generator function will fetch the data from datastore and update redux.

Here’s an example of what a generator function of your blog sagas would look like. You can also use sagas to store user data (eg auth tokens) as it is another impure action.

```javascript 
function* fetchPosts(action) {
 if (action.type === WP_POSTS.LIST.REQUESTED) {
   try {
     const response = yield call(wpGet, {
       model: WP_POSTS.MODEL,
       contentType: APPLICATION_JSON,
       query: action.payload.query,
     });
     if (response.error) {
       yield put({
         type: WP_POSTS.LIST.FAILED,
         payload: response.error.response.data.msg,
       });
       return;
     }
     yield put({
       type: WP_POSTS.LIST.SUCCESS,
       payload: {
         posts: response.data,
         total: response.headers['x-wp-total'],
         query: action.payload.query,
       },
       view: action.view,
     });
   } catch (e) {
     yield put({ type: WP_POSTS.LIST.FAILED, payload: e.message });
   }
 }
```

