---
layout: post
title: "Comprendre l'asynchrone en JavaScript"
date: 2024-09-15 10:00:00 +0200
excerpt: "Explorez le fonctionnement de l'asynchrone en JavaScript. Apprenez les concepts clés comme promesses, callbacks et async/await pour écrire un code efficace et non-bloquant."
image: /assets/img/asynchrone_js.webp
categories:
  - Fiche technique
tags:
  - javascript
  - asynchrone
  - promesses
  - callbacks
  - async-await
author: "Lionel Zovi"
---

# Comprendre l'Asynchrone en JavaScript 🚀

![Une personne multitâche au bureau avec un symbole de boucle infinie, pixel art](/assets/img/asynchrone_js.webp)

## JavaScript est-il asynchrone ? ⏱️

Cela va peut-être en surprendre certains, mais **non** ! JavaScript est bel et bien **synchrone** et **single-threaded** : à l’exception des portions de code explicitement asynchrones, tout est exécuté séquentiellement. L’asynchronisme, quant à lui, est géré en parallèle via l’Event Loop et la Callback Queue.

## Qu’est-ce que l’asynchronisme en JavaScript ? 🤔

Imaginez commander une pizza : vous passez votre commande, puis vous regardez Netflix, résolvez un exo sur Codewars ou faites une sieste. Quand la pizza est prête, on sonne à votre porte ! En JavaScript, c’est pareil : on lance une opération (API, timer, etc.), on continue d’exécuter le reste du code, et dès que la réponse arrive, on reprend là où on s’était arrêté.

> Ces explications sont plus techniques, mais elles amélioreront votre compréhension de l’asynchrone ! Prenez un café ☕ et c’est parti !

---

## 1. L’Event Loop : le cœur de l’asynchrone 🔄

- **Call Stack** : pile d’exécution synchrone.  
- **Callback Queue** : file FIFO des callbacks asynchrones.  
- **Event Loop** : dès que la Call Stack est vide, il déplace le premier callback de la Callback Queue vers la Call Stack pour exécution.

---

## 2. Exemple simple

```js
// Timer
setTimeout(() => {
  console.log("Ce message est affiché après 1 seconde");
}, 1000);

// Requête AJAX
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    console.log("Réponse AJAX reçue :", data);
  })
  .catch(error => {
    console.error("Erreur lors de la requête AJAX :", error);
  });

// Message synchrone
console.log("Ce message est affiché immédiatement, avant les callbacks");
```

---

## 3. Pourquoi l’asynchronisme est-il important ? 🌟

- **Interface réactive** : l’utilisateur peut continuer à interagir pendant les opérations longues.  
- **Performances** : réseau, bases de données…, sans bloquer la boucle principale.

---

## 4. Les Trois Mousquetaires de l’asynchronisme 🏇🏽

### Callbacks 🏴‍☠️

```js
console.log('Commander une pizza');
setTimeout(() => {
  console.log('Pizza livrée !');
}, 3000);
console.log('Regarder une série en attendant');
```

*Inconvénient : “callback hell”* 🔥😱

---

### Promises 🎁

```js
let commanderPizza = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Pizza livrée !'), 3000);
});

commanderPizza
  .then(message => {
    console.log(message);
    console.log('Manger la pizza');
  })
  .catch(error => {
    console.error('Erreur :', error);
  });
```

*Plus lisible, gestion d’erreurs intégrée.*

---

### async/await 🕶️

```js
async function commanderPizzaEtManger() {
  console.log('Commander une pizza');
  try {
    let message = await commanderPizza;
    console.log(message);
    console.log('Manger la pizza');
  } catch (error) {
    console.error('Erreur :', error);
  }
}

commanderPizzaEtManger();
console.log('Regarder une série en attendant');
```

*Syntaxe proche du synchrone, plus facile à suivre.*

---

## En résumé 📝

L’asynchronisme en JavaScript permet d’exécuter des opérations lentes en arrière-plan sans bloquer la boucle principale. Callbacks, Promises et async/await sont vos alliés pour un code réactif et performant. Bon code ! 🍕💻

## Ressources

- [MDN – Asynchronous JavaScript](https://developer.mozilla.org/fr/docs/Learn/JavaScript/Asynchronous)  
- [JavaScript.info – Promises, Async/Await](https://javascript.info/async)  
- [Philip Roberts – What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)  
- [FreeCodeCamp – Asynchronous JavaScript Explained](https://www.freecodecamp.org/news/asynchronous-javascript-explained/)  
- [Jake Archibald – Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)  
- [Flavio Copes – Callbacks vs Promises vs Async/Await](https://flaviocopes.com/javascript-async-await/)  
- [Eloquent JavaScript – Chapitre sur les Promises](https://eloquentjavascript.net/11_async.html)
