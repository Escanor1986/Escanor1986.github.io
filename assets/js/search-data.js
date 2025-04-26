// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-projects",
          title: "Projects",
          description: "A growing collection of my cool projects :-)",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "Repositories",
          description: "A showcase of my GitHub profile(s) and projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "This page contains my up-to-date CV, detailing my education, professional experience, technical skills and selected projects. Click “Download CV” to open the PDF version.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-veille",
          title: "Veille",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/veille/";
          },
        },{id: "nav-teaching",
          title: "Teaching",
          description: "Mon approche du partage de connaissances et mes ressources préférées en développement web.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-people",
          title: "People",
          description: "Who am i ?",
          section: "Navigation",
          handler: () => {
            window.location.href = "/people/";
          },
        },{id: "dropdown-bookshelf",
              title: "bookshelf",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/books/";
              },
            },{id: "dropdown-blog",
              title: "blog",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/blog/";
              },
            },{id: "post-comprendre-l-utilisation-du-module-next-image-avec-storybook-amp-typescript",
        
          title: "Comprendre l’utilisation du module next-image avec Storybook &amp; TypeScript",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/12/01/next-image-storybook-typescript/";
          
        },
      },{id: "post-comprendre-l-39-asynchrone-en-javascript",
        
          title: "Comprendre l&#39;asynchrone en JavaScript",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/09/15/comprendre-asynchrone-javascript/";
          
        },
      },{id: "post-comprendre-le-mot-clef-this",
        
          title: "Comprendre le mot clef « this »",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/08/22/comprendre-mot-clef-this/";
          
        },
      },{id: "books-l-39-alchimiste",
          title: 'L&amp;#39;Alchimiste',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/alchimiste/";
            },},{id: "books-javascript-the-definitive-guide",
          title: 'JavaScript - The Definitive Guide',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/javascript_definitive_guide/";
            },},{id: "projects-odoo-hackathon-2024",
          title: 'Odoo Hackathon 2024',
          description: "Cloud-Native web application deployed on GCP",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-telesport",
          title: 'Telesport',
          description: "Angular sports data visualization application",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-chemin-de-conscience",
          title: 'Chemin de conscience',
          description: "Next.js fullstack website for a non-profit",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-house-way",
          title: 'House Way',
          description: "Fullstack vacation rental platform",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-waver",
          title: 'Waver',
          description: "Twitter-inspired social network",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-pixcircle",
          title: 'PixCircle',
          description: "Modern web application with Angular 19",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-connect-4-oop-game",
          title: 'Connect 4 - OOP Game',
          description: "Connect 4 game developed with TypeScript",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-online-age-calculator",
          title: 'Online Age Calculator',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-e-commerce-product-page",
          title: 'E-commerce Product Page',
          description: "React, TypeScript, Tailwind, and Storybook",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
        id: 'social-discord',
        title: 'Discord',
        section: 'Socials',
        handler: () => {
          window.open("https://discord.com/users/escanor1391", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6C%69%6F%6E%65%6C.%7A%6F%76%69@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Escanor1986", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/lionelzovi", "_blank");
        },
      },{
        id: 'social-medium',
        title: 'Medium',
        section: 'Socials',
        handler: () => {
          window.open("https://medium.com/@lionel.zovi", "_blank");
        },
      },{
        id: 'social-stackoverflow',
        title: 'Stackoverflow',
        section: 'Socials',
        handler: () => {
          window.open("https://stackoverflow.com/users/21901092", "_blank");
        },
      },{
        id: 'social-custom_codewars',
        title: 'Custom_codewars',
        section: 'Socials',
        handler: () => {
          window.open("https://www.codewars.com/users/Neo_Monkey_D_Luffy", "_blank");
        },
      },{
        id: 'social-custom_coderbyte',
        title: 'Custom_coderbyte',
        section: 'Socials',
        handler: () => {
          window.open("https://coderbyte.com/profile/Escanor1986", "_blank");
        },
      },{
        id: 'social-custom_codingame',
        title: 'Custom_codingame',
        section: 'Socials',
        handler: () => {
          window.open("https://www.codingame.com/profile/7f58b437a5ff631eca39d30090c739e14290705", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
