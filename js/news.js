const followBtn = document.querySelector('.sun_follow_btn');
if (followBtn) {
    followBtn.onclick = () => {
        const isFollowing = followBtn.innerHTML === '已关注';
        
        if (isFollowing && !confirm('确定取消关注吗？')) {
            return;
        }
        
        followBtn.innerHTML = isFollowing ? '+关注' : '已关注';
        followBtn.style.backgroundColor = isFollowing ? '#fff' : '#f2f2f2';
        followBtn.style.color = isFollowing ? '#ff8200' : '#999';
        followBtn.style.border = isFollowing ? '1px solid #ff8200' : 'none';
    };
}

document.querySelectorAll('.sun_share_item').forEach(item => {
    item.onclick = () => alert('请登录后使用');
});