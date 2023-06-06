window.onload=function(){
    const canvas = document.getElementById("countdown-canvas");
    if(canvas.getContext){
        const ctx = canvas.getContext("2d");

        const endDate = new Date("2023-08-27 00:00:00").getTime();
        function updateCountdown() {
            const now = new Date().getTime();
            const timeRemaining = endDate - now;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = "70px Agency FB";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            if (timeRemaining <= 0) {
                document.getElementsByTagName("h3")[0]?.remove();
                ctx.fillText("Album has been released!", canvas.width / 2, canvas.height / 2);
                return;
            }
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)); //timeRemaining is in ms
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
            

            ctx.fillText(`${days}d ${hours}h ${minutes}m ${seconds}s`, canvas.width / 2, canvas.height / 2);
            
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
}
