let roundsPlayed = 0;

let teamStats = {
    'Azure Dragons': { matches: 0, wins: 0, draws: 0, losses: 0, scored: 0, conceded: 0, points: 0, emblem: "logos/azure-dragons.png" },
    'Golden Eagles': { matches: 0, wins: 0, draws: 0, losses: 0, scored: 0, conceded: 0, points: 0, emblem: "logos/golden-eagles.png" },
    'Crimson Foxes': { matches: 0, wins: 0, draws: 0, losses: 0, scored: 0, conceded: 0, points: 0, emblem: "logos/crimson-foxes.png"  },
    'Mystic Sharks': { matches: 0, wins: 0, draws: 0, losses: 0, scored: 0, conceded: 0, points: 0, emblem: "logos/mystic-sharks.png"  },
    'Thunder Wolves': { matches: 0, wins: 0, draws: 0, losses: 0, scored: 0, conceded: 0, points: 0, emblem: "logos/thunder-wolves.png"  },
    'Emerald Vipers' : { matches: 0, wins: 0, draws: 0, losses: 0, scored: 0, conceded: 0, points: 0, emblem: "logos/emerald-vipers.png"  },
    'Silver Phoenix' : { matches: 0, wins: 0, draws: 0, losses: 0, scored: 0, conceded: 0, points: 0, emblem: "logos/silver-phoenix.png"  },
    'Iron Knights' : { matches: 0, wins: 0, draws: 0, losses: 0, scored: 0, conceded: 0, points: 0, emblem: "logos/iron-knights.png"  },
    'Sky Griffins' : { matches: 0, wins: 0, draws: 0, losses: 0, scored: 0, conceded: 0, points: 0, emblem: "logos/sky-griffins.png"  },
    'Forest Unicorns' : { matches: 0, wins: 0, draws: 0, losses: 0, scored: 0, conceded: 0, points: 0, emblem: "logos/forest-unicorns.png"  }

}


document.getElementById('generateRound').addEventListener('click', function() {
    roundsPlayed++;
    if (roundsPlayed > 9) {
        alert('League is finished, please start a new league');
        return;
    }
    
    const teams = [
        'Azure Dragons', 
        'Golden Eagles',
        'Crimson Foxes',
        'Mystic Sharks',
        'Thunder Wolves',
        'Emerald Vipers',
        'Silver Phoenix',
        'Iron Knights',
        'Sky Griffins',
        'Forest Unicorns'
    ];

    // Shuffle teams for random pairings
    teams.sort(() => 0.5 - Math.random());

    let matchesOutput = '';
    for (let i = 0; i < teams.length; i += 2) {
        matchesOutput += `
            <div class="match">
                <img src="${teamStats[teams[i]].emblem}" alt="${teams[i]} Logo">
                <p>${teams[i]} - ${teams[i+1]}</p>
                <img src="${teamStats[teams[i+1]].emblem}" alt="${teams[i+1]} Logo">
            </div>`;
    }

    document.getElementById('matches').innerHTML = matchesOutput;

});


document.getElementById('getResults').addEventListener('click', function() {
    const matches = document.querySelectorAll('#matches p');

    matches.forEach(match => {
        let teamNames = match.innerText.split(" - ");
        let score1, score2;

        let randomChance = Math.random();
        if (randomChance <= 0.5) {
            // 50% шанс, що перемагає перша команда
            score1 = Math.floor(Math.random() * 7);
            score2 = Math.floor(Math.random() * (score1 + 1));
        } else if (randomChance <= 0.7) {
            // 20% шанс на нічию
            score1 = Math.floor(Math.random() * 7);
            score2 = score1;
        } else {
            // 30% шанс, що перемагає друга команда
            score2 = Math.floor(Math.random() * 7);
            score1 = Math.floor(Math.random() * (score2 + 1));
        }

        match.innerHTML = `${teamNames[0]}   ${score1} - ${score2}   ${teamNames[1]}`;

        // Після цього, оновлюємо статистику для кожної команди
        updateTeamStats(teamNames[0].trim(), score1, score2);
        updateTeamStats(teamNames[1].trim(), score2, score1);
    });

    // Оновлюємо таблицю результатів
    updateTable();
});

function updateTeamStats(team, scored, conceded) {
    let stats = teamStats[team];
    stats.matches += 1;
    stats.scored += scored;
    stats.conceded += conceded;
    stats.points += scored > conceded ? 3 : scored === conceded ? 1 : 0;
    stats.wins += scored > conceded ? 1 : 0;
    stats.draws += scored === conceded ? 1 : 0;
    stats.losses += scored < conceded ? 1 : 0;
}

function updateTable() {
    let tbody = document.querySelector('#tournament-standings tbody');
    let sortedTeams = Object.entries(teamStats).sort((a, b) => {
        if (b[1].points === a[1].points) {
            // Якщо кількість очок однакова, сортуємо за різницею голів
            return (b[1].scored - b[1].conceded) - (a[1].scored - a[1].conceded);
        }
        return b[1].points - a[1].points; // Основне сортування за очками
    });
    
    // Очищаємо поточний вміст таблиці
    tbody.innerHTML = '';
    
    // Додаємо відсортовані команди до таблиці
    sortedTeams.forEach(([team, stats]) => {
        let row = `<tr>
            <td><img src="${stats.emblem}" alt="${team}" class="team-emblem"> ${team}</td>
            <td>${stats.matches}</td>
            <td>${stats.wins}</td>
            <td>${stats.draws}</td>
            <td>${stats.losses}</td>
            <td>${stats.points}</td>
            <td>${stats.scored - stats.conceded}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

document.getElementById('startNewLeague').addEventListener('click', function() {
    roundsPlayed = 0;

    document.getElementById('matches').innerHTML = '';

    // Скидання статистики команд
    for (let team in teamStats) {
        teamStats[team].matches = 0;
        teamStats[team].wins = 0;
        teamStats[team].draws = 0;
        teamStats[team].losses = 0;
        teamStats[team].scored = 0;
        teamStats[team].conceded = 0;
        teamStats[team].points = 0;
        // emblem залишається незмінним
    }

    // Оновлення таблиці турніру
    updateTable();
});

