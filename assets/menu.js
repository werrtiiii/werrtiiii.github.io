// 获取圆圈菜单图标和隐藏的导航菜单
const menuCircle = document.getElementById('menu-circle');
const hiddenMenu = document.getElementById('hidden-menu');

// 为圆圈菜单图标添加点击事件监听器
menuCircle.addEventListener('click', function() {
    // 添加或移除 'clicked' 类，从而触发旋转动画
    this.classList.toggle('clicked');
    
    // 显示/隐藏菜单
    if (this.classList.contains('clicked')) {
        hiddenMenu.style.display = 'block';  // 显示菜单
    } else {
        hiddenMenu.style.display = 'none';   // 隐藏菜单
    }
});
