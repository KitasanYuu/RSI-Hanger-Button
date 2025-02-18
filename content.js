// content.js
(function() {
  /**
   * 寻找元素直到元素被加载
   * @param dom 查找的根元素
   * @param selector 元素的查找
   * @param callback 查找到的回调
   * @param interval 查找的间隔，默认 100 毫秒
   */
  function waitForElement(dom, selector, callback, interval = 100) {
    const checkExist = setInterval(() => {
      const element = dom.querySelector(selector);
      if (element) {
        clearInterval(checkExist); // 停止轮询
        callback(element);
      }
    }, interval);
  }

  /**
   * 开始监听抽屉，如果监听到点击事件，则添加按钮
   * @param element 
   */
  function startObserve(element) {
    // 创建一个 MutationObserver 实例，监听元素的子元素变化
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // 只处理元素节点 (忽略文本节点)
							waitForElement(node, "a[data-cy-id=\"button\"][href=\"/account/settings\"]", (button) => {
								copyAndAddButton(button)
							});
            }
          })
        }
      }
    })

    // 启动监听
    observer.observe(element, { childList: true });
  }

	/**
	 * 复制原有按钮，将其修改为机库按钮并插入到原来的按钮的上方
	 * @param rsiSidePanel 侧边抽屉 dom
	 */
  function copyAndAddButton(button) {
		console.log('bbbbbbbbbbbbbb', button)
    if (button) {
      // 复制元素
      const hangarButton = button.cloneNode(true);

      // 修改 href
      hangarButton.href = "/account/pledges";

			// 查找按钮的文本部分的 dom
			const hangarButtonText = hangarButton.querySelector('span[data-cy-id="button__text"]');

			// 修改文本
			hangarButtonText.innerText = "Your Hanger"

      // 插入到目标元素的前方
      button.parentNode.insertBefore(hangarButton, button);
    }
  }

  // 开始查找抽屉，如果找到执行监听回调
  waitForElement(document, "#sidePanel", (risSidePanel) => {
    startObserve(risSidePanel)
  });
})();
