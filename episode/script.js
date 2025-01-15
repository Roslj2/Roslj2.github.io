document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("myForm").addEventListener("submit", function(e) {
        e.preventDefault();

        const season = document.getElementById("season").value;
        const episode = document.getElementById("episode").value;

        const randomSeason = getRandomSeason(season);
        const randomEpisode = getRandomEpisode(episode);

        document.getElementById("season_result").textContent = "Random Season: " + randomSeason;
        document.getElementById("episode_result").textContent = "Random Episode: " + randomEpisode;
    });

    function getRandomSeason(season) {
        const randomSeason = Math.floor(Math.random() * season + 1);
        return randomSeason;
    }

    function getRandomEpisode(episode) {
        const randomEpisode = Math.floor(Math.random() * episode + 1);
        return randomEpisode;
    }
});
