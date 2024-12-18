document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.sun_sign-in-btn');
    if (!btn) return;
    const today = new Date().toLocaleDateString();
    // 处理签到点击事件
    btn.onclick = () => {
        localStorage.setItem('signed', true);
        localStorage.setItem('lastSignDate', today);
        setSignState(btn, true);
        alert('签到成功！');
    };
});

const setSignState = (btn, signed) => {
    btn.textContent = signed ? '已签到' : '签到';
    btn.style.backgroundColor = signed ? '#999' : '';
    btn.disabled = signed;
    signed && btn.classList.add('sun_signed');
};
