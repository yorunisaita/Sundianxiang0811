// 顶部 tab 切换
var sun_tab = document.querySelector(".sun_tab");
var sun_tt = sun_tab.querySelector(".sun_t_title");
var sun_span = sun_tt.getElementsByTagName("span");
var sun_tc = sun_tab.querySelectorAll(".sun_tc");

for(i=0; i<sun_span.length; i++) {
    sun_span[i].index = i;
    sun_span[i].onclick = function() {
        for(j=0; j<sun_tc.length; j++) {
            sun_tc[j].style.display = "none";
            sun_span[j].className = "";
        }
        sun_tc[this.index].style.display = "block";
        this.className = "sun_cur";
    }
}