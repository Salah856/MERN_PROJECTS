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
