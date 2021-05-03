const posts = [
    { title: 'post one', body:'this is post one'},
    { title: 'post two', body:'this is post two'}
];

function getPosts() {
    setTimeout(() => {
        let output ='';
        posts.forEach((post,index) => {
            output += '<li>${post.title}</li>';
        });
        document.body.innerHTML =output;
    }, 1000);
}

getPosts(); 