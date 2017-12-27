var feed = new Instafeed({
    get: 'user',
    userId: 6222370876,
    accessToken: '6222370876.b2bd864.911c2ac30350450cae68101d17bf4cd5',
    target: 'instagram',
    resolution: 'standard_resolution',
    // after: function() {
    //     var el = document.getElementById('instagram');
    //     if (el.classList)
    //         el.classList.add('show');
    //     else
    //         el.className += ' ' + 'show';
    // }
});

window.onload = function() {
feed.run();
};