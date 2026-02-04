async function loadConfig() {
  const res = await fetch("/api/config");
  const config = await res.json();
  document.getElementById("config").textContent = JSON.stringify(
    config,
    null,
    2,
  );
}

loadConfig();
