// Motor de conocimiento ANMI (100% offline, sin backend) ✨

// ----------------- UTILIDADES BÁSICAS -----------------

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Normalizar texto: minúsculas, sin tildes, sin espacios raros
const normalizar = (texto) => {
  return (texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const tokenizar = (texto) => normalizar(texto).split(" ").filter(Boolean);

// ----------------- BASE DE CONOCIMIENTO -----------------

export const baseConocimiento = {
  // --------- SALUDOS / INICIO ---------
  saludo: {
    palabrasClave: [
      "hola", "holaa", "holaaa", "buenos dias", "buenas tardes", "buenas noches",
      "buen dia", "buenas", "hey", "holi", "holis", "que tal", "como estas",
      "saludos", "saludito", "buen inicio de semana", "feliz dia",
      "tengo una duda", "quiero preguntar", "consulta rapidita"
    ],
    respuesta: [
      `Hola 😊 Soy ANMI. Puedo ayudarte con alimentación, anemia y cuidados del bebé de 0 a 2 años.  
Cuéntame, ¿qué te preocupa o qué quisieras saber hoy? 💛`
    ]
  },

  // --------- LACTANCIA MATERNA < 6 MESES ---------

  lactanciaExclusiva: {
    palabrasClave: [
      "lactancia exclusiva", "solo leche materna", "solo pecho",
      "dar solo teta", "hasta cuando lactancia exclusiva", "6 meses exclusiva",
      "antes de los 6 meses puede comer", "puede tomar otra cosa antes de los 6 meses",
      "dar agua antes de los 6 meses", "mate antes de los 6 meses",
      "puedo darle jugo", "puedo darle aguita", "aguita de anis", "aguita de manzanilla"
    ],
    respuesta: [
      `🍼 Hasta los 6 meses el mejor alimento es solo leche materna a libre demanda.  
No hace falta agua, mates ni otros alimentos: la leche ya trae todo lo que necesita, incluso para la sed.`
    ]
  },

  aguaAntesSeisMeses: {
    palabrasClave: [
      "agua antes de los 6 meses", "cuando empezar agua", "dar agua recien nacido",
      "agua a los 3 meses", "agua a los 4 meses", "sed bebe pequeno",
      "puede tomar agua con calor", "hidratacion menor de 6 meses"
    ],
    respuesta: [
      `💧 Si tu bebé toma solo pecho, antes de los 6 meses no necesita agua extra, ni con calor.  
La leche materna cubre la sed y darle otros líquidos puede desplazar la leche o aumentar riesgo de infecciones.`
    ]
  },

  contactoPielAPiel: {
    palabrasClave: [
      "piel con piel", "contacto piel a piel", "primera hora de vida",
      "hora de oro", "recién nacido pecho", "inicio temprano lactancia",
      "despues del parto piel a piel", "cesarea piel con piel"
    ],
    respuesta: [
      `🤱 El contacto piel a piel en la primera hora de vida ayuda a que el bebé se calme, mantenga el calor  
y encuentre el pecho más fácil. También favorece que la leche “baje” y refuerza el vínculo con la mamá.`
    ]
  },

  calostro: {
    palabrasClave: [
      "calostro", "primera leche", "leche amarilla espesa", "poca leche primeros dias",
      "leche amarilla del pecho", "colostro", "no tengo mucha leche al inicio"
    ],
    respuesta: [
      `✨ El calostro es la primera leche, espesa y amarillita. Aunque salga poquito, es suficiente  
y actúa como una “primera vacuna”: protege el intestino y ayuda a sacar el meconio. Es oro líquido para tu bebé.`
    ]
  },

  tecnicaAmamantamiento: {
    palabrasClave: [
      "como darle pecho", "agarre correcto", "dolor al amamantar", "pezon adolorido",
      "como se si agarra bien", "posicion para dar de lactar", "posición de lactancia",
      "bebe se atraganta al pecho", "se suelta a cada rato", "no se llena con el pecho"
    ],
    respuesta: [
      `🤱 Señales de buen agarre: boca bien abierta, más areola arriba que abajo, mentón pegado al pecho  
y succión lenta y profunda sin dolor. Puedes probar distintas posiciones hasta sentirte cómoda.`
    ]
  },

  extraccionLeche: {
    palabrasClave: [
      "extraer leche", "sacarme leche", "como guardar leche materna", "congelar leche",
      "cuanto dura la leche", "como calentar leche materna", "bombita de leche",
      "leche extraida trabajo", "banco de leche casero"
    ],
    respuesta: [
      `🧊 Puedes extraer la leche con la mano o con sacaleches y guardarla en frascos limpios con tapa.  
En refri dura unos 3–4 días y en congeladora varios meses. Para usarla, descongela en la refri y entíbiala al baño maría.`
    ]
  },

  suplementoHierro4m: {
    palabrasClave: [
      "hierro en gotas", "a que edad se da hierro", "gotas de sulfato ferroso",
      "chispitas no, gotas", "suplemento de hierro 4 meses", "prevencion de anemia gotas"
    ],
    respuesta: [
      `🩸 Desde los 4 meses suele indicarse hierro en gotas para prevenir anemia, aunque el bebé solo tome pecho.  
La dosis y tipo de hierro debe indicarlo su pediatra o el personal de salud que lo controla.`
    ]
  },

  // --------- LACTANCIA 6–24 MESES ---------

  lactanciaProlongada: {
    palabrasClave: [
      "hasta cuando dar pecho", "hasta que edad lactar", "lactancia 2 años",
      "seguir dando teta despues del año", "lactancia prolongada", "pecho y comida",
      "mi hijo grande sigue tomando pecho", "quieren que destete"
    ],
    respuesta: [
      `👶 La leche materna sigue siendo muy valiosa después de los 6 meses y hasta los 2 años o más.  
Aporta energía, defensas y consuelo. Puedes continuar mientras tú y tu bebé lo deseen.`
    ]
  },

  desteteSuave: {
    palabrasClave: [
      "como dejar el pecho", "destete", "quitar la teta", "dejar de amamantar",
      "destete respetuoso", "destetar sin trauma", "mi bebe se pega mucho al pecho"
    ],
    respuesta: [
      `🌙 Para un destete más suave, ve retirando tomas de a poco, empezando por las menos importantes.  
Ofrece agua, alimento, juego y mucho cariño extra, evitando engaños o castigos.`
    ]
  },

  // --------- ANEMIA / HIERRO ---------

  anemia: {
    palabrasClave: [
      "anemia", "anemico", "anemia infantil", "anemia en bebes", "anemia en ninos",
      "baja hemoglobina", "hemoglobina baja", "hemoglobina en 10", "hemoglobina en 9",
      "hemograma bajo", "ferritina baja", "globulos rojos bajos", "sangre baja",
      "deficiencia de hierro", "deficit de hierro", "hierro bajo", "falta de hierro",
      "anemia ferropenica", "palido", "bebe palido", "nino palido", "labios palidos",
      "sin energia", "falta de energia", "cansancio", "somnolencia", "irritabilidad",
      "no quiere comer", "poco apetito", "decaimiento", "ojeras", "reserva de hierro agotada",
      "sospecha de anemia", "signos de anemia", "sintomas de anemia"
    ],
    respuesta: [
      `🩸 La anemia por falta de hierro es frecuente entre los 6 y 24 meses.  
Se sospecha si hay palidez, cansancio y poco apetito. Ayuda ofrecer alimentos ricos en hierro y seguir el suplemento indicado.  
Ante una sospecha, es clave un control con pediatra para confirmar y tratar.`
    ]
  },

  alimentosHierro: {
    palabrasClave: [
      "alimentos ricos en hierro", "que tiene hierro", "comidas con hierro",
      "hierro hemo", "hierro no hemo", "sangrecita", "higado", "bazo", "bofe",
      "carne roja", "cuy", "menestras", "lentejas", "garbanzos", "pallar",
      "espinaca", "acelga", "quinua", "yema de huevo", "pescado azul",
      "fuentes de hierro", "que dar para hierro", "subir hierro rapido", "menu para anemia"
    ],
    respuesta: [
      `🍖 Buen hierro: sangrecita, hígado, bazo, bofe, carne de res, pollo, pescado, cuy;  
y también menestras y quinua. Combínalos con frutas o verduras ricas en vitamina C (naranja, mandarina, tomate)  
y evita té o café en la misma comida para que se absorba mejor.`
    ]
  },

  recetasHierro: {
    palabrasClave: [
      "recetas hierro", "ideas hierro", "menu hierro", "sangrecita receta",
      "papilla carne", "pure lentejas", "hamburguesa lentejas", "preparaciones hierro",
      "como incluir sangrecita", "recetas para anemia"
    ],
    respuesta: [
      `👩‍🍳 Algunas ideas:  
• Puré de papa o zapallo con sangrecita bien cocida.  
• Lentejas suaves con arroz y zanahoria.  
• Carne molida con verduras picadas y arroz o camote.  
Siempre acompañar con fruta cítrica para mejorar la absorción. 🍊`
    ]
  },

  // --------- TIPOS DE ALIMENTOS ---------

  alimentosNaturales: {
    palabrasClave: [
      "alimentos naturales", "comida natural", "comida casera", "hecho en casa",
      "procesados vs naturales", "que es alimento natural", "comida de verdad"
    ],
    respuesta: [
      `🥦 Alimentos naturales son los que casi no han sido modificados: frutas, verduras, menestras,  
tubérculos, granos, huevos, carnes, leche. Son la base ideal de la alimentación del bebé y de la familia.`
    ]
  },

  alimentosProcesadosUltra: {
    palabrasClave: [
      "ultraprocesados", "chatarra para bebes", "galletas para bebe", "juguitos en caja",
      "salchicha bebe", "embutidos bebe", "snacks empaquetados", "comida chatarra",
      "cereal azucarado", "yogur azucarado", "gomitas", "chizitos", "comida rapida"
    ],
    respuesta: [
      `🚫 Para bebés y niños pequeños es mejor evitar galletas dulces, jugos en caja, gaseosas, embutidos,  
snacks, yogures muy azucarados y comida rápida. Llénale el plato con comida casera sencilla y natural.`
    ]
  },

  alimentosNoRecomendados: {
    palabrasClave: [
      "evitar alimentos", "no recomendados", "prohibidos bebe", "miel", "sal", "azucar",
      "frutos secos enteros", "pescado crudo", "huevo crudo", "leche de vaca entera",
      "espinaca nitratos", "miel botulismo", "que no dar", "no debo darle"
    ],
    respuesta: [
      `🚫 Antes del año evita miel, frutos secos enteros, sal añadida, azúcar, pescados y huevos crudos  
y bebidas azucaradas. También cuidado con alimentos muy duros o redondos que puedan atragantar.`
    ]
  },

  // --------- ALIMENTACIÓN COMPLEMENTARIA ---------

  alimentacionComplementaria: {
    palabrasClave: [
      "alimentacion complementaria", "empezar solidos", "cuando iniciar solidos",
      "blw", "baby led weaning", "papillas", "pures", "comida solida",
      "introduccion de alimentos", "6 meses", "señales de preparacion",
      "mi bebe ya se sienta", "que darle cuando cumple 6 meses"
    ],
    respuesta: [
      `👶 La alimentación complementaria suele iniciar alrededor de los 6 meses,  
cuando el bebé se sienta con apoyo, sostiene bien la cabeza y muestra interés por la comida.  
Puedes usar purés, trozos blandos o combinar ambos; la leche sigue siendo muy importante.`
    ]
  },

  texturasPorEdad: {
    palabrasClave: [
      "texturas por edad", "como debe ser la comida", "papilla espesa",
      "comida licuada o machacada", "cuando dejar la licuadora", "trozos blandos",
      "consistencia de alimentos", "textura 6 meses", "textura 8 meses", "textura 1 año"
    ],
    respuesta: [
      `🍽️ Desde los 6 meses ofrece papillas espesas o comida bien aplastada.  
Entre 8–9 meses puedes dejar pedacitos blandos y hacia el año acercarte más a la comida de la familia,  
siempre en trozos seguros según lo que pueda masticar.`
    ]
  },

  horariosComidas: {
    palabrasClave: [
      "horarios de comidas", "frecuencia", "cuantas comidas", "cada cuanto come",
      "horario alimentacion", "rutina comidas", "cuando darle", "cuantas veces al dia",
      "comidas y snacks", "merienda cuantas veces"
    ],
    respuesta: [
      `⏰ En general:  
6–8 meses: 2–3 comidas + leche.  
9–11 meses: 3 comidas + 1–2 snacks + leche.  
12 meses+: 3 comidas + 2 snacks + leche.  
Lo clave es respetar hambre y saciedad y evitar picar todo el día.`
    ]
  },

  ideasMenus: {
    palabrasClave: [
      "ideas de menus", "menu por edad", "ejemplo menu", "que darle de comer",
      "combinaciones", "comidas por textura", "ideas recetas", "que cocinarle"
    ],
    respuesta: [
      `🍽️ Ejemplos sencillos:  
• Desayuno: avena con plátano.  
• Almuerzo: arroz suave con lentejas y zanahoria.  
• Cena: puré de papa o camote con pollo o pescado.  
Adáptalo según lo que tengas y lo que tolere tu bebé.`
    ]
  },

  snacksSaludables: {
    palabrasClave: [
      "snacks", "colaciones", "entre comidas", "bocaditos", "merienda",
      "que darle entre comidas", "snacks saludables", "refrigerios", "lonchera bebe"
    ],
    respuesta: [
      `🍌 Snacks simples: plátano maduro, fruta cocida, zanahoria bien cocida, pepino pelado,  
aguacate, pan simple o yogur natural sin azúcar. Mejor evitar ultraprocesados y jugos azucarados.`
    ]
  },

  // --------- CONDUCTA ALIMENTARIA / ALIMENTACIÓN RESPONSIVA ---------

  rechazoComida: {
    palabrasClave: [
      "no quiere comer", "rechazo de alimentos", "rechaza comida", "no come",
      "no acepta", "cierra la boca", "escupe", "tira la comida", "no le gusta nada",
      "solo quiere leche", "no prueba", "dificil de alimentar", "come poco", "inapetente"
    ],
    respuesta: [
      `🍽️ Es normal que a veces rechacen comida.  
Ofrece sin obligar, permite que juegue un poco con la comida, cambia texturas y come con él/ella.  
Si casi no come y baja de peso, coméntalo con su pediatra.`
    ]
  },

  soloQuiereLeche: {
    palabrasClave: [
      "solo quiere leche", "rechaza solidos", "no acepta comida", "puro pecho",
      "solo teta", "solo biberon", "no come solo toma", "no quiere solidos"
    ],
    respuesta: [
      `🍼 Al inicio es común que prefiera la leche.  
Ofrece primero la comida cuando esté despierto y tranquilo y la leche después.  
Deja que explore; si pasa el tiempo y sigue rechazando casi todo, consulta con el pediatra.`
    ]
  },

  mejorarApetito: {
    palabrasClave: [
      "aumentar apetito", "que le abra el hambre", "come poco", "estimular apetito",
      "mas calorias", "denso nutricionalmente", "que engorde", "subir peso sin forzar"
    ],
    respuesta: [
      `🍽️ No hay comida mágica, pero puedes hacer las preparaciones más nutritivas:  
añade aguacate, aceite de oliva, yema de huevo o un poco de queso rallado.  
Ofrece porciones pequeñas más frecuentes y evita llenarlo con líquidos antes de comer.`
    ]
  },

  senalesHambreSaciedad: {
    palabrasClave: [
      "senales de hambre", "como saber si tiene hambre", "saciedad", "ya no quiere",
      "señales bebe", "cuando parar de dar", "esta satisfecho", "comer a demanda"
    ],
    respuesta: [
      `👶 Hambre: busca la comida, se inclina hacia el plato, abre la boca.  
Saciedad: cierra la boca, gira la cabeza, empuja la cuchara o se distrae.  
Respetar estas señales ayuda a que aprenda a regularse solo.`
    ]
  },

  consistenciaCuidadores: {
    palabrasClave: [
      "abuelos dan dulces", "cuidadores diferentes", "familia opina", "cada quien hace distinto",
      "conflicto crianza", "no respetan indicaciones", "todos opinan de la comida"
    ],
    respuesta: [
      `👨‍👩‍👧 Cuando varias personas lo cuidan, sirve acordar reglas simples:  
por ejemplo, sin azúcar antes del año, nada de jugos en caja y priorizar comida casera.  
Hablarlo con calma ayuda a que todos remen para el mismo lado.`
    ]
  },

  apoyoEmocional: {
    palabrasClave: [
      "cansada", "agotada", "estresada", "no puedo mas", "me siento mal",
      "ansiosa", "abrumada", "culpa", "mala madre", "mal padre", "agobiado",
      "no duermo", "exhausta", "no doy mas", "sobrepasada"
    ],
    respuesta: [
      `💚 Cuidar a un bebé es hermoso, pero también muy cansado.  
Sentirte agotada o desbordada no te hace mala madre/padre.  
Pedir ayuda, dormir cuando se pueda y hablar de lo que sientes también es cuidar.`
    ]
  },

  // --------- TEMAS DE SEGURIDAD ---------

  cortarAlimentos: {
    palabrasClave: [
      "como cortar", "formas seguras", "corte de alimentos", "tamano", "bastones",
      "evitar atragantamiento", "que tamano", "prevenir ahogo", "como cortar uvas",
      "cortar salchicha"
    ],
    respuesta: [
      `✂️ De 6–9 meses ofrece bastones blandos que pueda agarrar con la mano.  
Luego, trocitos pequeños y suaves. Evita uvas enteras, frutos secos enteros, salchichas en rodajas gruesas  
y trozos muy duros de zanahoria o manzana.`
    ]
  },

  atragantamientoArcadas: {
    palabrasClave: [
      "atragantamiento", "arcadas", "se ahoga", "reflejo nausea", "gag reflex",
      "diferencia arcadas", "tose", "se pone rojo", "se atora con la comida"
    ],
    respuesta: [
      `😮 Si tose y hace ruido, suelen ser arcadas normales y está protegiéndose.  
Atragantamiento grave es cuando no puede toser ni llorar y se pone morado: eso es urgencia.  
Ante una situación así, hay que acudir de inmediato a un servicio de emergencia.`
    ]
  },

  preparacionSegura: {
    palabrasClave: [
      "preparacion segura", "higiene de alimentos", "manipulacion",
      "almacenamiento", "descongelar", "recalentar", "lavado de manos",
      "intoxicacion", "comida guardada bebe"
    ],
    respuesta: [
      `🍲 Lava tus manos y los alimentos, cocina bien carnes y huevos y refrigera lo que sobre antes de 2 horas.  
Cuando recalentas, que quede bien caliente, y no vuelvas a guardar lo que el bebé ya probó.`
    ]
  },

  almacenamientoComida: {
    palabrasClave: [
      "congelar", "recalentar", "almacenar", "guardar comida", "cuanto dura",
      "como conservar", "meal prep", "preparar comida para varios dias",
      "pure congelado"
    ],
    respuesta: [
      `🧊 La comida cocida puede durar 2–3 días en refri bien tapada.  
En congelador, unos 2–3 meses en recipientes cerrados. Descongela en la refri o microondas  
y recalienta solo una vez hasta que esté bien caliente.`
    ]
  },

  // --------- LACTANCIA / SUPLEMENTOS ---------

  lactanciaMixta: {
    palabrasClave: [
      "lactancia mixta", "pecho y formula", "combinar leche", "leche materna y formula",
      "complementar con formula", "dar pecho y biberon", "mixta"
    ],
    respuesta: [
      `🍼 En lactancia mixta suele ayudarnos ofrecer primero el pecho y luego la fórmula si hace falta.  
Haz los cambios de forma gradual y revisa con el pediatra qué tipo de fórmula y cantidades son mejores.`
    ]
  },

  lactanciaVitaminas: {
    palabrasClave: [
      "lactar", "lactancia", "vitaminas", "vitamina d", "suplementos", "hierro gotas",
      "multivitaminico", "calcio", "omega 3", "galactagogos", "sube la leche",
      "baja la leche", "leche materna poca", "no tengo leche"
    ],
    respuesta: [
      `🍼 A veces se indica vitamina D o hierro según el caso; eso lo define el profesional de salud.  
Comer variado, tomar líquidos y descansar en lo posible ayuda a mantener la producción de leche.  
No hay alimentos “mágicos”, pero sí buenos hábitos.`
    ]
  },

  // --------- HIDRATACIÓN / AGUA ---------

  aguaHidratacion: {
    palabrasClave: [
      "agua", "hidratacion", "cuanta agua", "vasito", "taza", "sed", "cuando dar agua",
      "agua despues de los 6 meses", "no quiere tomar agua"
    ],
    respuesta: [
      `💧 Desde los 6 meses puedes ofrecer pequeños sorbos de agua en vasito junto con las comidas.  
No hacen falta jugos ni gaseosas; el agua es la mejor bebida. Si toma mucho pecho, puede pedir poca agua.`
    ]
  },

  // --------- ALERGIAS / ESTREÑIMIENTO / ENFERMEDAD ---------

  alergias: {
    palabrasClave: [
      "alergia", "alergenos", "introduccion alergenos", "huevo", "mani", "cacahuate",
      "pescado", "lactosa", "gluten", "urticaria", "erupcion", "como introducir",
      "miedo a la alergia"
    ],
    respuesta: [
      `🌰 Hoy se recomienda introducir huevo, maní, pescado y otros alergenos desde el inicio de la alimentación  
complementaria, de a poco y uno por vez. Si hay ronchas leves, suspende y consulta;  
si hay dificultad para respirar o hinchazón de cara/labios, es urgencia.`
    ]
  },

  alergiaLeve: {
    palabrasClave: [
      "alergia leve", "reaccion alergica", "ronchas", "urticaria",
      "erupcion", "sarpullido", "alergia grave", "diferencia alergia"
    ],
    respuesta: [
      `🌰 Si aparecen ronchas leves tras un alimento nuevo, deja de ofrecerlo y coméntalo con el pediatra.  
Si se hinchan labios o cara o le cuesta respirar, acude de inmediato a emergencia.`
    ]
  },

  estrenimientoRelacionado: {
    palabrasClave: [
      "estrenimiento frecuente", "heces muy duras", "constipacion", "hace mucha fuerza",
      "popo con dolor", "sangra al hacer", "no hace hace varios dias"
    ],
    respuesta: [
      `🍐 Para heces duras ayuda ofrecer más agua, frutas con fibra (papaya, pera, ciruela), verduras cocidas y avena.  
Si hay mucho dolor, sangrado o varios días sin evacuar, es importante consultarlo con el pediatra.`
    ]
  },

  bebeEnfermo: {
    palabrasClave: [
      "bebe enfermo", "come menos enfermo", "resfriado", "gripe", "esta resfriado",
      "con tos", "mocos", "enfermo no come", "inapetente por enfermedad", "fiebre y comida"
    ],
    respuesta: [
      `🤧 Cuando está resfriado suele comer menos.  
Prioriza líquidos (leche, agua, caldos), comidas suaves y porciones pequeñas y frecuentes.  
Si hay fiebre alta, dificultad para respirar o rechazo total de líquidos, ve a un servicio de salud.`
    ]
  },

  mitosFrecuentes: {
    palabrasClave: [
      "mitos alimentacion", "creencias falsas", "verdades", "mentiras",
      "mitos comunes", "falsos mitos", "errores comunes", "mitos bebe",
      "dicen que el huevo hace daño", "dicen que el azucar abre el apetito"
    ],
    respuesta: [
      `🔍 Algunos mitos:  
• No necesitan sal ni azúcar para aceptar la comida.  
• El huevo bien cocido se puede dar desde los 6 meses.  
• El té puede bajar la absorción de hierro y no se recomienda de rutina.`
    ]
  },

  // --------- UTENSILIOS / AUTONOMÍA ---------

  utensilios: {
    palabrasClave: [
      "vasito", "cucharita", "como ensenar", "uso de cubiertos", "vaso abierto",
      "transicion vaso", "biberon", "cuando usar cuchara", "blw utensilios",
      "cuando dejar el biberon"
    ],
    respuesta: [
      `🥄 Desde que inicia sólidos puede usar vasito y cucharita con ayuda.  
Al inicio es más juego que comida, pero poco a poco irá comiendo más solo.  
La transición del biberón al vaso suele hacerse alrededor del año, de forma gradual.`
    ]
  },

  blwVsPures: {
    palabrasClave: [
      "blw vs pures", "blw o papillas", "metodo blw", "autoalimentacion",
      "que es mejor", "papillas o blw", "combinacion de metodos"
    ],
    respuesta: [
      `🍽️ BLW (trozos) y purés son opciones válidas.  
Lo importante es que sea seguro, se avancen texturas y se respeten las señales del bebé.  
Puedes usar uno solo o combinarlos según lo que funcione mejor para ustedes.`
    ]
  },

  // --------- PESO / CRECIMIENTO ---------

  bajopeso: {
    palabrasClave: [
      "bajo peso", "no sube de peso", "crece lento", "crecimiento lento",
      "esta flaco", "muy delgado", "preocupa su peso", "pesa poco",
      "percentil bajo", "esta en percentil 3"
    ],
    respuesta: [
      `📊 Algunos bebés son naturalmente más delgados, pero si no gana peso o lo pierde hay que revisarlo.  
Puedes sumar calorías con aguacate, yema de huevo, aceite de oliva y comidas más frecuentes.  
El pediatra es quien debe evaluar con la curva de crecimiento.`
    ]
  }
};

// ----------------- SALIDAS ESPECIALES -----------------

export const salidasEmergencia = {
  medica: `⚠️ Esta consulta parece necesitar atención médica directa.
Por seguridad, lo mejor es que contactes al pediatra o acudas a tu centro de salud.
Ante dificultad para respirar, fiebre muy alta o decaimiento extremo, ve a emergencia de inmediato.`,

  dieta: `🍽️ No puedo dar dietas personalizadas con cantidades exactas.
Cada bebé es distinto en edad, peso y salud. Para un plan detallado, lo más seguro es verlo con pediatra o nutricionista infantil.`,

  fueraAlcance: `Soy un asistente para bebés y niños pequeños con foco en anemia infantil, hierro y alimentación segura de 0 a 24 meses.
Para un adolescente o adulto lo mejor es buscar apoyo médico directo, porque las indicaciones cambian mucho según la edad.`,

  noEncontrada: `No entendí bien la consulta o quizás está fuera de mi alcance. 😔
Puedo ayudarte sobre anemia infantil, alimentos ricos en hierro para bebés, preparación segura de alimentos y nutrición de 0 a 24 meses.`
};

// ----------------- DETECTORES DE EMERGENCIA Y DIETA -----------------

export const detectarEmergenciaMedica = (mensaje) => {
  const palabrasEmergencia = [
    "enfermo", "vomita", "vomito", "diarrea con sangre", "fiebre alta", "temperatura alta",
    "urgencia", "emergencia", "hospital", "dolor fuerte", "dolor abdominal", "sangra", "sangrado",
    "alergia grave", "reaccion grave", "convulsiona", "convulsion", "dificultad para respirar",
    "respira mal", "no responde", "muy somnoliento", "deshidratacion", "no orina",
    "letargo", "decaimiento severo", "labios morados", "rechazo absoluto de liquidos",
    "signos de deshidratacion", "se desmaya", "inconsciente", "no despierta"
  ];
  const fiebreAlta = /\b(38(\.|,)?5|39|40|41)(?:\s*°?\s*c| c| grados)?\b/i;
  const txtNormalizado = normalizar(mensaje);
  return palabrasEmergencia.some(p => txtNormalizado.includes(normalizar(p))) || fiebreAlta.test(mensaje);
};

export const detectarSolicitudDieta = (mensaje) => {
  const palabrasDieta = [
    "cuanto darle", "cantidad exacta", "porcion", "gramos", "racion",
    "menu para", "menu diario", "menu semanal", "plan de alimentacion",
    "dieta para", "calorias", "medida exacta", "cuanto debe comer", "ml exactos", "gramaje",
    "cuantos gramos", "cuantas cucharadas exactas"
  ];
  const txtNormalizado = normalizar(mensaje);
  return palabrasDieta.some(p => txtNormalizado.includes(normalizar(p)));
};

export const detectarFueraDeAlcanceEdad = (mensaje) => {
  const txtNormalizado = normalizar(mensaje);
  // Detecta edades mayores a 2 años o menciones claras de adolescente/adulto
  const coincidenciaEdad = txtNormalizado.match(/(\d{1,2})\s*(anos|años)/);
  if (coincidenciaEdad) {
    const edad = parseInt(coincidenciaEdad[1], 10);
    if (edad >= 3) return true;
  }

  const palabrasFuera = ["adolescente", "adulto", "mi edad es 15", "tengo 15", "tengo 20", "tengo 30"];
  return palabrasFuera.some((expresion) => txtNormalizado.includes(normalizar(expresion)));
};

// ----------------- MOTOR PRINCIPAL (OFFLINE) -----------------

// ✅ Versión corta: solo devuelve el texto base, sin adornos
function construirRespuesta({ clave, textoBase, mensajeOriginal, esEmergencia }) {
  return {
    texto: textoBase,
    esEmergencia: !!esEmergencia,
  };
}

// Búsqueda exacta por "includes"
const buscarExacto = (mensajeNormalizado) => {
  for (const [clave, datos] of Object.entries(baseConocimiento)) {
    const hit = datos.palabrasClave.some(palabra => {
      const palabraNormalizada = normalizar(palabra);
      return mensajeNormalizado.includes(palabraNormalizada);
    });
    if (hit) {
      const texto = Array.isArray(datos.respuesta) ? pick(datos.respuesta) : datos.respuesta;
      return { clave, texto, esEmergencia: false };
    }
  }
  return null;
};

// Búsqueda aproximada por tokens
const buscarAproximado = (mensajeNormalizado) => {
  const tokensMensaje = new Set(tokenizar(mensajeNormalizado));
  let mejorClave = null;
  let mejorScore = 0;

  for (const [clave, datos] of Object.entries(baseConocimiento)) {
    let scoreCategoria = 0;

    datos.palabrasClave.forEach(p => {
      const tokensPalabra = tokenizar(p);
      let interseccion = 0;
      tokensPalabra.forEach(t => {
        if (tokensMensaje.has(t)) interseccion++;
      });
      scoreCategoria = Math.max(scoreCategoria, interseccion);
    });

    if (scoreCategoria > mejorScore) {
      mejorScore = scoreCategoria;
      mejorClave = clave;
    }
  }

  // Umbral para aceptar la categoría aproximada
  if (mejorClave && mejorScore >= 2) {
    const datos = baseConocimiento[mejorClave];
    const texto = Array.isArray(datos.respuesta) ? pick(datos.respuesta) : datos.respuesta;
    return { clave: mejorClave, texto, esEmergencia: false };
  }

  return null;
};

export const buscarRespuesta = (mensaje) => {
  const mensajeNormalizado = normalizar(mensaje);

  // 1. Seguridad primero
  if (detectarEmergenciaMedica(mensajeNormalizado)) {
    return construirRespuesta({
      textoBase: salidasEmergencia.medica,
      mensajeOriginal: mensaje,
      esEmergencia: true,
    });
  }

  if (detectarSolicitudDieta(mensajeNormalizado)) {
    return construirRespuesta({
      textoBase: salidasEmergencia.dieta,
      mensajeOriginal: mensaje,
      esEmergencia: true,
    });
  }

  if (detectarFueraDeAlcanceEdad(mensajeNormalizado)) {
    return construirRespuesta({
      textoBase: salidasEmergencia.fueraAlcance,
      mensajeOriginal: mensaje,
      esEmergencia: true,
    });
  }

  // 2. Búsqueda exacta
  const exacta = buscarExacto(mensajeNormalizado);
  if (exacta) {
    return construirRespuesta({
      clave: exacta.clave,
      textoBase: exacta.texto,
      mensajeOriginal: mensaje,
      esEmergencia: false,
    });
  }

  // 3. Búsqueda aproximada (tokens)
  const aproximada = buscarAproximado(mensajeNormalizado);
  if (aproximada) {
    return construirRespuesta({
      clave: aproximada.clave,
      textoBase: aproximada.texto,
      mensajeOriginal: mensaje,
      esEmergencia: false,
    });
  }

  // 4. Si no se encontró nada
  return construirRespuesta({
    textoBase: salidasEmergencia.noEncontrada,
    mensajeOriginal: mensaje,
    esEmergencia: false,
  });
};
