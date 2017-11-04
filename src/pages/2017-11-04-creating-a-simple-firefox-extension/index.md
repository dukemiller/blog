---
path: "/creating-a-simple-firefox-extension"
date: "2017-11-04T00:00:00.000Z"
title: "Creating A (Simple) Firefox Extension"
tags: ['guide', 'experience', 'extension']
---

I've always been curious about creating browser extensions, but I haven't really had the need to change or alter any browser behavior myself. You could say that's from a lack of creativity, but I feel like that I learn the most when I create something that I would continually use, and it would be hard to force myself to think of something that I'd use inorganically. I've gotten used to the memory hog web browser and navigating around sites in the ways that I've become accustomed, but I finally had a use case that (while I could have probably found another extension to do it) would allow me to dip my feet into creating an extension, and get a very general idea of how the development process would go.

My project would be using the latest recommended standard of browser plugin design written using **JavaScript**, just simply called 'Web Extensions'. [Specifically, I'm following Mozilla's documentation](https://developer.mozilla.org/en-US/Add-ons/WebExtensions). _You can find resources I used for **every part of creating this extension** at the bottom. You can find the source code to this project [available here](https://github.com/dukemiller/straight-to-videos) and the download link to the plugin itself [here](https://addons.mozilla.org/en-US/firefox/addon/straight-to-videos/)._

### Simple drafting

So, here's my very simple premise for a starter project: On any YouTube video page, I would like to change the `href` url on clicking the channel's username from `youtube.com/channel/{username}` to `youtube.com/channel/{username}/videos`. Wow, that's so simple that it barely needs an extension right? But, take a second and think of the steps that you believe would be necessary to accomplish this. 

If you're familiar with JavaScript, you'd think it would just be: select the correct element, change `href` attribute. Maybe since you're using a new framework there'd be some sort of hook for pre-processing a page that you might need to figure out or something, but besides that it would be mostly straightforward. With the knowledge that the script would run once every time you open a matching YouTube url, in JavaScript it'd probably look something like:

```js
const node = document.querySelector("#owner-name > a:nth-child(1)");
const href = node.getAttribute("href");
node.setAttribute("href", href + "/videos");
```

### The reality

A little chunk of the web uses single page application architectures for their front-end, and youtube is such a site. The page never "changes" in the way that the content of the page is dumped and a new request to replace it all is made, instead pieces are requested and the view framework adds or swaps them in so that the page never feels like it loads. Because of there being no "hard" reloads, the extension is only ever going to get run once on any visit to youtube. From that, I would have to design around locating where you are when you initially load the page and how you might transition to another state from there, adding a little more work. 

How would I solve that problem on a single load? My initial idea was to hook onto something like `DOMNodeInserted` and continually parse the returned inserted nodes until a node matches what I would expect the video page to be. We'd maybe have something like this as our main function (because remember, this will only get ran once):

```js
if (on_a_video_page()) {
    const node = document.querySelector("#owner-name > a:nth-child(1)");
    change_the_href(node);
}

else {
    document.body.addEventListener('DOMNodeInserted', (e) => {
        if (is_correct_node(e.data)) {
            change_the_href(e.data);
        }
    });
}
```

But that wasn't my only issue, **changing the** `href` **in the** `a` **tag didn't change where you got redirected on click**; I can only assume that the framework manages the internal state of the application behind the scenes and is strictly one-way binded with a few event handlers using the initial given value. Middle-clicking to open the page on a new tab worked, but I wanted the functionality of just clicking a username to go straight to their videos page as that was the entire point of the extension.

---

### Initial attempt

Seeing how the page worked and how heavily tied it is to events in their framework, to fix the `href` issue my first idea was to strip all event handlers from the node containing the username by doing a deep copy of the node and its children. This worked ... until you loaded another video. The information on the first visited video you loaded **would stay there and remain unchanged for any other videos watched** (probably because I got rid of the event handling that would change it). 

Through investigating more on how youtube's view framework holds and loads their templates for any page, I mostly came to observe these rules in place through using the **Firefox DOM Inspector**:

**1 -** If the node doesn't exist (i.e. you first load a page that isn't a video) then it won't be created until you first go to a video page.  

**2 -** If the node that contains the username exists, it will continue to exist and will not be removed.  

**3 -** If the node that contains the username on the page exists and you transition to a page that isn't a video, then that value stays in the DOM in the background and doesn't change.  

**4 -** If the node that contains the username exists and you transition to another video, the existing values are updated.

### Escaping the Framework

Not the most complicated set of rules, but even knowing how the information is kept there's no way I was going to figure out how the framework passes information along to individual components and cleanly request updates on it myself (if that's even possible, or at least it would be out of scope for what I was trying to create). Instead of trying to play nice, I decided the somewhat simple solution would just be just to create another event for `onclick` that would **stop any propagation to other events** then simply redirect to the page in the (corrected) `href`.

Canceling the events was simple, `e.stopPropagation();` with an `e.preventDefault();` in there just for good measure stopped any redirection on clicking the username `a` element. Looking through the Web Extensions API, I searched high and low for any sort of method that would allow a redirect of the current tab to another page, because while I was aware that just setting `location.href = 'some place';` would work in vanilla JavaScript, I couldn't actually get this to work reliably in the context of a web extension. From my search I figured it would be in the [Tabs API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs), specifically [the update method on the Tabs API](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/update)  

### Observing change 

While I gained a strategy for handling the `onclick`, I still needed a better strategy for parsing nodes to know when to apply the listener and the function to change the nodes `href`. While searching more on how to check specifically when an attribute change to a `DOMNode` happens or if children nodes are added, I found [this recommending use of **MutationObserver**](https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists) . I incorporated it into my work through a little bit of experimentation, it has a small bit of 'reactive extensions' style usage in its API and I had to figure out what exactly gets added or not on the subscription event of the observer. 

From finding that API, I would create two types of mutation observers. The first type of observer would observe for changes in attributes on a specific given node, and when any instance of a mutation happens I would change the `href` to have '/videos' concatenated on it and to apply the `onclick` event listener on it. The second type is for when the username node doesn't currently exist, and for that I would observe `document.body` and when given a node with children I would look through every child node of that node. On the search, I would scan every added node with a simple function check of `isCorrectNode` to see if it's the username node that I'm expecting.

After the correct node would be found, I would `observer.disconnect()` to stop the (probably) expensive computation of checking every added node from that point forward and apply the first mutation observer on that node. All that's left is the `main()` function logic, which is basically just: if the node exists, observe changes to it and apply the transforming functions on any change, otherwise observe the body until that node exists.

### Final thoughts

And so, after doing all that, I load up a few pages and try it out, and: wow, it finally works. As far as I can tell, this covered most potential states you would transition to while on the page and have not had any issue thus far using the extension myself. I've listed the resources and small notes on them below for what I used for learning extensions, so I hope any of this is helpful to develop your own extension if you choose to make one.

---

# Resources used and notes

#### Important Mozilla Developer Pages

I had to spend a good portion of time just reading these examples and creating small samples to mess around with to understand the API. Mostly I had to figure out setting up a development environment, the difference between `content-script.js` style scripts and `background.js` style scripts, when the scripts are called, and what libraries I'm allowed to use in my current context.

\- [Introduction](https://developer.mozilla.org/en-US/Add-ons/WebExtensions)  
\- [Getting started](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Getting_started_with_web-ext)  
\- [The 'content script', a primary actor in web extensions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Content_scripts)  
\- [Match patterns, the 'when' on calling the content scripts](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Match_patterns)  
\- [Communicating content scripts to 'background' scripts](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Content_scripts#Communicating_with_background_scripts)  

Background scripts are where most of the web extensions API lies: you do not have access to most of the library using only content scripts. The API states this on their main pages, but it slipped my mind and I attempted to use some methods in the `content-script.js`. Instead of getting an error stating that they don't exist in the current context, those methods are simply unusable returning as  `undefined`. I had wondered WHY they were undefined and searched up some pages telling me basically what the library pages say, they are only for use in background scripts.

\- [StackOverflow 1](https://stackoverflow.com/questions/42408935/firefox-webextension-apis-browser-is-not-defined)  
\- [StackOverflow 2](https://stackoverflow.com/questions/40996014/typeerror-api-is-undefined-in-content-script-or-why-cant-i-do-this-in-a-cont)  

#### Mutation Observer

Not actually too complicated to use and modify for your own purposes, even if you're completely unfamiliar with them. I don't know about their resource cost compared to other methods (if there are any comparable methods), but their simplicity in design and use was great and there were plenty of examples so I barely had to sit and 'learn' the API and went straight into testing and using.

\- [General use and example of Mutation Observer](https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/)  
\- [Mozilla developer page about it](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)  
\- [Properties for an initializer object](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver#MutationObserverInit)  
\- [Simple example on StackOverflow](https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists)  


#### Web extension project examples

Reading documentation is great and all, but just seeing the examples used in practice is the easiest way for me to understand their use.

\- [background.js and content-script.js use](https://github.com/mdn/webextensions-examples/tree/47a9c3b34b85453240bcb373b5e2a3a5faa94163/embedded-webextension-sdk/step1-hybrid-addon/webextension)  
\- [simple message passing to change tab in background.js](https://github.com/mdn/webextensions-examples/blob/47a9c3b34b85453240bcb373b5e2a3a5faa94163/embedded-webextension-sdk/step1-hybrid-addon/webextension/content-script.js)  
\- [background.js responding to a message sent](https://github.com/mdn/webextensions-examples/blob/47a9c3b34b85453240bcb373b5e2a3a5faa94163/embedded-webextension-sdk/step1-hybrid-addon/webextension/background.js)  

#### HTML & JS syntax and grammar

Because I don't remember everything all the time. 

\- [Click event properties](https://developer.mozilla.org/en-US/docs/Web/Events/click)  
\- [JS ES5 string.Contains() equivalent](https://stackoverflow.com/questions/4597050/how-to-check-if-the-url-contains-a-given-string)  