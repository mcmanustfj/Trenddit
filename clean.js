var trendingClass = "_5my7 _2snq"
var listItemClass = "_4qzh"

var links = [];
var linknames = [];



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
				index = listitem.parentNode.parentNode.dataset.position;
				newlink.href = links[index-1];
				newlink.appendChild(document.createTextNode(linknames[index-1]));
				listitem.parentNode.replaceChild(newlink, listitem);
			});
			
        }
    });
	
	trending=document.getElementsByClassName(trendingClass);
	
	
}


function parseHTML() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', "https://www.reddit.com/r/all/hot.json", true);
	xhr.send();
	 
	xhr.onreadystatechange = processRequest;
	 
	function processRequest(e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(xhr.responseText);
			//alert(response.ip);
			_.each(response.data.children, function(post) {
				console.log(post)
				linknames.push(post.data.title);
				links.push(post.data.permalink);
			});
		}
	}
	
}
parseHTML();
cleanNewsFeed(); // run once on page load

// debounce the function so it's not running constantly
var scrollBuzzkill = _.debounce(cleanNewsFeed, 300);



document.addEventListener("scroll", scrollBuzzkill);
