document.addEventListener('DOMContentLoaded', () => {
    // 获取用户资料数据
    fetch('http://rap2api.taobao.org/app/mock/322073/weibo/sdx/ziliao')
        .then(res => res.json())
        .then(data => {
            // 更新用户头像
            const avatar = document.getElementById('sun_avatar');
            if (avatar) avatar.src = data.avatar;

            const infoMap = {
                '昵称': data.nickname,
                '简介': data.intro,
                '性别': data.personalInfo.gender,
                '生日': `${data.personalInfo.birthday} ${data.personalInfo.constellation}`,
                '感情状况': data.personalInfo.relationship,
                '家乡': data.personalInfo.hometown,
                '教育信息': data.personalInfo.education || '添加',
                '工作信息': data.personalInfo.work || '添加',
                '注册时间': data.personalInfo.registerDate
            };

            // 更新个人信息显示
            document.querySelectorAll('.sun_profile-item').forEach(item => {
                const label = item.querySelector('.sun_label')?.textContent;
                const value = item.querySelector('.sun_value');
                
                if (label && value && infoMap[label]) {
                    value.textContent = infoMap[label];
                    if (label.includes('信息')) value.classList.add('sun_add-text');
                }
            });

            // 设置头像更换功能
            const fileInput = document.createElement('input');
            Object.assign(fileInput, {
                type: 'file',
                accept: 'image/*',
                style: 'display: none'
            });
            document.body.appendChild(fileInput);

            document.querySelector('.sun_avatar-button:last-child')?.addEventListener('click', () => 
                fileInput.click()
            );

            fileInput.addEventListener('change', e => {
                const file = e.target.files?.[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = e => avatar.src = e.target.result;
                    reader.readAsDataURL(file);
                }
            });
        })
        .catch(err => console.error('获取数据失败:', err));
});
