var loadMoreButton;

var instaFeed = new Instafeed({
    get: 'user',
      limit: 12,
      userId: 6222370876,
      accessToken: '6222370876.b2bd864.911c2ac30350450cae68101d17bf4cd5',
      resolution: 'thumbnail',
      template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>',
      after: function() {
        if (!this.hasNext()) {
            loadMoreButton.style.display = 'none';
        }
      },
});

window.onload = function() {
    loadMoreButton = document.getElementById('load-more');
    loadMoreButton.addEventListener('click', function() {
        instaFeed.next();
    });

    instaFeed.run();
};