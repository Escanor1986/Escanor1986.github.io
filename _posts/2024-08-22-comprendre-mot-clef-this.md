---
layout: post
title: "Comprendre le mot clef « this »"
date: 2024-08-22 10:00:00 +0200
excerpt: "Découvrez le mot-clé this en JavaScript avec des exemples concrets et apprenez ses subtilités dans différents contextes."
image: /assets/img/this_context.webp
categories:
  - Fiche technique
tags:
  - javascript
  - this
  - débutant
author: "Lionel Zovi"
---

# Comprendre le mot clef “this”

![Deux personnes dans une cuisine séparée, pixel art](/assets/img/this_context.webp)

J’ai récemment été confronté à l’utilisation du mot clé `this` [dans un cours sur JavaScript sur Udemy](https://www.udemy.com/course/pro-javascript/).  
Le projet consistait à réaliser un jeu de Puissance 4 en programmation orientée objet, ce qui m’a amené à creuser les subtilités de `this` dans divers contextes. **Voici les principaux cas d’usage à connaître :**

- Mode strict vs mode non-strict  
- Contexte global (objet `window`), objets littéraux, fonctions (fléchées ou classiques), classes  
- Méthodes d’instance `.call()`, `.apply()` et `.bind()`  
- Contexte d’exécution vs environnement lexical  
- Méthodes intégrées (ex. `window.addEventListener`, `setTimeout`)

Pour plus de détails, consultez aussi la [référence MDN sur `this`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/this).

## Pourquoi revenir sur `this` en JavaScript ?

Mal compris, `this` est source de bugs tenaces : erreurs de contexte, références perdues… Qui ne s’est pas arraché les cheveux après une demi-journée de débogage ? 😅

Pour ma part, j’ai frappé un mur en utilisant `this` dans un écouteur d’événement défini en arrow function : le binding lexical m’a échappé !

---

## 1. Contexte global (`window`)

Dans un script chargé par le navigateur, le contexte global est l’objet `window`.  
Qu’on soit en strict ou non-strict, un simple :

```js
console.log(this === window); // true
```

confirme que `this` pointe vers `window`.  
Vous pouvez même invoquer :

```js
console.log(this.document.location);
```

---

## 2. Objets littéraux

> Astuce : “Que y a-t-il à gauche du `.` ?”  
> `this` fait référence à l’objet qui précède le point.

```js
const fluffy = {
  name: "Fluffy",
  color: "Rainbow",
  species: "Unicorn",
  sayHi(style, humor) {
    return `${this.name} the ${style} ${this.species} with the ${this.color} color and the ${humor} humor says hi!`;
  }
};

console.log(fluffy.sayHi("pretty", "bright"));
// Fluffy the pretty Unicorn with the Rainbow color and the bright humor says hi!
```

**Mode non-strict vs strict** lorsque vous stockez la méthode :

```js
name = "Global";
species = "GlobalSpecies";
color = "GlobalColor";

const fluffySayHi = fluffy.sayHi;

console.log(fluffySayHi("pretty", "bright"));
// non-strict : 'Global the GlobalSpecies with the GlobalColor color says hi!'
// strict : undefined...
```

---

## 3. `.call()`, `.apply()`, `.bind()`

### `.call()`

```js
fluffySayHi.call(fluffy, "pretty", "bright");
```

### `.apply()`

```js
fluffySayHi.apply(fluffy, ["pretty", "bright"]);
```

### `.bind()`

```js
const bound = fluffy.sayHi.bind(fluffy);
console.log(bound("pretty", "bright"));
```

---

## 4. Fonctions fléchées vs classiques

- **Fléchées** héritent du `this` lexical :

  ```js
  function Unicorn(name) {
    this.name = name;
    this.getName = () => console.log(this.name);
  }
  const u = new Unicorn("Fluffy");
  setTimeout(u.getName, 0); // 'Fluffy'
  ```

- **Classiques** créent leur propre `this` selon l’appel :

  ```js
  function Unicorn(name) {
    this.name = name;
    this.getName = function() { console.log(this.name); };
  }
  const u2 = new Unicorn("Fluffy");
  setTimeout(u2.getName, 0); // undefined
  ```

---

## 5. `new`, classes ES6 et `super`

En ES6, le constructeur et les méthodes de classe utilisent `this` pour l’instance :

```js
class Unicorn {
  constructor(name) { this.name = name; }
  getName() { return this.name; }
}
```

Les arrow methods dans une classe héritent aussi du `this` lexical de l’instance.

---

## 6. Méthodes globales (`addEventListener`, `setTimeout`)

- **`addEventListener`** : `this` = l’élément cible
- **`setTimeout`** classique : `this` = `window` (ou `undefined` en strict)
- Remède : arrow function ou `.bind(this)` dans le callback

---

*Gardez toujours en tête que la valeur de `this` dépend du contexte d’exécution et de l’environnement lexical.* ☕🦄

## Ressources

- [Cours JavaScript sur Udemy](https://www.udemy.com/course/pro-javascript/)
- [Référence sur `this` - MDN Web Docs](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/this)
- [Articles JavaScript - GeeksforGeeks](https://www.geeksforgeeks.org/)
- [Guide sur `this` et l'orientation objet - JavaScript.info](https://javascript.info/object-methods#method-this)
- [Tutoriels JavaScript - Dyma](https://dyma.fr/cours/javascript)
