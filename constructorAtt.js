let body = document.getElementById('content');
let searchAtt = document.getElementById('searchAtt');

//Requisiição assincrona do JSON

async function fetchData() {
  await fetch('./archive.json')
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      construct(json);
      selectButtons();
      searchAtt.addEventListener('keyup', filterTxt);
    });
}
fetchData();
let construct = (archive) => {
  archive.forEach(({ titulo, data, link, content }) => {
    let section = new Create(titulo, data, link, content);
    section.CreateButton();
    section.CreateDiv();
    document.body.appendChild(document.createElement('br'));
  });
};
class Create {
  constructor(titulo, data, link, content) {
    this.titulo = titulo;
    this.data = data;
    this.link = link;
    this.content = content;
  }
  CreateButton() {
    let button = document.createElement('button');
    button.setAttribute('class', 'button');
    button.innerText = this.data + ' - ' + this.titulo;
    document.body.appendChild(button);
  }
  CreateDiv = () => {
    let section = document.createElement('section');
    let contentDiv = document.createElement('div');
    let linkDiv = document.createElement('div');
    section.setAttribute('class', 'notVisibled sectionContent');
    contentDiv.innerText = this.content;
    linkDiv.innerHTML =
      "<a href='" +
      this.link +
      "' target='_blank'> Clique Aqui</a> para visualizar o conteúdo";
    document.body.appendChild(section);
    section.appendChild(contentDiv);
    section.appendChild(linkDiv);
  };
}
function toggleclass() {
  this.classList.toggle('active');
  this.nextElementSibling.classList.toggle('notVisibled');
}
function selectButtons() {
  let buttons = document.querySelectorAll('button.button');
  buttons.forEach((button) => {
    button.addEventListener('click', toggleclass);
  });
}
function retiraAcentos(e) {
  return e
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([^\w]+|\s+)/g, '');
}
function filterTxt() {
  let txt = this.value;
  let buttons = document.querySelectorAll('button.button');
  buttons.forEach((button) => {
    if (!txt) {
      button.style.display = 'block';
    } else {
      let result = button.innerText.toUpperCase().indexOf(txt.toUpperCase);
      let filterResult = retiraAcentos(button.innerText)
        .toUpperCase()
        .indexOf(txt.toUpperCase());
      result < 0 && filterResult < 0
        ? (button.style.display = 'none')
        : (button.style.display = 'block');
    }
  });
}
