new Vue({
  el: "#app",
  data: {
    nombre: "", 
    preguntaActual: 0, 
    respuestas: [], 
    finalizado: false,
    superheroe: "",
    descripcion: "",
    preguntas: [
      {
        texto: "¿Qué prefieres en una batalla?",
        respuestas: [
          { texto: "Inteligencia y tecnología avanzada", puntos: "Iron-man" },
          { texto: "Fuerza bruta sin igual", puntos: "Hulk" },
          { texto: "Velocidad y agilidad", puntos: "Spiderman" },
          { texto: "Valores y fuerza física", puntos: "Capitán América" },
        ]
      },
      {
        texto: "¿Qué característica te describe mejor?",
        respuestas: [
          { texto: "Rápido y energético", puntos: "Flash" },
          { texto: "Oscuro y estratégico", puntos: "Batman" },
          { texto: "Sarcástico e impredecible", puntos: "Deadpool" },
          { texto: "Nobleza y poder divino", puntos: "Thor" },
        ]
      },
      {
        texto: "¿Cómo actúas frente al peligro?",
        respuestas: [
          { texto: "Con calma y precisión", puntos: "Superman" },
          { texto: "Con fuerza y determinación", puntos: "Wolverine" },
          { texto: "Con humor y despreocupación", puntos: "Deadpool" },
          { texto: "Analizando y atacando", puntos: "Batman" },
        ]
      }
    ]
  },
  computed: {
    totalRespuestas() {
      const contador = {};
      this.respuestas.forEach(r => contador[r] = (contador[r] || 0) + 1);
      return contador;
    }
  },
  methods: {
    comenzarTest() {
      if (this.nombre) {
        this.respuestas = Array(this.preguntas.length).fill(null);
        this.preguntaActual = 0;
        this.finalizado = false;
      }
    },
    siguientePregunta() {
      if (this.preguntaActual < this.preguntas.length - 1) {
        this.preguntaActual++;
      }
    },
    calcularResultado() {
      this.finalizado = true;

      let maxPuntos = 0;
      let heroeGanador = "";
      for (const [heroe, puntos] of Object.entries(this.totalRespuestas)) {
        if (puntos > maxPuntos) {
          maxPuntos = puntos;
          heroeGanador = heroe;
        }
      }
      this.superheroe = heroeGanador;

      const descripciones = {
        "Iron-man": "Eres ingenioso y te apoyas en la tecnología para superar tus límites.",
        "Hulk": "¡Tienes una fuerza inigualable y eres invencible cuando te enfureces!",
        "Spiderman": "Eres ágil, rápido y siempre estás dispuesto a ayudar a los demás.",
        "Capitán América": "Eres valiente, honesto y siempre luchas por lo que es correcto.",
        "Flash": "Eres rápido y enérgico, siempre tienes prisa para hacer el bien.",
        "Batman": "Eres un estratega nato y prefieres trabajar en las sombras.",
        "Deadpool": "Eres sarcástico, irreverente, y siempre tienes una broma bajo la manga.",
        "Thor": "Eres noble y posees un poder divino, siempre dispuesto a defender a los demás.",
        "Superman": "Eres el modelo de perfección, con fuerza, velocidad y un alto sentido de justicia.",
        "Wolverine": "Tienes un fuerte carácter y una determinación inquebrantable."
      };
      this.descripcion = descripciones[heroeGanador];
    },
    reiniciarTest() {
      this.nombre = "";
      this.finalizado = false;
      this.respuestas = [];
      this.preguntaActual = 0;
      this.superheroe = "";
      this.descripcion = "";
    }
  }
});