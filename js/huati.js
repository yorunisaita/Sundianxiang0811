/**
 * 负责渲染新闻列表和互动功能
 */
function renderNews(data) {
    if (!data) return;
  
    const container = document.getElementById("newsContainer");
    const template = document.getElementById("newsTemplate");
  
    // 清空现有内容（保留模板）
    container.innerHTML = "";
  
    // 渲染新闻列表
    data.newsItems.forEach((item, index) => {
      const newsElement = template.content.cloneNode(true).firstElementChild;
  
      // 添加news-link类到第一个项目
      if (index === 0) {
        newsElement.classList.add("news-link");
      }
  
      // 为第二条新闻添加展开/收起功能
      if (index === 1) {
        const newsText = newsElement.querySelector(".sun_news_text");
        const originalText = item.content;
        
        // 如果内容超过10个字符，添加展开/收起功能
        if (originalText.length > 10) {
          const shortText = originalText.substring(0, 10) + "...";
          
          // 创建展开/收起按钮
          const toggleButton = document.createElement("span");
          toggleButton.textContent = "展开全文";
          toggleButton.className = "toggle-text";
          toggleButton.style.color = "#1890ff";
          toggleButton.style.cursor = "pointer";
          toggleButton.style.marginLeft = "5px";
  
          let isExpanded = false;
          toggleButton.onclick = () => {
            if (isExpanded) {
              newsText.textContent = shortText;
              toggleButton.textContent = "展开全文";
            } else {
              newsText.textContent = originalText;
              toggleButton.textContent = "收起";
            }
            isExpanded = !isExpanded;
            // 重新添加按钮，因为textContent会清除所有子元素
            newsText.appendChild(toggleButton);
          };
  
          // 设置初始文本和按钮
          newsText.textContent = shortText;
          newsText.appendChild(toggleButton);
        } else {
          newsText.textContent = originalText;
        }
      } else {
        newsElement.querySelector(".sun_news_text").textContent = item.content;
      }
  
      // 填充数据
      newsElement.querySelector(".sun_publisher_avatar").src = item.avatar;
      newsElement.querySelector(".sun_publisher_name").textContent =
        item.publisher;
      newsElement.querySelector(".sun_publish_time").textContent = item.time;
      newsElement.querySelector(".sun_news_image img").src = item.image;
  
      // 处理信息
      if (item.videoInfo) {
        const videoInfo = newsElement.querySelector(".sun_video_info");
        const videoTitle = newsElement.querySelector(".sun_video_title");
        videoInfo.classList.remove("hidden");
        videoTitle.classList.remove("hidden");
  
        videoInfo.querySelector(".sun_video_views").textContent =
          item.videoInfo.views;
        videoInfo.querySelector(".sun_video_duration").textContent =
          item.videoInfo.duration;
        videoTitle.textContent = item.videoInfo.title;
      }
  
      // 设置计数
      newsElement.querySelector(".forward-count").textContent = item.forwardCount;
      newsElement.querySelector(".comment-count").textContent = item.commentCount;
      newsElement.querySelector(".like-count").textContent = item.likeCount;
  
      container.appendChild(newsElement);
    });
  
    // 为第一条新闻添加点击跳转
    const firstNews = document.querySelector(".news-link");
    if (firstNews) {
      firstNews.onclick = () => (window.location.href = "./news.html");
      firstNews.style.cursor = "pointer";
    }
  }
  
  // 页面加载时获取数据
  window.onload = () => {
    fetch("http://rap2api.taobao.org/app/mock/322073/weibo/sdx/huati")
      .then((res) => res.json())
      .then(renderNews);
  };
  