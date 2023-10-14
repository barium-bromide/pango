fetch("pronounce.json")
  .then((response) => response.json())
  .then((pronounces) => {
    const tbody = document.querySelector("#table tbody");
    const pronouncesKeys = Object.keys(pronounces);

    pronouncesKeys.forEach((key) => {
      const row = tbody.insertRow();
      const cell = row.insertCell();

      cell.innerHTML = key;
      cell.dataset.cell = "consonant";

      Object.entries(pronounces[key]).forEach(([cellidx, info]) => {
        const cell = row.insertCell();
        cell.innerHTML = cellidx;
        cell.dataset.cell = "merge";
        cell.className = "show-info";

        const div = document.createElement("div");
        div.className = "info hide";

        const values = Object.entries(info)
          .map(([tone, type]) => {
            const typeEntries = Object.entries(type)
              .map(([wordClass, meaning]) => `${wordClass}: ${meaning}`)
              .join('<br>');
            return `<b>${tone}</b><br>${typeEntries}`;
          })
          .join('<br>');

        div.innerHTML = values;
        cell.onclick = () => div.classList.toggle("hide");
        cell.appendChild(div);
      });
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });