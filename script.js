const ramos = [
  { id: "matematica1", nombre: "Matemática I", requisitos: [] },
  { id: "matematica2", nombre: "Matemática II", requisitos: ["matematica1"] },
  { id: "economia1", nombre: "Economía I", requisitos: [] },
  { id: "economia2", nombre: "Economía II", requisitos: ["economia1"] },
  { id: "estadistica", nombre: "Estadística", requisitos: ["matematica2"] },
  { id: "finanzas", nombre: "Finanzas", requisitos: ["economia2", "estadistica"] }
];

const mallaDiv = document.getElementById("malla");

function crearMalla() {
  mallaDiv.innerHTML = "";
  ramos.forEach(ramo => {
    const aprobado = localStorage.getItem(ramo.id) === "true";
    const requisitosAprobados = ramo.requisitos.every(req => localStorage.getItem(req) === "true");

    const div = document.createElement("div");
    div.classList.add("ramo");
    div.classList.toggle("aprobado", aprobado);
    div.classList.toggle("bloqueado", !aprobado && !requisitosAprobados);
    div.textContent = ramo.nombre;

    if (!aprobado && requisitosAprobados) {
      div.addEventListener("click", () => {
        localStorage.setItem(ramo.id, "true");
        crearMalla();
      });
    }
    mallaDiv.appendChild(div);
  });
}

crearMalla();
