var trendingClass = "_5my7 _2snq"
var listItemClass = "_4qzh"

var DEBUG = true;
var DEBUG_DOMAIN = "athletics.bowdoin.edu"; // for testing
var DEBUG_TERM = "trump"; // for testing

var links = ["link1", "link2", "link3", 4, 5, 6, 7, 8];
var linknames = ["text1", "text2", "text3", 4, 5, 6, 7, 8];


function cleanNewsFeed(){

    chrome.storage.sync.get("clean_news_feed", function(data){
        if (data["clean_news_feed"]){
            // find all potential posts
           // _.each(storyContainerClasses, function(storyContainerClass){
          //      posts = document.getElementsByClassName(storyContainerClass);
           //     _.each(posts, function(post){
           //         removeLinks(post);
          //          removeTerms(post);
          //      });
          //  });
			
			trending=document.getElementsByClassName(trendingClass)[0];
			trendlist = trending.getElementsByClassName(listItemClass);
			_.each(trendlist, function(listitem) {
				var newlink = document.createElement("a");
				index = listitem.parentNode.parentNode.parentNode.dataset.position
				newlink.href = links[index-1];
				newlink.appendChild(document.createTextNode(linknames[index-1]));
				listitem.parentNode.replaceChild(newlink, listitem);
			});
			
        }
    });
	
	trending=document.getElementsByClassName(trendingClass);
	
	
}
cleanNewsFeed(); // run once on page load

// debounce the function so it's not running constantly
var scrollBuzzkill = _.debounce(cleanNewsFeed, 300);
document.addEventListener("scroll", scrollBuzzkill);
