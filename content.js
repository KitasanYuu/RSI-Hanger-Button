// content.js
(function() {
  const risSidePanel = document.getElementById('sidePanel')

  // 创建一个 MutationObserver 实例，监听元素的子元素变化
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // 只处理元素节点 (忽略文本节点)
                    console.log('检测到新增子元素:', node)
                }
            })
        }
    }
  })

  // 启动监听
  observer.observe(targetNode, { childList: true });

  // // 创建按钮元素
  // const button = document.createElement('button');
  // button.innerText = '点击我';

  // // 设置按钮样式（固定定位在页面右下角）
  // button.style.position = 'fixed';
  // button.style.bottom = '20px';
  // button.style.right = '20px';
  // button.style.padding = '10px 20px';
  // button.style.zIndex = '10000';
  // button.style.backgroundColor = '#4CAF50';
  // button.style.color = '#fff';
  // button.style.border = 'none';
  // button.style.borderRadius = '5px';
  // button.style.cursor = 'pointer';
  // button.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';

  // // 为按钮添加点击事件
  // button.addEventListener('click', function() {
  //   alert('按钮被点击了！');
  // });

  // // 将按钮添加到页面中
  // document.body.appendChild(button);
})();
