
import express from 'express'


import { Liquid } from 'liquidjs';

const apiTasks = "https://fdnd-agency.directus.app/items/dropandheal_task";
const apiExercises = "https://fdnd-agency.directus.app/items/dropandheal_exercise";
const apiMessages = "https://fdnd-agency.directus.app/items/dropandheal_messages";

const tasksResponse = await fetch(apiTasks);
const exercisesResponse = await fetch(apiExercises);
const messagesResponse = await fetch(apiMessages);

const tasksData = await tasksResponse.json();
const exercisesData = await exercisesResponse.json();
const messagesData = await messagesResponse.json();

const app = express()

app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))

const engine = new Liquid();
app.engine('liquid', engine.express());


app.set('views', './views')



//index page post
app.get('/:id', async function (request, response) {
  try {
    const taskId = request.params.id;
    const exercisesId = request.params.exercise;

    const specificTaskResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_task/?filter={"id":${taskId}}`);
    const specificExercisesResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_exercise/?filter={"id":${exercisesId}}`);
    
    const specificExerciseData = await specificExercisesResponse.json();
    const exerciseObject = Array.isArray(specificExerciseData.data) ? specificExerciseData.data[0] : specificExerciseData.data;

    const specificTaskData = await specificTaskResponse.json();
    const taskObject = Array.isArray(specificTaskData.data) ? specificTaskData.data[0] : specificTaskData.data;

    response.render('index.liquid', {
      title: 'index',
      tasks: tasksData.data,
      exercises: exercisesData.data,
      exerciseObject,
      taskObject
    });
  } catch (error) {
    console.error("Something Wrong in the index page check this",error);
    response.status(500).render("error.liquid");
  }
});




//exercise page post
app.get('/exercise/:id', async function (request, response) {
  try {
    const exerciseId = request.params.id;

    const exerciseResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_exercise/?fields=*.*&filter={"id":"${exerciseId}"}&limit=1`);
    const exerciseResponseJSON = await exerciseResponse.json();

    const countResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_messages?aggregate[count]=*&filter={"exercise":{"_eq":${exerciseId}}}`);
    const countResponseJSON = await countResponse.json();
    const messageCount = countResponseJSON.data[0].count;

    response.render('exercise.liquid', {
      title: "exercise",
      exercises: exercisesData.data,
      countMessages: messageCount,
      specificExercise: exerciseResponseJSON.data
    });
  } catch (error) {s
    console.error("Something Wrong in the exercise page, check this:",error);
    response.status(500).render("error.liquid");
  }
});


//messages page 
app.get('/messages/:id', async function (request, response) {
  try {
    const messagesId = request.params.id;

    const messagesIdResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_messages/?fields=*.*&filter={"exercise":"${messagesId}"}&limit=1`);
    const messagesResponseJSON = await messagesIdResponse.json();

    const messagesFilterResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_messages?filter={"exercise":{"_eq":${messagesId}}}`);
    const messagesFilterResponseJSON = await messagesFilterResponse.json();

    const exerciseResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_exercise/?fields=*.*&filter={"id":"${messagesId}"}&limit=1`);
    const exerciseResponseJSON = await exerciseResponse.json();

    response.render('messages.liquid', {
      title: "messages",
      specificmessage: messagesResponseJSON.data,
      specificexercise: exerciseResponseJSON.data,
      messagesFilter: messagesFilterResponseJSON.data,
      messages: messagesData.data
    });
  } catch (error) {
    console.error("Something Wrong in the messages page, check this:",error);
    response.status(500).render("error.liquid");
  }
});


//messages page post
app.post('/messages/:id', async function (request, response) {
  try {
    const messagesId = request.params.id;

    await fetch('https://fdnd-agency.directus.app/items/dropandheal_messages', {
      method: 'POST',
      body: JSON.stringify({
        from: "Anoniem",
        exercise: request.body.exercise,
        text: request.body.text
      }),
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });

    response.redirect(303, `/messages/${messagesId}`);
  } catch (error) {
    console.error("Something Wrong in the post method in the messages page, check this:",error);
    response.status(500).render("error.liquid");
  }
});

//messages page delete
app.post('/messages/', async function (request, response) {
  try {
    const messagesId = request.params.id;
    const { _method, messageId, from, text, exercise } = request.body;

    if (_method === 'DELETE') {
      if (messageId) {
        await fetch(`https://fdnd-agency.directus.app/items/dropandheal_messages/${messageId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json;charset=UTF-8' }
        });
      }
      return response.redirect(303, `/messages/${messagesId}`);
    }

    await fetch('https://fdnd-agency.directus.app/items/dropandheal_messages', {
      method: 'POST',
      body: JSON.stringify({ from, text, exercise }),
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });

    response.redirect(303, '/messages');
  } catch (error) {
    console.error("Something Wrong in the messages page in delete message, check this:",error);
    response.status(500).render("error.liquid");
  }
});

//comunity-drops page post
app.get('/community-drops/:id', async function (request, response) {
  try {
    const exerciseId = request.params.id;
    const exerciseResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_exercise/?fields=*.*&filter={"id":"${exerciseId}"}&limit=1`);
    const exerciseResponseJSON = await exerciseResponse.json();

    const countResponse = await fetch(`https://fdnd-agency.directus.app/items/dropandheal_messages?aggregate[count]=*&filter={"exercise":{"_eq":${exerciseId}}}`);
    const countResponseJSON = await countResponse.json();
    const messageCount = countResponseJSON.data[0].count;

    response.render('community-drops.liquid', {
      title: "community-drops",
      specificexercise: exerciseResponseJSON.data,
      countMessages: messageCount
    });
  } catch (error) {
    console.error("Something Wrong in the community drops page, check this:",error);
    response.status(500).render("error.liquid");
  }
});


//comunity-drops page post
app.post('/community-drops/:id', async function (request, response) {
  try {
    const exerciseId = request.params.id;
    await fetch('https://fdnd-agency.directus.app/items/dropandheal_messages', {
      method: 'POST',
      body: JSON.stringify({
        from: request.body.from,
        exercise: request.body.exercise,
        text: request.body.text
      }),
      headers: { 'Content-Type': 'application/json;charset=UTF-8' }
    });
    response.redirect(303, `/community-drops/${exerciseId}`);
  } catch (error) {
    console.error("Something Wrong in the post in the community drops page, check this:",error);
    response.status(500).render("error.liquid");
  }
});


app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Daarna kun je via http://localhost:${app.get('port')}/ Drop & Heal website bekijken.\n\nThe Web is for Everyone. Maak mooie dingen 🙂`)
}) 


//error page
app.use((req, res, next) => {
  res.status(404).render("error.liquid")
})
