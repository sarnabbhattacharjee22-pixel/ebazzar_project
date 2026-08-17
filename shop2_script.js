 document.addEventListener("DOMContentLoaded", () => {
            let timeRemaining = (2 * 24 * 3600) + (18 * 3600) + (46 * 60);

            const daysEl = document.getElementById('sale-days');
            const hoursEl = document.getElementById('sale-hours');
            const minsEl = document.getElementById('sale-mins');
            const secsEl = document.getElementById('sale-secs');

            if (daysEl && hoursEl && minsEl && secsEl) {
                setInterval(() => {
                    let days = parseInt(timeRemaining / (3600 * 24), 10);
                    let hours = parseInt((timeRemaining % (3600 * 24)) / 3600, 10);
                    let minutes = parseInt((timeRemaining % 3600) / 60, 10);
                    let seconds = parseInt(timeRemaining % 60, 10);

                    daysEl.textContent = days < 10 ? "0" + days : days;
                    hoursEl.textContent = hours < 10 ? "0" + hours : hours;
                    minsEl.textContent = minutes < 10 ? "0" + minutes : minutes;
                    secsEl.textContent = seconds < 10 ? "0" + seconds : seconds;

                    if (--timeRemaining < 0) {
                        timeRemaining = 0; 
                    }
                }, 1000);
            }
        });