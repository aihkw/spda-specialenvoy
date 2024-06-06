const tiltDeg = 15;

function tiltElement() {
  let elements = document.getElementsByClassName('tilt')
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    element.addEventListener('mousemove', ({clientX, clientY}) => {
      let bcr = element.getBoundingClientRect();
      let rotX = ((clientY - bcr.top) / bcr.height * 2 - 1) * tiltDeg;
      let rotY = ((clientX - bcr.left) / bcr.width * 2 - 1) * -tiltDeg;
      element.firstElementChild.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    element.addEventListener('mouseleave', () => {
      element.firstElementChild.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
  }
}

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 2000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 60)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}

tiltElement()
consoleText([
  "Diplomatic trade liaison",
  "Strategic investment facilitator",
  "Innovative commerce advocate",
  "Economic partnership architect",
  "Regional development catalyst",
  "Policy diplomacy expert",
  "Cross-border trade strategist",
  "Investment promotion specialist",
  "Sustainable commerce advocate",
  "Market access facilitator",
], 'text',['white', 'red', 'blue']);

fetch('/api/news.json')
.then(response => response.json())
.then(data => {
  let count = 0
  data.forEach(item => {
    let div = document.createElement('div');
    div.style.background = `url(/assets/news/n${count+1}.png)`;
    div.style.backgroundSize = `cover`;
    div.style.display = `inline-block`;
    div.setAttribute('onclick', item['onclick']);
    document.querySelector('.news').appendChild(div);
    let a = document.createElement('a');
    a.innerHTML = item['title'];
    div.appendChild(a);
    count += 1
  })
})

fetch('/api/advocacy.json')
.then(response => response.json())
.then(data => {
  let count = 0
  data.forEach(item => {
    let div = document.createElement('div');
    div.style.background = `url(/assets/news/n${count+1}.png)`;
    div.style.backgroundSize = `cover`;
    div.style.display = `inline-block`;
    div.setAttribute('onclick', item['onclick']);
    document.querySelector('.news').appendChild(div);
    let a = document.createElement('a');
    a.innerHTML = item['title'];
    div.appendChild(a);
    count += 1
  })
})

// Projects
const div_projects = document.querySelector('#projects');
fetch('/api/projects.json')
.then(response => response.json())
.then(data => {
  data.forEach(item => {
    let grid = document.createElement('div');
    grid.classList.add('grid');
    grid.setAttribute('onclick', `window.location.href = '/projects/${item['title'].toLowerCase()}.html'`);
    let a = document.createElement('a');
    a.innerHTML = item['title'];
    grid.appendChild(a);
    let img = document.createElement('img');
    img.src = `/assets/projects/${item['title'].toLowerCase()}.png`
    grid.appendChild(img);
    div_projects.append(grid)
  });
})

var stickyplayer = document.querySelector('.stickyplayer');
var videoplayer = document.querySelector('.videoplayer');
var stickyplayer_enabled = false;
function modalVideo(url) {
  if (!stickyplayer_enabled) {
      stickyplayer.classList.add('shade');
      videoplayer.setAttribute('src', url)
      videoplayer.classList.add('shade')
      stickyplayer_enabled = true;
      document.querySelector('player')
  }
}
function closeplayer() {
  stickyplayer.classList.remove('shade');
  videoplayer.classList.remove('shade');
  videoplayer.setAttribute('src', '')
  stickyplayer_enabled = false;
}