var news;

var ViewModel = function() {
	var self = this;
	self.newsArticles = ko.observableArray();
	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

	var NewsItem = function(imageUrl,headline,author,description,timePosted,newsUrl,numVotes,numComments) {
		var self = this;
		self.imageUrl = ko.observable(imageUrl);
		self.headline = ko.observable(headline);
		self.author = ko.observable(author);
		self.description = ko.observable(description);
		var dt = new Date(timePosted);
		var formattedDate = monthNames[+dt.getMonth()] + ' ' + dt.getDate() + ', ' + dt.getFullYear();
		self.timePosted = ko.observable(formattedDate);
		self.newsUrl = ko.observable(newsUrl);
		self.numVotes = ko.observable(numVotes);
		self.numComments = ko.observable(numComments);
	};

	var jsonFetch = $.getJSON('http://www.freecodecamp.com/stories/hotStories', function(data) {
		news = data;
	}, 'json');
	$.when(jsonFetch).done(function() {
		news.sort(function(a, b) { return b.timePosted - a.timePosted || b.upVotes.length - a.upVotes.length; })
		.forEach(function(item) {
			var imageUrl = item.image || item.author.picture;
			var headline = item.headline;
			var author = item.author.username;
			var timePosted = item.timePosted;
			var newsUrl = item.link;
			var numVotes = item.upVotes.length;
			var numComments = item.comments.length;
			var description = item.description;
			var newsitem = new NewsItem(imageUrl,headline,author,description,timePosted,newsUrl,numVotes,numComments);
			self.newsArticles.push(newsitem);
		});
	});
};

ko.applyBindings(new ViewModel());
