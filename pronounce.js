fetch("pronounce.json")
  .then((response) => response.json())
  .then((pronounces) => {
    const tbody = document.querySelector("#table tbody");
    const pronouncesKeys = Object.keys(pronounces);

    pronouncesKeys.forEach((key) => {
      if (key === "none") return;

      const row = tbody.insertRow();
      const cell = row.insertCell();
      cell.innerHTML = key;
      cell.dataset.cell = "consonant";

      Object.entries(pronounces[key]).forEach(([cellidx, value]) => {
        const cell = row.insertCell();
        cell.innerHTML = cellidx;
        cell.dataset.cell = "merge";
        cell.className = "show-info";

        const div = document.createElement("div");
        div.innerHTML = value;
        div.className = "info hide";

        cell.onclick = () => div.classList.toggle("hide");
        cell.appendChild(div);
      });
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });