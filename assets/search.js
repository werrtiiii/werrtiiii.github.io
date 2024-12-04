
document.getElementById('search-input').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const results = [];
    const posts = [
        { title: "线性方程组解法", url: "blog/algebra.html" },
        { title: "极限的定义与应用", url: "blog/analysis.html" },
        { title: "Hello World详解", url: "blog/c_programming.html" },
        { title: "二次函数的性质", url: "blog/highschool_math.html" }
    ];

    posts.forEach(post => {
        if (post.title.toLowerCase().includes(query)) {
            results.push(`<li><a href="${post.url}">${post.title}</a></li>`);
        }
    });

    document.getElementById('search-results').innerHTML = results.join('');
});
