const initialMenus = ['김치찌개', '돈까스', '비빔밥', '파스타', '초밥'];

let menus = [...initialMenus];

const menuList = document.querySelector('#menu-list');
const menuCount = document.querySelector('#menu-count');
const menuForm = document.querySelector('#menu-form');
const menuInput = document.querySelector('#menu-input');
const formMessage = document.querySelector('#form-message');
const result = document.querySelector('#result');

function renderMenus() {
  menuCount.textContent = menus.length;
  menuList.replaceChildren();

  if (menus.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty-state';
    empty.innerHTML = '<strong>메뉴가 아직 없어요</strong>위 입력창에서 메뉴를 등록해 주세요.';
    menuList.append(empty);
    return;
  }

  menus.forEach((menu, index) => {
    const item = document.createElement('li');
    item.className = 'menu-item';

    const name = document.createElement('span');
    name.className = 'menu-name';
    name.textContent = menu;

    const remove = document.createElement('button');
    remove.className = 'delete-button';
    remove.type = 'button';
    remove.setAttribute('aria-label', `${menu} 삭제`);
    remove.title = `${menu} 삭제`;
    remove.textContent = '×';
    remove.addEventListener('click', () => {
      menus.splice(index, 1);
      renderMenus();
    });

    item.append(name, remove);
    menuList.append(item);
  });
}

menuForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newMenu = menuInput.value.trim();
  formMessage.textContent = '';

  if (!newMenu) {
    formMessage.textContent = '메뉴 이름을 입력해 주세요.';
    menuInput.focus();
    return;
  }

  if (menus.some((menu) => menu.toLocaleLowerCase('ko-KR') === newMenu.toLocaleLowerCase('ko-KR'))) {
    formMessage.textContent = '이미 등록된 메뉴예요. 다른 메뉴를 입력해 주세요.';
    menuInput.focus();
    return;
  }

  menus.push(newMenu);
  menuInput.value = '';
  renderMenus();
  menuInput.focus();
});

document.querySelector('#pick-button').addEventListener('click', () => {
  if (menus.length === 0) {
    result.textContent = '메뉴를 먼저 등록해 주세요!';
    menuInput.focus();
    return;
  }

  const picked = menus[Math.floor(Math.random() * menus.length)];
  result.textContent = `${picked} 어때요?`;
});

renderMenus();
