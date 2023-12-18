let canvas = document.getElementById('playground');
let ctx = canvas.getContext('2d');

function drawLeaderboard(data) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw leaderboard title
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.fillText('Leaderboard', 200, 30);

    // Draw leaderboard entries
    ctx.font = '16px Arial';
    ctx.fillStyle = '#666';
    data.forEach((entry, index) => {
        const y = 60 + index * 40;
        ctx.fillText(`${entry.rank}. ${entry.name}`, 50, y);
        ctx.fillText(`Score: ${entry.score}`, 300, y);
    });
}