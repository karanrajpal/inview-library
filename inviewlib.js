/* Parameters to inViewLibrary function - 
   cardContainerId | required | ID of the container with fixed height.
   cardSelector    | required | Classname of each repeatable item.
   callbacks       | optional | Callbacks object. You can specify 2 functions in an object with 2 properties
                                1. inView - will be called when an item which has class cardSelector moves into the viewport
                                2. outView - will be called when an item which has class cardSelector moves out of the viewport
   config          | optional | Config object to change the default behaviour. You can specify only the ones you want to override.
                                1. startLimit
                                2. endLimit
                                3. direction
                                4. period
    Public APIs : getInViewElements - Returns the array of items that are currently in view.
    Authors : Radhika Bhanu and Karan Rajpal
*/
function inViewLibrary( cardContainerId, cardSelector, callbacks, config ) {
    var lastCalledAt = 0;
    var cardContainer = document.querySelector(cardContainerId);
    var cardList = cardContainer.querySelectorAll(cardSelector);
    var inViewArray = Array.apply(null, new Array(cardList.length)).map(Number.prototype.valueOf,0);
    var settings = {
        startLimit: config.startLimit || config.direction == 'vertical' ? getOffset(cardContainer).top : getOffset(cardContainer).left,
        endLimit: config.endLimit || config.direction == 'vertical' ? getOffset(cardContainer).bottom : getOffset(cardContainer).right,
        period: config.period || 100,
        direction: config.direction || 'vertical',
        startProperty : config.direction == 'vertical' ? 'top' : 'left',
        endProperty : config.direction == 'vertical' ? 'bottom' : 'right',
        cardDimensionProperty : config.direction == 'vertical' ? 'offsetHeight' : 'offsetWidth'
    };
    
    cardContainer.addEventListener('scroll',function(e){
        var date = new Date();
        var calledAt = date.getTime();
        if(calledAt-lastCalledAt>settings.period) {
            calculateInView();
            lastCalledAt = calledAt;
        }
    });

    function getOffset(el) {
        var rect = el.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            bottom: rect.bottom,
            right: rect.right,
            width: rect.width,
            height: rect.height
        }
    };

    var calculateInView = function() {
        for (var i = 0, cardsLength = cardList.length; i < cardsLength; i++) {
            var card = cardList[i];
            var cardIndex = i;
            var offset = getOffset(card);
            if ((offset[settings.startProperty] + card[settings.cardDimensionProperty]/2) >= settings.startLimit && (offset[settings.startProperty] + card[settings.cardDimensionProperty]/2) <= settings.endLimit) {
                if (inViewArray[cardIndex]===0) {
                    inViewArray[cardIndex]=1;
                    if(typeof callbacks !== 'undefined' && typeof callbacks.inView === 'function') {
                        callbacks.inView(card);
                    }
                }
            } else {
                if (inViewArray[cardIndex]===1) {
                    inViewArray[cardIndex]=0;
                    if(typeof callbacks !== 'undefined' && typeof callbacks.outView === 'function') {
                        callbacks.outCard(card);
                    }
                }
            }
       }
    };
    var getInViewElements = function(){
        var inViewElements = [];
        for (var i = 0; i < inViewArray.length; i++) {
            if(inViewArray[i]===1) {
                inViewElements.push(cardList[i]);
            }
        };
        return inViewElements;
    };
    this.getInViewElements = getInViewElements;
    calculateInView();
}