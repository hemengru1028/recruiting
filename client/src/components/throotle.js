// 节流函数

export const throotle = (fn) => {
    let canrun = true;
    return function () {
        if (!canrun) {
            return;
        }
        canrun = false;
        setTimeout(() => {
            canrun = true;
        }, 60000);
        fn.apply(this);
    }
}