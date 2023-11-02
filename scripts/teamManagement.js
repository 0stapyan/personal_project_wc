document.getElementById('showFormButton').addEventListener('click', function() {
    var form = document.getElementById('addPlayerForm');
    form.style.display = form.style.display === 'none' ? '' : 'none';
});

document.getElementById('addPlayer').addEventListener('click', function() {
    var name = document.getElementById('playerName').value;
    var position = document.getElementById('playerPosition').value;
    var age = document.getElementById('playerAge').value;
    var squad = document.getElementById('playerSquad').value;
    
    var table = document.querySelector('.team-table tbody');
    var row = table.insertRow(-1);
    row.insertCell(0).innerText = table.rows.length;
    row.insertCell(1).innerText = name;
    row.insertCell(2).innerText = position;
    row.insertCell(3).innerText = squad;
    row.insertCell(4).innerText = age;

    var deleteCell = row.insertCell(5);
    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Exclude";
    deleteButton.classList.add("delete-btn");

    deleteCell.appendChild(deleteButton);


    document.getElementById('playerName').value = '';
    document.getElementById('playerPosition').value = '';
    document.getElementById('playerAge').value = '';
    document.getElementById('playerSquad').selectedIndex = 0;

    updateTeamNews(`Azure Dragons just assigned new player: ${name}, ${age} years old, playing as ${position}, ${squad === 'Main' ? 'main squad' : 'reserved squad'}.`);

});

function updateTeamNews(newNews) {
    let teamNews = JSON.parse(localStorage.getItem('teamNews')) || [];
    teamNews.push(newNews);
    localStorage.setItem('teamNews', JSON.stringify(teamNews));
    displayTeamNews(); // Виклик функції для виведення новин
}

// Функція для виведення новин команди
function displayTeamNews() {
    const teamNews = JSON.parse(localStorage.getItem('teamNews')) || [];
    const teamNewsContainer = document.getElementById('teamNews');
    teamNewsContainer.innerHTML = teamNews.map(newsItem => `<p>${newsItem}</p>`).join('');
}

document.addEventListener('DOMContentLoaded', (event) => {
    const table = document.querySelector('.team-table');
    table.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const btn = e.target;
            let row = btn.closest('tr');
            let position = row.cells[2].innerText;
            let squad = row.cells[3].innerText;

            let playersWithSamePosition = Array.from(table.querySelectorAll('tr')).filter(tr => tr.cells[2].innerText === position);

            if (playersWithSamePosition.length <= 1) {
                alert("You have the only 1 player with this pos. Assign new players");
                return;
            }
                
            var confirmDelete = confirm("Are you sure you want to delete this player?");
            if (confirmDelete) {
                row.remove();

                if (squad === 'Main') {
                    let substitutePlayers = Array.from(table.querySelectorAll('tr'))
                        .filter(tr => tr.cells[2].innerText === position && tr.cells[3].innerText === 'Sub');
                    if (substitutePlayers.length > 0) {
                        let randomIndex = Math.floor(Math.random() * substitutePlayers.length);
                        substitutePlayers[randomIndex].cells[3].innerText = 'Main';
                    }
                }
            }
        }
    });
});


document.getElementById('addPlayerButton').addEventListener('click', addPlayerToTable);
