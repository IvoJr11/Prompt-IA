Para este pequeño proyecto, se detalla la siguiente información:

  1. Cumple la función de ser una API REST CRUD sobre una entidad "Tarea" que posee campos como "title", "description", "completed" y "id", permitiendo así una gestión rápida sobre tareas sencillas. Para el desarrollo del mismo, se utilizaron herramientas de IA para la generación y el mantenimiento del código.

  2. Para clonar el repositorio, deben usar la opción de clonar de Github (git clone + url), y seguido ejecutar el siguiente comando para instalar las dependencias necesarias y correrlo:

  npm install
  
  npm run start:dev

  3. Cuando la API está en ejecución (por defecto en http://localhost:3000), puedes utilizar las siguientes rutas para interactuar con la entidad Tarea:

    - Obtener todas las tareas
    GET /api/tasks

    - Obtener una tarea por ID
    GET /api/tasks/:id

    - Crear una nueva tarea
    POST /api/tasks
    Body JSON ejemplo:
    {
      "title": "Título de la tarea",
      "description": "Descripción de la tarea",
      "completed": false
    }
    
    - Actualizar una tarea existente
    PUT /api/tasks/:id
    Body JSON ejemplo:
    {
      "title": "Nuevo título",
      "description": "Nueva descripción",
      "completed": true
    }

    - Eliminar una tarea
    DELETE /api/tasks/:id

  4. Se utilizó constantemente Github Copilot con el modelo GPT-4.1 (cambiando entre modo Ask y Agent), además de consultas puntuales a Chatgpt a través de su web.

  5. Proceso de interacción con IA:
    5.a. Dejo detallados unos ejemplos sobre Prompts utilizadas:
      "Crea una disposición de directorios adecuada para una API REST CRUD en express.js"
      Con esta Prompt le indicamos la tarea, que es crear una disposición de archivos/carpetas que se adecúen con lo estandard para una API REST CRUD trabajando con Express.js. En este caso, el contexto es mínimo ya que es la base del proyecto; el rol generalmente dejamos que lo decida por ella misma (la IA). No se detectaron errores ni bugs al revisar la creación.

      "Actua como un ingeniero Backend Senior. Para Javascript (con expressjs), crea un CRUD para una API REST en código que maneje los siguientes datos de una entidad Tarea: id (identificador único), title (de tipo texto), description (de tipo texto), completed (booleano). El CRUD debe reemplazar la base de datos con un arreglo de Tareas donde guarde la información de las instancias"
      Esta prompt es buena. Es la más fundamental ya que genera el core de la API. Se detalla tanto rol (ingeniero Backend Senior para que aplique buenas prácticas), formato de salida (código, además de especificar el lenguaje y framework), la tarea a realizar está bien detallada ya que no solo le decimos "hace un crud de una clase Tarea" sino que especificamos la estructura que debe seguir. El contexto viene dado tanto por la ventana de contexto del chat con la IA, sino también por haberle adjuntado la carpeta "src" y el "index.js" para que sepa dónde debe colocar qué cosas (aunque posiblemente no haría falta ya que la misma IA creó la estructura de directorios).

      "Genera la sección de "scripts" en el package.json para una API. Debe poder ejecutar el src/index.js con los comando de "npm run start" y "npm run dev". Devolve el resultado únicamente en formato JSON"
      Esta prompt es buena ya que le especificamos claramente cómo hacer la tarea (modificar el package.json para poder correr la API), el formato de salida (JSON), y el contexto se lo pasamos por la ventana del chat adjuntando el package.json (además de lo que tiene por la ventana de contexto). El rol en estos casos no hace falta especificarlo ya que es una tarea muy sencilla completamente agnóstica a quién la ejecute, no necesita prácticas específicas.

      "Teniendo en cuenta las rutas ya creadas, generame un listado en formato de texto donde se detallen las URL que deben utilizarse a la hora de hacer cualquier request cuando se ejecuta la api mediante npm run start o npm run dev. El listado debe estar preparado para dejarse en un README.md donde se explica el funcionamiento de la API"
      También se le pidió a la IA que, basándose en las rutas que ella misma creó, creara una pequeña guía sobre las rutas de la api. Se detalla claramente la tarea y cómo ejecutarla, el formato de salida y el contexto viene dado por el proyecto en sí.

      "Actúa como un Backend Senior. Modifica el archivo dejando comentarios sobre cada sección crítica (lógica, rutas y funciones más relevantes). Los comentarios no deben tener más de 50 palabras y deben ser claros para que cualquiera pueda entenderlos."
      De esta manera le pedimos que los comentarios que dejó en primera instancia sean más declarativos para que cualquier persona pueda entender el funcionamiento de los métodos del taskController.js, que es el que posee mayor carga lógica. Se declara bien el rol para que los genere con propiedad, de detalla cómo deben ser y el contexto se lo damos adjuntándole el archivo en cuestión.

      Acá van 2 prompts:
        "ves algún posible bug o error lógico que pueda surgir al hacer una request a las rutas de este archivo?"
        Sencilla en el modo Ask para revisar si hay mejoras visibles en el código para hacer. Devolvió más que nada temas sobre validaciones de datos para manejar error como que el booleano de "completed" se pasara como "true" o "false".

        "Actúa como Backend Senior. Teniendo en cuenta las sugerencias anteriores, refactorizá el código del taskController para que cumpla con las validaciones de "title" y "description", manejar correctamente el error del parseInt (que arroje el error necesario para indicar que el tipo del parámetro es incorrecto), y convertir el parámetro de "completed" a booleano en el caso de que se pase como string. Mantene la estructura del archivo, con sus comentarios y métodos cumpliendo las buenas prácticas de express.js"
        Esta es más completa y tiene que ver con refactorización. Se le pide a la IA que basándose en sus sugerencias sobre los posibles errores, modifique el archivo (taskController pasado por la ventana del chat) para solucionar los problemas relacionados con la validación de campos, tipos incorrectos en los parámetros, etc. Se especifica bien el rol, la tarea está detallada y el formato de salida declara que deben seguirse buenas prácticas a la vez que mantener la estructura original del código.

    5.b. La mayor utilidad que le encontré a la IA en este caso es para generar las estructuras básicas tanto de los directorios como de los archivos esenciales para la API. A veces estas cosas suelen ser tediosas porque son repetitivas, y que puedas ahorrarte ese tiempo mediante una prompt es fantástico. También me sorprendió la rapidez a la hora de refactorizar el código para corregir errores e implementar validaciones.

    5.c. En mi caso no sufrí de ninguna alucinación por parte de Github Copilot, funcionó todo correctamente y fue bastante rápido el proceso.

  6. Conclusiones personales:
    Me encantó lo dinámico y eficiente que es trabajar con una IA. Lo que más destaca es la facilidad que te brinda para centrarte en las cosas principales del código (o más complejas) sin tener que preocuparte de cosas más mecánicas como creación de carpetas, declaración de scripts, comentarios a cada parte del código, etc. Aprendí bastante, y más que nada a ser declarativo en las instrucciones que uno da a un tercero, creo que se puede extrapolar al trato que se tiene con compañeros de trabajo para no dejar dudas sobre lo que hay que hacer y el cómo comunicarse eficientemente con los demás.
