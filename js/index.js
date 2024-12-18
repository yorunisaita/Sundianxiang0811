document.addEventListener('DOMContentLoaded', () => {
    // 从API获取热搜数据
    fetch('http://rap2api.taobao.org/app/mock/322073/weibo/sdx/index')
        .then(res => res.json())
        .then(data => {
            const hotList = document.querySelector('.sun_hot-list');
            
            const renderItem = (item, index) => `
                <div class="sun_hot-item">
                    ${index === 0  // 第一个热搜项添加链接
                        ? `<a href="./html/huati.html" class="sun_title-link" onclick="event.preventDefault(); window.location.href='./html/huati.html';">`
                        : ''
                    }
                    <span class="sun_title">${item.title}</span>
                    ${item.tag ? `<span class="sun_tag ${item.type ? 'sun_' + item.type : ''}">${item.tag}</span>` : ''}
                    ${index === 0 ? '</a>' : ''}
                </div>
            `;

            hotList.innerHTML = data.hotSearches.map(renderItem).join('') + `
                <div class="sun_hot-item sun_more-hot">
                    <span class="sun_title">更多热搜</span>
                </div>
            `;
        })
        .catch(error => console.error('Error:', error));

    // 热搜提示关闭功能
    const closeBtn = document.querySelector('.sun_close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            this.parentElement.style.display = 'none';
        });
    }

    // 轮播图功能
    var index = 1;
    function lunbo(){
        index++;
        if(index > 3){
            index = 1;
        }
        var img = document.getElementById("lunbo_img");
        img.src = "./img/广告"+index+".jpg";
    }
    //定义定时器
    setInterval(lunbo, 3000); 
});