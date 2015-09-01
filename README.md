###InView Library  
Pure JS Library that lets you figure out which elements are in view.
Provides a callback for when elements come into view or go out of view.

####**Parameters to inViewLibrary function  
   **cardContainerId** | required | ID of the container with fixed height.  
   **cardSelector**    | required | Classname of each repeatable item.  
   **callbacks**       | optional | Callbacks object. You can specify 2 functions in an object with 2 properties  
                                1. inView - will be called when an item which has class cardSelector moves into the viewport  
                                2. outView - will be called when an item which has class cardSelector moves out of the viewport  
   **config**          | optional | Config object to change the default behaviour. You can specify only the ones you want to override.  
                                1. startLimit  
                                2. endLimit  
                                3. direction  
                                4. period  
    Public APIs : getInViewElements - Returns the array of items that are currently in view.  
