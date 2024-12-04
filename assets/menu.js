// 获取圆圈菜单图标和隐藏的导航菜单
const menuCircle = document.getElementById('menu-circle');
const hiddenMenu = document.getElementById('hidden-menu');

// 为圆圈菜单图标添加点击事件监听器
menuCircle.addEventListener('click', function() {
    // 添加或移除 'clicked' 类，从而触发旋转动画
    this.classList.toggle('clicked');

    // 控制菜单的显示/隐藏
    hiddenMenu.style.display = hiddenMenu.style.display === 'block' ? 'none' : 'block';
});
