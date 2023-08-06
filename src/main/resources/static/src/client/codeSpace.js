export function displayRanking(data) {
  let rankingDiv = document.getElementById('today-rank');
  // Clear any previous content
  rankingDiv.innerHTML = '';

  // Displaying "Today Rank" title
  let title = document.createElement('h3');
  title.textContent = "Today Rank";
  rankingDiv.appendChild(title);

  // Looping through data and appending to the DOM
  data.forEach(rankItem => {
    let item = document.createElement('p');
    item.textContent = `${rankItem.username}: ${rankItem.score}`;
    rankingDiv.appendChild(item);
  });
}