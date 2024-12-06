
function searchContent() {
    const query = document.getElementById("search-box").value.toLowerCase();
    const contentDiv = document.getElementById("content");
    const paragraphs = contentDiv.getElementsByTagName("p");

    Array.from(paragraphs).forEach(paragraph => {
        const text = paragraph.textContent.toLowerCase();
        if (query && text.includes(query)) {
            paragraph.innerHTML = text.replace(
                new RegExp(query, "gi"),
                (match) => `<mark>${match}</mark>`
            );
        } else {
            paragraph.innerHTML = paragraph.textContent; // Restore original text
        }
    });
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
    const query = document.getElementById("search-box").value.toLowerCase();
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = ""; // 清空旧的搜索结果

    articles.forEach(article => {
        if (
            article.title.toLowerCase().includes(query) ||
            article.keywords.includes(query)
        ) {
            const resultItem = document.createElement("li");
            resultItem.innerHTML = `<a href="${article.link}">${article.title}</a>`;
            resultsContainer.appendChild(resultItem);
        }
    });

    if (resultsContainer.innerHTML === "") {
        resultsContainer.innerHTML = "<li>未找到匹配的文章。</li>";
    }
}

// 页面加载后执行
document.addEventListener("DOMContentLoaded", () => {
    loadArticles();  // 加载文章列表
});


