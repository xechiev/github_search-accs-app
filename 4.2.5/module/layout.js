export class LAYOUT {
  constructor(api, search) {
    this.api = api;
    this.search = search;

    this.wrapper = document.querySelector('.wrapper');
    this.box_main = this.createElement('div', 'box_main');
    this.box_1 = this.createElement('ul', 'box_1');
    this.box_2 = this.createElement('div', 'box_2');

    this.input = this.createElement('input', 'input-text');
    this.input.type = 'text';
    this.input.placeholder = 'Искать здесь';

    this.box_main.append(this.input)
    this.box_main.append(this.box_1)
    this.box_main.append(this.box_2)
    
    this.wrapper.append(this.box_main)
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if(elementClass) element.classList.add(elementClass)
    return element;
  }

  createAccounts(accountData) {
    const accountElement = this.createElement('li', 'account'); 
    accountElement.addEventListener('click', () => this.showAccountsOther(accountData));
 
    accountElement.innerHTML = `<span class='acc-name'>${accountData.name}</span>`;

    this.box_1.append(accountElement);
  }

  showAccountsOther(accountData, condition = false) {
    if(!condition) {
      this.input.value = '';
      this.box_1.innerHTML = '';
    }

    const crossImg  = this.createElement('img', 'remove_button')
    crossImg.src = './img/cross.svg'; 

    const accountsItems = this.createElement('div', 'account_box2'); 
    const accountsItemsWrapper = this.createElement('div', 'accountsItemsWrapper');
    
    accountsItems.innerHTML = `<div class='show_box2'>Name: ${accountData.name}</div> 
                               <div class='show_box2'>Owner: ${accountData.owner.login}</div> 
                               <div class='show_box2'>Stars: ${accountData.stargazers_count}</div>`;

    accountsItemsWrapper.append(accountsItems); 
    accountsItemsWrapper.append(crossImg);

    this.box_2.append(accountsItemsWrapper);   

    this.removeChildNodes();

    this.removeButton();

    this.box_2.removeEventListener('click', this.handler)

  }

  removeButton() {

    let handler = function(event) {
      if (event.target.className != 'remove_button') return;
      let deleteCross = event.target.closest('.accountsItemsWrapper');
      deleteCross.remove();
    }
    
    this.box_2.addEventListener('click', handler)

  }

  removeChildNodes() {
    let childElements = this.box_2.children.length;
    if(childElements > 3) { 
      this.box_2.removeChild(this.box_2.lastChild)
    }
  }

}


