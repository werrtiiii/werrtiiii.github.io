function searchContent() {
    const query = document.getElementById("search-box").value.toLowerCase().trim();
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = "";

    if (!query) {
        resultsContainer.style.display = "none";
        return;
    }

    resultsContainer.style.display = "block";
    let foundResults = false;

    articles.forEach(article => {
        if (
            article.title.toLowerCase().includes(query) ||
            article.keywords.toLowerCase().includes(query)
        ) {
            foundResults = true;
            const resultItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = article.link;
            link.textContent = article.title;
            
            // 添加关键词显示
            const keywords = document.createElement("small");
            keywords.textContent = ` - 关键词: ${article.keywords}`;
            keywords.style.color = "#666";
            
            resultItem.appendChild(link);
            resultItem.appendChild(keywords);
            resultsContainer.appendChild(resultItem);
        }
    });

    if (!foundResults) {
        resultsContainer.innerHTML = "<li>未找到匹配的文章。试试其他关键词？</li>";
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const dynamicParagraph = document.getElementById("st1");
    dynamicParagraph.style.fontSize = "25px"; // 设置动态文字大小
    dynamicParagraph.style.color = "blue"; // 设置动态文字颜色
});
document.addEventListener("DOMContentLoaded", () => {
    const dynamicParagraph = document.getElementById("st3");
    dynamicParagraph.style.fontSize = "50px"; // 设置动态文字大小
    dynamicParagraph.style.color = "red"; // 设置动态文字颜色
});
document.addEventListener("DOMContentLoaded", () => {
    const dynamicParagraph = document.getElementById("st2");
    dynamicParagraph.style.fontSize = "25px"; // 设置动态文字大小
    dynamicParagraph.style.color = "green"; // 设置动态文字颜色
});
// 文章数据，包含标题、链接和关键词
const articles = [
    {
        title: "矩阵的基本性质",
        link: "articles/linear_algebra_1.html",
        keywords: "矩阵, 线性代数, 性质"
    },
    {
        title: "行列式的计算技巧",
        link: "articles/linear_algebra_2.html",
        keywords: "行列式, 线性代数, 计算"
    },
    {
        title: "导数的定义与应用",
        link: "articles/analysis_1.html",
        keywords: "导数, 数学分析, 定义"
    },
    {
        title: "C语言中的指针",
        link: "articles/c_programming_1.html",
        keywords: "C语言, 指针, 编程"
    }
];

// 动态加载文章列表
function loadArticles() {
    const articlesContainer = document.getElementById("articles-list");  // 获取文章容器
    articlesContainer.innerHTML = "";  // 清空已有内容

    articles.forEach(article => {
        // 创建一个列表项
        const articleItem = document.createElement("li");

        // 创建一个链接
        const articleLink = document.createElement("a");
        articleLink.href = article.link;
        articleLink.textContent = article.title;

        // 将链接添加到列表项
        articleItem.appendChild(articleLink);

        // 将列表项添加到容器中
        articlesContainer.appendChild(articleItem);
    });
}

// 搜索功能
function searchContent() {
    const query = document.getElementById("search-box").value.toLowerCase().trim();
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = "";

    if (!query) {
        resultsContainer.style.display = "none";
        return;
    }

    resultsContainer.style.display = "block";
    let foundResults = false;

    articles.forEach(article => {
        if (
            article.title.toLowerCase().includes(query) ||
            article.keywords.toLowerCase().includes(query)
        ) {
            foundResults = true;
            const resultItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = article.link;
            link.textContent = article.title;
            
            // 添加关键词显示
            const keywords = document.createElement("small");
            keywords.textContent = ` - 关键词: ${article.keywords}`;
            keywords.style.color = "#666";
            
            resultItem.appendChild(link);
            resultItem.appendChild(keywords);
            resultsContainer.appendChild(resultItem);
        }
    });

    if (!foundResults) {
        resultsContainer.innerHTML = "<li>未找到匹配的文章。试试其他关键词？</li>";
    }
}

// 页面加载后执行
document.addEventListener("DOMContentLoaded", () => {
    loadArticles();  // 加载文章列表
});

// 添加返回顶部按钮功能
window.onscroll = function() {
    const backToTop = document.getElementById("backToTop");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
};

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});


